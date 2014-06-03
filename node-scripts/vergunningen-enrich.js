/**

This Node.js script enriches the json result from the 'vergunningen-scrape.js' 
script with subjects from a whitelist. These subjects are added if they are 
'detected' (currently via simple substring match) in the 'vergunningen' json 
(to be precise: for each item the properties.beschrijving). The respective db 
item is updated accordingly.
Ronald Siebes, VU University Amsterdam - rm.siebes@few.vu.nl - June 2nd 2014

*/


var fs = require('fs'),
    Datastore = require('nedb')
  , db = new Datastore({ filename: 'datastore', autoload: true });


var docs = null;
 
function queryDb(callback){
  db.find({}, function (err, x) {
  		  docs = x; 
 	callback(docs);  
 		
 		 
  });
  
}
  queryDb(do_something_when_you_get_your_result);
 function do_something_when_you_get_your_result(docs){
 
	for(var i =0 ;i<docs.length ; i++){
		var enrichmentType ="";
		if(docs[i].properties.beschrijving.indexOf('splitsen')>-1){
			enrichmentType = "splitsing";
			
		}
		if(docs[i].properties.beschrijving.indexOf('gehandicaptenparkeerplaats')>-1){
			enrichmentType = "gehandicaptenparkeerplaats";
			
		}
		if(docs[i].properties.beschrijving.indexOf('dakterras')>-1){
			enrichmentType = "dakterras";
			
		}
		if(docs[i].properties.beschrijving.indexOf('hellingbaan')>-1){
			enrichmentType = "hellingbaan";
			
		}
		if(enrichmentType!=""){
			db.update({_id:docs[i]._id}, { $addToSet: { enrichments: enrichmentType } }, {}, function () {
					
				});
		}
	}  	    		  
  }
