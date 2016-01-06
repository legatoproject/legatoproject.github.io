#dmitry's fantastic templating engine, kinda like django but worse

import os
import json
from collections import OrderedDict
import shutil 
from os.path import join
    
# This figures out if a link to href from document filepath should be considered as 'link-selected' 
def match_link(href, filepath):
    href = href.lstrip("/")
    return filepath.startswith(href) or filepath.endswith(href)

# This looks for filename in dir, and if it doesn't find it, checks the parent directory, and so on
# After that, it reads the contents and returns them along with the directory.
def file_dispatch(dir, filename):
    MAX_DEPTH = 5
    print("Looking for " + filename)
    for i in range(MAX_DEPTH):
        try:
            with open(join(dir, filename)) as f:
                data = f.read()
            print("Found %s in %s with depth %s" % (filename, dir, i))
            return data, dir
        except EnvironmentError:
            if os.path.samefile(os.path.abspath(dir), os.path.abspath("sources/")):
                return None, dir
            else:
                dir = os.path.dirname(dir)
                print("Descending to " + dir)
                continue
    print("###Couldn't find " + filename)
    return None, dir

def gen_nav(json_file, current_filepath):
    dir = os.path.dirname(join(os.getcwd(), "sources/", current_filepath)) # ehhh
    jsn, dir = file_dispatch(dir, json_file)
    jsondata = json.loads(jsn, object_pairs_hook=OrderedDict)
    innerHTML = ""
    links = jsondata["links"]
    for x in links.keys():
        #print("{0} & {1} >> {2}".format(links[x],current_filepath,match_link(links[x], current_filepath)))
        innerHTML += jsondata["innerHTML"].format( links[x], ' class="link-selected"' if match_link(links[x], current_filepath) else "", x)
    

    outerHTML = file_dispatch(dir, join("_templates/",jsondata["template"]))[0].format(innerHTML, jsondata.get("title",""))
    return outerHTML


def gen_learn_topmenu(dir, filename, contents):
    print("Generating topmenu for " + filename)
    return gen_nav("topmenu.json",join(dir,filename))


def gen_header(dir, filename, contents):
    print("Generating header for " + filename)
    return gen_nav("header.json",join(dir,filename))


# marker->function mapping here
funcs = {
    "%%%HEADER%%%": gen_header,
    "%%%LEARN_TOPMENU%%%": gen_learn_topmenu,
}

for dir, dirs, files in os.walk(join(os.getcwd(), "sources/")):
    if "_templates" in dirs:
        dirs.remove("_templates")
    subdir = dir[len(os.getcwd())+1:] #convert absolute path to relative path starting from sources/
    if subdir.startswith("sources/"):
        subdir = subdir[len("sources/"):]
    for file in files:
        filepath = join(dir, file)
        if filepath.endswith(".html"):
            with open(filepath, 'r') as f:
                contents = f.read()
            for k in funcs.keys():
                if k in contents:
                    contents = contents.replace(k,funcs[k](subdir, file, contents))
            outdir = join(os.getcwd(), "out/", subdir) 
            if not os.path.exists(outdir):
                os.makedirs(outdir)
            with open(join(outdir, file), 'w+') as f:
                f.write(contents)

