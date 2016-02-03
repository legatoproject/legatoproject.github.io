#dmitry's fantastic templating engine, kinda like django but worse

import os
import sys
import json
from collections import OrderedDict
import shutil 
from os.path import join
import unittest
from bs4 import BeautifulSoup

src_dir = "sources/"

flat_cats = {}

# This figures out if a link to href from document filepath should be considered as 'link-selected' 
def match_link(href, filepath, category_match = True):
    if not category_match and href.endswith("/"):
        href += "index.html"

    if not href.startswith("/"):
        return filepath.endswith(href)
    else:
        return filepath.startswith(href.lstrip("/") if href != "/" else href)


# helpers for file_dispatch
class UnsuitableDirError(Exception):
    pass
class FileNotFoundError(Exception):
    pass
# This looks for filename in dir, and if it doesn't find it, checks the parent directory, and so on
# After that, it reads the contents and returns them along with the directory.
# That way, we can make a template more generic by moving it up directories, and then individual sections can override it.
# subdir can be set to "_templates" to descend into that dir when possible, and only return files from it 
def file_dispatch(dir, filename, subdir = None, only_in_subdir = True):
    #print("Looking for %s" % filename)
    MAX_DEPTH = 64
    already = []
    #print("Looking for " + filename)
    odir = dir
    for i in range(MAX_DEPTH):
        try:
            with open(join(dir, filename)) as f:
                if dir in already or (subdir and only_in_subdir and os.path.basename(dir) != subdir.strip(os.path.sep)):
                    raise UnsuitableDirError("Dir %s isn't suitable" % dir)
                data = f.read()
            #print("Found %s in %s with depth %s" % (filename, dir, i))
            return data, dir
        except (UnsuitableDirError, IOError) as e:
            already.append(dir)
            #print "Not in " + dir
            if os.path.samefile(os.path.abspath(dir), os.path.abspath(src_dir)): # if we can't find it in src_dir, don't ascend further
                raise FileNotFoundError("Couldn't find %s. We started at %s." % (filename,odir))
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
    jsn, dir = file_dispatch(dir, json_file,"_templates/", False)
    jsondata = json.loads(jsn, object_pairs_hook=OrderedDict)
    return gen_nav_from_dict(jsondata,current_filepath)

# Generates a navbar from json. Current filepath is the document it's on, since we need to know which link should light up.
def gen_nav_from_dict(jsondata, current_filepath):
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

def gen_tocfile(dir, filename, contents):
    x = cat_for_link(filename)
    if x is None:
        print filename + " doesn't seem to be in the toc."
        return ""
    else:
        return "/resources/tocs/" + cat_for_link(filename) + ".json"

def split_toc_into_categories(filepath):
    with open(filepath) as f:
        data = json.load(f)
    return data['toc']['children']

    # like gen_topmenu but automatic generation from toc
def gen_autotopmenu(dir, filename, contents):
    innerHTML = '<a href="{0}"{1}>{2}</a>'
    outerHTML = """
    <div id="topMenu">
    <a href=/docs/ class="biglink">Legato Docs</a>
    <nav>
    {0}
    </nav>
    </div>
    """
    output = ""
    my_cat = cat_for_link(filename)

    for cat in cats:
        output += innerHTML.format( cat['href'], ' class="link-selected"' if my_cat == cat['label'] else "", cat['label'])
    return outerHTML.format(output)

# marker->function mapping here
funcs = OrderedDict({
    "%%%TOCFILE%%%" : gen_tocfile,
    "%%%HEADER%%%": gen_header,
    "%%%AUTOTOPMENU%%%": gen_autotopmenu,
    "%%%TOPMENU%%%": gen_topmenu,
    "%%%SIDEMENU%%%" : gen_sidemenu

})



def render_file(filepath, rel_dir):
    with open(filepath, 'r') as f:
        contents = f.read()
    return render(filepath,rel_dir,contents)

def render(filepath, rel_dir, contents):
    filename = os.path.basename(filepath)
    flags=[] ### TODO: somehow use this to avoid repeating calculations
    for k in funcs.keys():
        if k in contents:
            f = funcs[k]
            #print("%s -> %s" % (f.__name__, os.path.relpath(filepath, src_dir)))
            contents = contents.replace(k,f(rel_dir,filename , contents).encode()) # take the appropriate function and replace the marker with its output
    return contents

def meta_to_title(html):
    soup = BeautifulSoup(html)
    titletag = soup.find("meta", attrs={"name":"title"})
    if titletag:
        titletag.extract()
        title = titletag.attrs["content"]
        soup.html.head.title.string = title + " - Legato Docs"# because apparently soup.title is read only
        #print title
    else:
        print "No title meta tag."
    return str(soup)

def get_tree_hrefs(tree):
    l = []
    l.append(tree['href'])
    try:
        for c in tree['children']:
            l.extend(get_tree_hrefs(c))
    except KeyError:
        pass
    return l

def cat_for_link(href):
    for k in flat_cats.keys():
        if href in flat_cats[k]:
            return k
        if href.replace("_source.html",".html") in flat_cats[k]: # because source files aren't in the toc
            return k

if __name__ == "__main__":
    print("src_dir = %s" % src_dir)
    cats = split_toc_into_categories(join(src_dir, "toc.json"))
    tocdir = join(os.getcwd(), "out/resources/tocs/")
    print tocdir
    if not os.path.exists(tocdir):
        os.makedirs(tocdir)
    flat_cats = {cat['label']:get_tree_hrefs(cat) for cat in cats} 
    for cat in cats:
        with open(join(tocdir, cat['label'] + ".json"), "w") as f:
            json.dump(cat, f)

    
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

                    tp, tpdir = file_dispatch(dir, template, subdir = "_templates")
                    #print("%s >> %s -> %s" % (file, join(tpdir, template), os.path.relpath(resulting_filepath, src_dir)))
                    rendered_template = render(resulting_filepath, rel_dir, tp) # render elements in template
                    with open(filepath) as f:
                        contents = rendered_template.replace("{content}",f.read()) # insert content into rendered template
                    contents = meta_to_title(contents)
                    savefile = resulting_filename           
                else:
                    contents = render_file(filepath,rel_dir)
                    savefile=file
                with open(join(outdir, savefile), 'w+') as f:
                    f.write(contents)
            else:
                shutil.copy(filepath, join(outdir, file))





