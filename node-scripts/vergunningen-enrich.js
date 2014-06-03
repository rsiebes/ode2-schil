var fs = require('fs'),
    Datastore = require('nedb')
  , db = new Datastore({ filename: 'datastore', autoload: true });

// Using a unique constraint with the index
db.ensureIndex({ fieldName: 'id', unique: true }, function (err) {
});
 
  db.find({'properties.beschrijving':/splitsen/ }, function (err, docs) {
 		 		
 		 console.log(JSON.stringify(docs.id));
 		 
 		 
 		 
 		 	for(var i =0 ;i<docs.length ; i++){
 		 		
 		 		console.log(JSON.stringify(docs[i].id));
 		 		
 		 		db.update({_id:docs[i]._id}, { $addToSet: { enrichments: 'splitsing' } }, {}, function () {
 		 				
 		 					// console.log(JSON.stringify(docs[i].enrichments)); // logs all of the data in docs
  				});
  			}
  				
        	    		
        	    		   // console.log(JSON.stringify(docs)+"-----------------------------------"); // logs all of the data in docs
        	    });
  
  
  
 db.find({'properties.beschrijving':/dakterras/ }, function (err, docs) {
 		 		
 		 
 		 	for(var i =0 ;i<docs.length ; i++){
 		 		
 		 		console.log(JSON.stringify(docs[i].id));
 		 		
 		 		db.update({_id:docs[i]._id}, { $addToSet: { enrichments: 'dakterras' } }, {}, function () {
 		 				
 		 					// console.log(JSON.stringify(docs[i].enrichments)); // logs all of the data in docs
  				});
  			}
  				
        	    		
        	    		   // console.log(JSON.stringify(docs)+"-----------------------------------"); // logs all of the data in docs
        	    });

   db.find({'properties.beschrijving':/gehandicaptenparkeerplaats/ }, function (err, docs) {
 		 		
 		 console.log(JSON.stringify(docs.id));
 		 	for(var i =0 ;i<docs.length ; i++){
 		 		console.log(JSON.stringify(docs[i].id));
 		 		
 		 		
 		 		db.update({_id:docs[i]._id}, { $addToSet: { enrichments: 'gehandicaptenparkeerplaats' } }, {}, function () {
 		 				
 		 					// console.log(JSON.stringify(docs[i].enrichments)); // logs all of the data in docs
  				});
  			}
  				
        	    		
        	    		   // console.log(JSON.stringify(docs)+"-----------------------------------"); // logs all of the data in docs
        	    });
   
   
   db.find({'properties.beschrijving':/hellingbaan/ }, function (err, docs) {
 		 		
 		 console.log(JSON.stringify(docs.id));
 		 	for(var i =0 ;i<docs.length ; i++){
 		 		console.log(JSON.stringify(docs[i].id));
 		 		
 		 		
 		 		db.update({_id:docs[i]._id}, { $addToSet: { enrichments: 'hellingbaan' } }, {}, function () {
 		 				
 		 					// console.log(JSON.stringify(docs[i].enrichments)); // logs all of the data in docs
  				});
  			}
  				
        	    		
        	    		   // console.log(JSON.stringify(docs)+"-----------------------------------"); // logs all of the data in docs
        	    });
