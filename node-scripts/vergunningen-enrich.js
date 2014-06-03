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
