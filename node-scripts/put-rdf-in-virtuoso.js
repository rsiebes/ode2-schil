

var temp = require('temp'),
    Datastore = require('nedb'),
    fs   = require('fs'),
    util  = require('util'),
    async  = require('async'),
    exec = require('child_process').exec, child, query;
    
    
var db = new Datastore({ filename: 'rdfstore', autoload: true });

  
// Automatically track and cleanup files at exit
//temp.track();

// Fake data


db.find({'virtuoso-inserted':false }, function (err, docs) {
 		 
		
        	var counter=0;		
        	
        	var lastDoc = docs.length;

		async.whilst(function () {
		  return counter < lastDoc;
		},
		function (next) {
			var myData = JSON.stringify(docs[counter].value);
			 myData = myData.substring(1,myData.length-1);
			myData = myData.replace(/\\n/g, "\r\n");
			myData = myData.replace(/\\"/g, "\"");
			temp.open('myprefix', function(err, info) {
				  if (!err) {
				    fs.write(info.fd, myData);
				    fs.close(info.fd, function(err) {
				      exec("rapper -i turtle " + info.path + "", function(err, stdout) {
				      		      //console.log("----------"+stdout+"______________");
				      		      
							query = encodeURIComponent('INSERT DATA {GRAPH <urn:chris:tests:delete:data>{'+stdout+'}}');
							console.log(query);
							child = exec("curl -d \"format=application%2Fsparql-results%2Bjson&query="+query+"\" ode2.ronald.ops.few.vu.nl/sparql-auth --anyauth -u chris:chrisode2",
								     function (error, stdout, stderr) {
									 var result = JSON.parse(stdout.toString());
									 console.log(result);
									 counter++;
				  next();
								     });
					//util.puts(stdout.trim());
				
				      });
				    });
				  }
				  
				});
		
		},
		function (err) {
		  // All things are done!
		});
        		
        	

			 	
		
			
});



		





  
/*
var exec = require('child_process').exec, child, query;
query = 'INSERT DATA {GRAPH <urn:chris:tests:delete:data>{<#book2> <http://purl.org/dc/elements/1.1/title> "Amsterdam en haarfff Data" . <#book2> <http://purl.org/dc/elements/1.1/creator> "Chris3 van Aart" .}}';
child = exec("curl -d \"format=application%2Fsparql-results%2Bjson&query="+escape(query)+"\" ode2.ronald.ops.few.vu.nl/sparql-auth --anyauth -u chris:chrisode2",
             function (error, stdout, stderr) {
                 var result = JSON.parse(stdout.toString());
                 console.log(result);
             });
*/
