$(function() {
    var links = $("a.navlink");
    var loc = window.location.href;
    links.each(function(index, item) {
        var split = item.href.split("#");
        if(split.length == 2) {
            var target = $("#" + split[1]);
            if(target) {
                var duration = 1400;
                $(item).click(function(e) {
                    links.each(function(index, link) {
                        $(link).removeClass("link-selected");
                    });
                    $(this).addClass("link-selected");
                    e.preventDefault();
                    var offset = target.offset();
                    $("body,html,document").animate({scrollTop: offset.top}, {
                        "duration": duration,
                        "complete": function() {
                            var div = $("<div style='height: 101%;'></div>");
                            $("body").append(div);
                            setTimeout(function() {
                                div.remove();
                                window.location.href = loc + "#" + split[1];
                            }, 100);
                        }
                    });
                    return false;
                });
            }
        }
    });
    
});