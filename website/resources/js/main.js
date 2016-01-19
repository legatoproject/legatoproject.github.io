$(function() {
    var links = $("a.navlink");
    var loc = window.location.href;
    links.each(function(index, item) {
        var split = item.href.split("#");
        if(split.length == 2) {
            var target = $("#" + split[1]);
            if(target) {
                var duration = 500;
                $(item).click(function(e) {
                    links.each(function(index, link) {
                        $(link).removeClass("link-selected");
                    });
                    $(this).addClass("link-selected");
                    e.preventDefault();
                    var offset = target.offset();
                    $("body,html").animate({scrollTop: offset.top}, {
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

 $(document).ready(function(){
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

    $("#Tutorial").bind("click", function(){
    $("#tree1").hide();
    $("#tree2").show();
    $("#tree3").hide();
    $("#tree4").hide();
});

    $("#Guides").bind("click", function(){
    $("#tree1").show();
    $("#tree2").hide();
    $("#tree3").hide();
    $("#tree4").hide();
});
    
    $("#API").bind("click", function(){
    $("#tree1").hide();
    $("#tree2").hide();
    $("#tree3").show();
    $("#tree4").hide();
});
    $("#Tools").bind("click", function(){
    $("#tree1").hide();
    $("#tree2").hide();
    $("#tree3").hide();
    $("#tree4").show();
});

function getdata(){
    var invoke_url="";
    var domain="";
    invoke_url="http://search-dmitry-legato-c23azpit2gnttqniivoexmuqwy.us-west-2.cloudsearch.amazonaws.com/2013-01-01/search"; //API Gateway endpoint-search all documents;
        $("#search_result").empty();
        var keyword=$('#autocomplete').val();
        console.log(keyword);
        $.get( invoke_url+"?q="+keyword+"&size=15"+"&sort=_score desc", function( data ) {
              //console.log(datadata.hits.hit.fields.content);
              var hits=data.hits.hit;
              console.log("Total Found: "+data.hits.found);
              var i;
              for (i=0;i<hits.length;i++){
                  console.log(hits[i].id);
                  console.log(hits[i].fields.title);
                  domain="<strong>"+hits[i].fields.category+" - </strong>";
                  $("#search_result").append("<a href='/apps/docs/converted/"+hits[i].id+"'><li>"+domain+hits[i].fields.title+"</li></a>");
                }
            });
            
    }
    
function checkbox(){
    console.log($("#category").is(":checked"));
    console.log($('#tree1').css('display'));
    }


