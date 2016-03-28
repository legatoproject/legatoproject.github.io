$(function() {
    var links = $("a.navlink");
    var loc = window.location.href;
    links.each(function(index, item) {
        var split = item.href.split("#");
        if (split.length == 2) {
            var target = $("#" + split[1]);
            if (target) {
                var duration = 500;
                $(item).click(function(e) {
                    links.each(function(index, link) {
                        $(link).removeClass("link-selected");
                    });
                    $(this).addClass("link-selected");
                    e.preventDefault();
                    var offset = target.offset();
                    $("body,html").animate({
                        scrollTop: offset.top
                    }, {
                        "duration": duration,
                        "complete": function() {

                        }
                    });
                    return false;
                });
            }
        }
    });

});
function adapt_for_scroll(){
    $('#tree1').css("padding-top",Math.max(50, 110-$(document).scrollTop())); 
}
$(document).ready(function() {
    adapt_for_scroll();
      $(window).scroll(function(){
         adapt_for_scroll();
    });
    $("#menu-trigger").click(function() {
        $("#top")[this.opened ? "removeClass" : "addClass"]("menu-open");
        $(this)[this.opened ? "removeClass" : "addClass"]("trigger-open");
        this.opened = !this.opened;
    });

    $("#top a").click(function() {
        $("#top").removeClass("menu-open");
        $("#menu-trigger").removeClass("trigger-open").get(0).opened = false;

    });

});


function getdata(ctx) {
    var domain = "";
    var invoke_url = "https://x6khds7mia.execute-api.us-west-2.amazonaws.com/prod"; // amazon api proxy for CORS
    
    if(ctx == "Legato Documentation")
        ctx="";
    var keyword = $('#autocomplete').val();

    var ac = $("#autocomplete").autocomplete({
        delay: 10,
        autoFocus: true,
        source: function(request, response) {

            $.ajax({
                url: invoke_url,
                dataType: "json",
                data: new function(){
                    this.q = request.term;
                    this.size = 15;
                    if(ctx != "")
                        this.fq = "context:'" + ctx + "'"; //only include "context:" filter if ctx isnt empty
                    this.sort = "_score desc";
                },
                change: function(e, ui) {
                    console.log(e.target.value);
                },
                success: function(data) {
                    var hits = data.hits.hit;
                    var results = []
                    if (hits.length == 0) {
                        results.push({
                            value: "#",
                            label: "No results found :("
                        });
                    } else
                        for (i = 0; i < hits.length; i++) {
                            var result = new Object();
                            result.value = hits[i].id;
                            result.cat = hits[i].fields.category;
                            if (result.cat === undefined)
                                result.cat = "Root"

                            result.label = "" + result.cat + "<br/><b>" + hits[i].fields.title + "</b>";

                            result.title = hits[i].fields.title;
                            results.push(result);
                        }
                    response(results);
                }
            });

        },

        minLength: 1,
        focus: function(event, ui) {
            event.preventDefault(); // so the textbox's value doesn't get replaced.
        },
        select: function(event, ui) {
            event.preventDefault();
            if (ui.item) {
                window.location = ui.item.value;
            }
            console.log(ui.item ?
                "Selected: " + ui.item.label :
                "Nothing selected, input was " + this.value);
        },
        open: function() {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function() {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });

    ac.data("ui-autocomplete")._renderItem = function(ul, item) {
        var anchor = $("<a>").attr("href", item.value).html(item.label);
        var li = $("<li>");
        anchor.appendTo(li)
        return li.appendTo(ul);
    };

    ac.data("ui-autocomplete")._renderMenu = function(ul, items) {
        var that = this;
        ul.attr('id', "search_result");
        ul.attr('class', "ui-autocomplete ui-front ui-menu ui-widget ui-widget-content");
        $.each(items, function(index, item) {
            that._renderItemData(ul, item);
        });
    };

}



function setupTree(treeURL) {
    $(document).ready(function() {
        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
        $.getJSON(
            treeURL,
            function(data) {
                $tree = $('#tree1');
                $tree.tree({
                    data: data.children,
                    saveState: false,
                    useContextMenu: false,
                    closedIcon: "+",
                    openedIcon: "-",
                    keyboardSupport: false
                });

                var path = window.location.pathname;
                var page = path.split("/").pop();
                var hash = window.location.hash.substr(1);
                page += "#" + hash;
                if (page.endsWith("#")) {
                    page = page.slice(0, -1);
                }
                $tree.tree('selectNode', null);

                $tree.tree('getTree').iterate(
                    function(node, level) {
                        if (node.href === page) {
                            // This will open the folder
                            $tree.tree('openNode', node);
                            $tree.tree('selectNode', node);
                            return false;
                        }
                        return true;
                    }
                );

            }
        );

        //bind click event to tree
        $('#tree1').bind(
            'tree.click',
            function(event) {
                // The clicked node
                var node = event.node;
                var href = node.href;

                // console.log(node.name);
                // console.log(node.href);
                // $('.content').html(node.href);
                // var href = node.href.replace(".html", ".part.html");

                // console.log(href);
                // $('.content').load(href);
                // I removed all this dynamic loading stuff, because it causes a desync between the page you're on, and the content.
                // It's difficult get the url of a page you've navigated to using the tree this way.
                //instead, just navigate to the place.
                window.location.replace(href);
            }
        );
        //bind end



    });
}
