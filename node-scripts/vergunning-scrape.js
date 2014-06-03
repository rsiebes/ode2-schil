var http = require('http');

var url = 'http://geozet.koop.overheid.nl/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=geozet:bekendmakingen_punt&outputFormat=json&FILTER=%3CFilter%3E%3CPropertyIsLike%20wildCard=%27*%27%20singleChar=%27.%27%20escape=%27!%27%3E%3CPropertyName%3Egeozet:overheid%3C/PropertyName%3E%3CLiteral%3EAmsterdam*%3C/Literal%3E%3C/PropertyIsLike%3E%3C/Filter%3E';
var fs = require('fs'),
    Datastore = require('nedb')
  , db = new Datastore({ filename: 'datastore', autoload: true });

// Using a unique constraint with the index
db.ensureIndex({ fieldName: 'id', unique: true }, function (err) {
});

http.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        var geozetResponse = JSON.parse(body);
        for (var i=0; i<geozetResponse['features'].length; i++){
        	(function() {
        			var j = i;
        			process.nextTick(function() {
        			
        			var document = geozetResponse['features'][j];
        			document.enrichments = [];
        	
				db.find({ "id" : document['id']}, function (err, docs) {
						console.log(JSON.stringify(document));
						// console.log(JSON.stringify(document));
						if(!Object.keys(docs).length)
						{
							
							//console.log("toch wat");
							db.insert(document, function (err, newDoc) {
									console.log(document.id);
									
							});
							//console.log(geozetResponse['features'][i]);
						}
						 // logs all of the data in docs
						   // console.log(JSON.stringify(docs)+"-----------------------------------"); // logs all of the data in docs
				    });
        			
        			
        			
        			});
        	})();
        			
        	
        	
        	
        	
        	
        };
    
        	   
        	//console.log("response "+i,geozetResponse['features'][i]);
        
        //console.log("Got response: ", geozetResponse);
    });
}).on('error', function(e) {
      console.log("Got error: ", e);
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
