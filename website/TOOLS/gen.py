#dmitry's fantastic templating engine, kinda like django but worse

import os
import sys
import json
from collections import OrderedDict
import shutil 
from os.path import join
import unittest

src_dir = "sources/"




# This figures out if a link to href from document filepath should be considered as 'link-selected' 
def match_link(href, filepath, category_match = True):
    if not category_match and href.endswith("/"):
        href += "index.html"

    if not href.startswith("/"):
        return filepath.endswith(href)
    else:
        return filepath.startswith(href.lstrip("/") if href != "/" else href)

class MatchTest(unittest.TestCase):     
    def test(self):
        self.assertTrue(match_link("/platform/docs/", "platform/docs/index.html"))
        self.assertTrue(match_link("/platform/", "platform/docs/index.html"))
        self.assertTrue(match_link("/apps/docs/learn/", "apps/docs/learn/basics.html",True))
        self.assertFalse(match_link("/apps/docs/learn/", "apps/docs/learn/basics.html",False))
        self.assertTrue(match_link("basics.html", "apps/docs/learn/basics.html"))
        self.assertTrue(match_link("/index.html", "index.html"))
        self.assertFalse(match_link("/index.html","platform/docs/index.html"))


# helper for file_dispatch
class UnsuitableDirError(Exception):
    pass
class FileNotFoundError(Exception):
    pass
# This looks for filename in dir, and if it doesn't find it, checks the parent directory, and so on
# After that, it reads the contents and returns them along with the directory.
# That way, we can make a template more generic by moving it up directories, and then individual sections can override it.
# subdir can be set to "_templates" to descend into that dir when possible, and only return files from it 
def file_dispatch(dir, filename, subdir = None):
    MAX_DEPTH = 6
    already = []
    #print("Looking for " + filename)
    for i in range(MAX_DEPTH):
        try:
            with open(join(dir, filename)) as f:
                if dir in already or (subdir and os.path.basename(dir) != subdir.strip(os.path.sep)):
                    raise UnsuitableDir()
                data = f.read()
            #print("Found %s in %s with depth %s" % (filename, dir, i))
            return data, dir
        except IOError, UnsuitableDirError:
            already.append(dir)
            #print "Not in " + dir
            if os.path.samefile(os.path.abspath(dir), os.path.abspath(src_dir)): # if we can't find it in src_dir, don't ascend further
                raise FileNotFoundError("Couldn't find %s" % filename)
            elif subdir and os.path.isdir(join(dir, subdir)): # if subdir exists in the current dir, descend to it.
                if join(dir, subdir) not in already:
                    dir = join(dir, subdir)
                    continue
            dir = os.path.dirname(dir) # otherwise just ascend up one level
            #print("Ascending to " + dir)
            continue
    print("###Couldn't find " + filename)
    return None, dir

# Generates a navbar from json. Current filepath is the document it's on, since we need to know which link should light up.
def gen_nav(json_file, current_filepath):
    dir = os.path.dirname(join(os.getcwd(), src_dir, current_filepath))
    jsn, dir = file_dispatch(dir, json_file)
    jsondata = json.loads(jsn, object_pairs_hook=OrderedDict)
    innerHTML = ""
    links = jsondata["links"]
    for x in links:
        #print("match_link(%s, %s) = %s" % (x["href"], current_filepath,match_link(x["href"], current_filepath)))
        innerHTML += format_nav_link(jsondata["innerHTML"],x, current_filepath)
    outerHTML = file_dispatch(dir, join("_templates/",jsondata["template"]))[0].format(innerHTML, jsondata.get("title",""))
    return outerHTML


#target_file is the file that the link is in, aka current_filepath above
def format_nav_link(template, json_link, target_file):
    return template.format( json_link["href"], ' class="link-selected"' if match_link(json_link["href"], target_file) else "", json_link["title"])

def gen_topmenu(dir, filename, contents):
    return gen_nav("topmenu.json",join(dir,filename))


def gen_header(dir, filename, contents):
    return gen_nav("header.json",join(dir,filename))

def gen_sidemenu(dir, filename, contents):
    current_filepath = join(dir,filename)
    dir = os.path.dirname(join(os.getcwd(), src_dir, current_filepath))
    jsn, dir = file_dispatch(dir, "sidemenu.json")
    jsondata = json.loads(jsn, object_pairs_hook=OrderedDict)
    innerHTML = ""
    links = jsondata["links"]
    for x in links:
        #print("{0} & {1} >> {2}".format(links[x],current_filepath,match_link(links[x], current_filepath)))
        innerHTML += format_sidemenu_link(jsondata["innerHTML"],x,current_filepath)
    templateHTML, templatedir = file_dispatch(dir, join("_templates/",jsondata["template"]))
    # this is important: render uses the current dir as a working directory, not the templates dir.
    outerHTML = render_file(join(templatedir,"_templates/", jsondata["template"]), dir).format(innerHTML, jsondata.get("title","")) # RECURSION HAPPENS HERE!!!!!
    return outerHTML


# not tail recursive... but there are bigger problems if the documentation nav tree exceeds callstack size...
def format_sidemenu_link(template, json_link, target_file, depth = 0):
    #print("match_link(%s, %s) = %s" % (json_link["href"], target_file,match_link(json_link["href"], target_file, False)))
    childrenHTML = ""
    if "children" in json_link:
        for c in json_link["children"]:
            childrenHTML += format_sidemenu_link(template, c, target_file, depth + 1)
    elclass=("navlink" if depth == 0 else "subnavlink") 
    if match_link(json_link["href"], target_file, False):
        elclass += " link-selected"
    return template.format( json_link["href"], 'class="' + elclass + '"', json_link["title"]) + childrenHTML




# marker->function mapping here
funcs = {
    "%%%HEADER%%%": gen_header,
    "%%%TOPMENU%%%": gen_topmenu,
    "%%%SIDEMENU%%%" : gen_sidemenu,
}



def render_file(filepath, rel_dir):
    with open(filepath, 'r') as f:
        contents = f.read()
    return render(filepath,rel_dir,contents)

def render(filepath, rel_dir, contents):
    filename = os.path.basename(filepath)
    for k in funcs.keys():
        if k in contents:
            f = funcs[k]
            print("%s -> %s" % (f.__name__, os.path.relpath(filepath, src_dir)))
            contents = contents.replace(k,f(rel_dir,filename , contents)) # take the appropriate function and replace the marker with its output
    return contents


if __name__ == "__main__":
    unittest.main(exit=False) 
    print("src_dir = %s" % src_dir)
    for dir, subdirs, files in os.walk(join(os.getcwd(), src_dir)):
        if "_templates" in subdirs:
            subdirs.remove("_templates") # ignore template directory, as we don't want to build templates.
        rel_dir = dir[len(os.getcwd())+1:] # converts absolute path to relative path starting with sources/
        if rel_dir.startswith(src_dir): # 
            rel_dir = rel_dir[len(src_dir):] # set root to be sources/
        else:
            print("### rel_dir (%s) doesn't start with src_dir (%s)... what's going on?" % (rel_dir, src_dir))
        outdir = join(os.getcwd(), "out/", rel_dir) 
        if not os.path.exists(outdir):
            os.makedirs(outdir)
        for file in files:
            filepath = join(dir, file)
            if filepath.endswith(".html"):
                split = file.split(".")
                if len(split) > 2:  # if the file is like foo.bar.html, we wanna insert the file into the bar.html template
                    template = split[-2] + ".html"
                    resulting_filename = split[0] + ".html"
                    resulting_filepath = join(dir, resulting_filename)
                    print("%s >> %s -> %s" % (file, template, os.path.relpath(resulting_filepath, src_dir)))
                    rendered_template = render(resulting_filepath, rel_dir, file_dispatch(dir, template, subdir = "_templates")[0])
                    with open(filepath) as f:
                        contents = rendered_template.replace("{content}",f.read())
                    savefile = resulting_filename           
                else:
                    contents = render_file(filepath,rel_dir)
                    savefile=file
                with open(join(outdir, savefile), 'w+') as f:
                    f.write(contents)





