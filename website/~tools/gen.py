#dmitry's fantastic templating engine, kinda like django but worse

import os
import json
from collections import OrderedDict
import shutil 

    
# This figures out if a link to href from document filepath should be considered as 'link-selected' 
def match_link(href, filepath):
    href = href.lstrip("/")
    return filepath.startswith(href) or filepath.endswith(href)

#
def gen_nav(json_file, current_filepath):
    with open("sources/"+json_file) as f:
        jsondata = json.loads(f.read(), object_pairs_hook=OrderedDict)
    innerHTML = ""
    links = jsondata["links"]
    for x in links.keys():
        #print("{0} & {1} >> {2}".format(links[x],current_filepath,match_link(links[x], current_filepath)))
        innerHTML += jsondata["innerHTML"].format( links[x], ' class="link-selected"' if match_link(links[x], current_filepath) else "", x)
    dir = os.path.dirname(os.path.join(os.getcwd(), "sources/", current_filepath)) # ehhh
    with open(os.path.join(dir, "_templates/",jsondata["template"]), 'r') as f:
        outerHTML = f.read().format(innerHTML)
    return outerHTML


def gen_learn_topmenu(dir, filename, contents):
    print("Generating topmenu for " + filename)
    return gen_nav(os.path.join(dir,"learn_topmenu.json"),os.path.join(dir,filename))


def gen_header(dir, filename, contents):
    print("Generating header for " + filename)
    return gen_nav(os.path.join(dir,"header.json"),os.path.join(dir,filename))


# marker->function mapping here
funcs = {
    "%%%HEADER%%%": gen_header,
    "%%%LEARN_TOPMENU%%%": gen_learn_topmenu,
}

for dir, dirs, files in os.walk(os.path.join(os.getcwd(), "sources/")):
    if "_templates" in dirs:
        dirs.remove("_templates")
    subdir = dir[len(os.getcwd())+1:] #convert absolute path to relative path starting from sources/
    if subdir.startswith("sources/"):
        subdir = subdir[len("sources/"):]
    for file in files:
        filepath = os.path.join(dir, file)
        if filepath.endswith(".html"):
            with open(filepath, 'r') as f:
                contents = f.read()
            for k in funcs.keys():
                contents = contents.replace(k,funcs[k](subdir, file, contents))
            outdir = os.path.join(os.getcwd(), "out/", subdir) 
            if not os.path.exists(outdir):
                os.makedirs(outdir)
            with open(os.path.join(outdir, file), 'w+') as f:
                f.write(contents)

