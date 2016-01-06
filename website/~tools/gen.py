#dmitry's fantastic templating engine, kinda like django but worse

import os
import json
from collections import OrderedDict
import shutil 

    
def match_link(x, filepath):
    x = x.replace("/docs/apps/","") #  dumb
    x = x.replace("/docs/apps/","") #
    return filepath.startswith(x) or filepath.endswith(x)

#
def gen_nav(json_file, current_filepath, prefix, postfix, link_innerhtml='<a href="{0}"{1}>{2}</a>\n'):
    with open("sources/"+json_file) as f:
        j = json.loads(f.read(), object_pairs_hook=OrderedDict)
    html = prefix
    for x in j.keys():
        html += link_innerhtml.format( j[x], ' class="link-selected"' if match_link(j[x], current_filepath) else "", x)
    html += postfix
    return html


def gen_learn_topmenu(dir, filename, contents):
    print("Generating topmenu for " + filename)
    prefix = '''<div id="topMenu">
            <a href=/docs/apps/learn/ class="biglink">Learn</a>
            <nav>\n'''
    postfix = '</nav></div>\n'
    return gen_nav(os.path.join(dir,"learn_topmenu.json"),os.path.join(dir,filename),prefix,postfix)


def gen_header(dir, filename, contents):
    print("Generating header for " + filename)
    prefix = '''<div id="menudocumentation">
                    <header>
                    <h1><a title="back to Legato documentation homepage" href="/docs/" class="navlink">Legato</a></h1>
                    <h2>/ Build Apps Documentation</h2>
                    <nav>\n'''
    postfix =   '''     <i class="fa fa-search"></i>
                        <input id="autocomplete" onkeyup="getdata()"> <input id="category" type="checkbox" onclick="checkbox()"> <label for="category">API Search</label>
                        <ul id="search_result" class="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content" tabindex="0"></ul>
                        </nav>
                    </header>
                </div>'''
    return gen_nav(os.path.join(dir,"header.json"),os.path.join(dir,filename),prefix,postfix)
# marker->function mapping here
funcs = {
    "%%%HEADER%%%": gen_header,
    "%%%LEARN_TOPMENU%%%": gen_learn_topmenu,
}


for dir, dirs, files in os.walk(os.path.join(os.getcwd(), "sources/")):
    subdir = dir[len(os.getcwd())+1:].replace("sources/","")
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

