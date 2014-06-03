/**

This Node.js script puts the json result of a provided 'geozet vergunningen' uri into a 
local file database (nedb) and stores a flat text file with the json 
serialization in the db with a day-hour timestamp as a key 
Ronald Siebes, VU University Amsterdam - rm.siebes@few.vu.nl - June 2nd 2014

*/


var http = require('http');
var url = 'http://geozet.koop.overheid.nl/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=geozet:bekendmakingen_punt&outputFormat=json&FILTER=%3CFilter%3E%3CPropertyIsLike%20wildCard=%27*%27%20singleChar=%27.%27%20escape=%27!%27%3E%3CPropertyName%3Egeozet:overheid%3C/PropertyName%3E%3CLiteral%3EAmsterdam*%3C/Literal%3E%3C/PropertyIsLike%3E%3C/Filter%3E';
var fs = require('fs'),
    Datastore = require('nedb')
  , db = new Datastore({ filename: 'datastore', autoload: true });

// Using a unique constraint with the index in our local db
db.ensureIndex({ fieldName: 'id', unique: true }, function (err) {
});

// get the url from the input
process.argv.forEach(function (val, index, array) {
		if(val.indexOf('url')>-1){
			url = val;			
		}
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
						
						if(!Object.keys(docs).length)
						{
							db.insert(document, function (err, newDoc) {
									console.log(document.id);
									
							});
						}
						console.log(JSON.stringify(document));
						 
				    });
        			});
        	})();	
        	
        };
    
    });
}).on('error', function(e) {
      console.log("Got error: ", e);
});



