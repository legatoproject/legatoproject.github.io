//New file function: test search function 2015.10.21

function searchAWS(){
	console.log("123");
	/*
	$.ajax({
		type: 'GET',
		url:"http://www.legato.io/legato-docs/15_08/getstarted_main.html",
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		success:function(json){
         // do stuff with json (in this case an array)
			alert("Success");
		},
		error:function(){
			alert("Error");
		}      
	});
	*/
	
	/*
// Using YQL and JSONP
$.ajax({
    url: "http://query.yahooapis.com/v1/public/yql",
 
    // The name of the callback parameter, as specified by the YQL service
    jsonp: "callback",
 
    // Tell jQuery we're expecting JSONP
    dataType: "jsonp",
 
    // Tell YQL what we want and that we want JSON
    data: {
        q: "select title,abstract,url from search.news where query=\"cat\"",
        format: "json"
    },
 
    // Work with the response
    success: function( response ) {
        console.log( response ); // server response
    }
});

*/
	var csd = new AWS.CloudSearchDomain({endpoint: 'doc-legato-ialk7yrq2u2jnav4izjqvtep6y.us-west-2.cloudsearch.amazonaws.com'});
	csd.search("ecall", function (err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);           // successful response
	});
	
	}
