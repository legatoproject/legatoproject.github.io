#dmitry's fantastic templating engine, kinda like django but worse

import os
import json
from collections import OrderedDict
import shutil 
from os.path import join

src_dir = "sources/"




# This figures out if a link to href from document filepath should be considered as 'link-selected' 
def match_link(href, filepath):
    href = href.lstrip("/")
    return filepath.startswith(href) or filepath.endswith(href)

# This looks for filename in dir, and if it doesn't find it, checks the parent directory, and so on
# After that, it reads the contents and returns them along with the directory.
# That way, we can make a template more generic by moving it up directories, and then individual sections can override it.
def file_dispatch(dir, filename):
    MAX_DEPTH = 6
    #print("Looking for " + filename)
    for i in range(MAX_DEPTH):
        try:
            with open(join(dir, filename)) as f:
                data = f.read()
            #print("Found %s in %s with depth %s" % (filename, dir, i))
            return data, dir
        except IOError:
            if os.path.samefile(os.path.abspath(dir), os.path.abspath(src_dir)):
                return None, dir
            else:
                dir = os.path.dirname(dir)
                #print("Descending to " + dir)
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
        #print("{0} & {1} >> {2}".format(links[x],current_filepath,match_link(links[x], current_filepath)))
        innerHTML += format_nav_link(jsondata["innerHTML"],x, current_filepath)
    outerHTML = file_dispatch(dir, join("_templates/",jsondata["template"]))[0].format(innerHTML, jsondata.get("title",""))
    return outerHTML


#target_file is the file that the link is in, aka current_filepath above
def format_nav_link(template, json_link, target_file):
    return template.format( json_link["href"], ' class="link-selected"' if match_link(json_link["href"], target_file) else "", json_link["title"])

def gen_learn_topmenu(dir, filename, contents):
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
    outerHTML = render(join(templatedir,"_templates/", jsondata["template"]), templatedir).format(innerHTML, jsondata.get("title","")) # RECURSION HAPPENS HERE!!!!!
    return outerHTML
#####
# TODO: recursive templating is broken because it tries to look for stuff in the templates dir. go up a dir somewhere
#####



# not tail recursive... but there are bigger problems if the documentation nav tree exceeds callstack size...
def format_sidemenu_link(template, json_link, target_file, depth = 0):
    childrenHTML = ""
    if "children" in json_link:
        for c in json_link["children"]:
            childrenHTML += format_sidemenu_link(template, c, target_file, depth + 1)
    return template.format( json_link["href"], 'class=' + ("navlink" if depth == 0 else "subnavlink"), json_link["title"]) + childrenHTML

# marker->function mapping here
funcs = {
    "%%%HEADER%%%": gen_header,
    "%%%LEARN_TOPMENU%%%": gen_learn_topmenu,
    "%%%SIDEMENU%%%" : gen_sidemenu,
}
def render(filepath, rel_dir):
    with open(filepath, 'r') as f:
        contents = f.read()
    filename = os.path.basename(filepath)
    for k in funcs.keys():
        if k in contents:
            f = funcs[k]
            print("%s <-- %s" % (filename, f.__name__))
            contents = contents.replace(k,f(rel_dir,filename , contents)) # take the appropriate function and replace the marker with its output
    return contents
if __name__ == "__main__":
    print("src_dir = %s" % src_dir)
    for dir, subdirs, files in os.walk(join(os.getcwd(), src_dir)):
        if "_templates" in subdirs:
            subdirs.remove("_templates") # ignore template directory, as we don't want to build templates.
        rel_dir = dir[len(os.getcwd())+1:] # converts absolute path to relative path starting with sources/
        if rel_dir.startswith(src_dir): # 
            rel_dir = rel_dir[len(src_dir):] # set root to be sources/
        else:
            print("### rel_dir (%s) doesn't start with src_dir (%s)... what's going on?" % (rel_dir, src_dir))
        for file in files:
            filepath = join(dir, file)
            if filepath.endswith(".html"):
                outdir = join(os.getcwd(), "out/", rel_dir) 
                contents = render(filepath,rel_dir)
                if not os.path.exists(outdir):
                    os.makedirs(outdir)
                with open(join(outdir, file), 'w+') as f:
                    f.write(contents)

