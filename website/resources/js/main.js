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

$(document).ready(function() {
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

$("#Tutorial").bind("click", function() {
    $("#tree1").hide();
    $("#tree2").show();
    $("#tree3").hide();
    $("#tree4").hide();
});

$("#Guides").bind("click", function() {
    $("#tree1").show();
    $("#tree2").hide();
    $("#tree3").hide();
    $("#tree4").hide();
});

$("#API").bind("click", function() {
    $("#tree1").hide();
    $("#tree2").hide();
    $("#tree3").show();
    $("#tree4").hide();
});
$("#Tools").bind("click", function() {
    $("#tree1").hide();
    $("#tree2").hide();
    $("#tree3").hide();
    $("#tree4").show();
});

function getdata() {
    var invoke_url = "";
    var domain = "";
    invoke_url = "http://search-dmitry-legato-c23azpit2gnttqniivoexmuqwy.us-west-2.cloudsearch.amazonaws.com/2013-01-01/search"; //API Gateway endpoint-search all documents;
    $("#search_result").empty();
    var keyword = $('#autocomplete').val();
    // console.log(keyword);

    var ac = $("#autocomplete").autocomplete({

        source: function(request, response) {


            $.ajax({
                url: "https://crossorigin.me/https://search-dmitry-legato-c23azpit2gnttqniivoexmuqwy.us-west-2.cloudsearch.amazonaws.com/2013-01-01/search?",
                dataType: "json",
                data: {
                    q: request.term,
                    size: 15,
                    sort: "_score desc"
                },
                success: function(data) {
                    var hits = data.hits.hit;
                    var results = []
                    for (i = 0; i < hits.length; i++) {
                        var result = new Object();
                        result.value = hits[i].id;
                        result.label =  ""+ hits[i].fields.category +"<br/><b>" +  hits[i].fields.title +"</b>";
                        result.cat = hits[i].fields.category;
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
        var itemclass;
        // TODO: maintain this stuff :
        switch(item.cat){
            case "API Guides":
                itemclass = "sr-api";
                break;
            case "Get Started":
                itemclass = "sr-getstarted";
                break;
            case "Learn":
                itemclass = "sr-learn";
                break;
            case "Tools":
                itemclass = "sr-tools";
                break;
            case "Reference":
                itemclass = "sr-reference";
                break;
            default:
                itemclass = "sr-default";
                break;

        }
        return $("<a class=\"" + itemclass + "\">")
            .attr("href", item.value)
            .html("<li>" + item.label + "</li>")
            .appendTo(ul);
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

function checkbox() {
    console.log($("#category").is(":checked"));
    console.log($('#tree1').css('display'));
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
                    saveState: true,
                    useContextMenu: false
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