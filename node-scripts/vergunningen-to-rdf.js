var fs = require('fs'),
    Datastore = require('nedb')
  , db = new Datastore({ filename: 'datastore', autoload: true });

// Using a unique constraint with the index
db.ensureIndex({ fieldName: 'id', unique: true }, function (err) {
});


var template = fs.readFileSync('vergunningen-rdf-template.txt').toString();
console.log(template);
 db.find({'properties.categorie':/wonen/ }, function (err, docs) {
 		 		
 		// console.log(JSON.stringify(docs.id));
 		 
 		 
 		 
 		 	for(var i =0 ;i<docs.length ; i++){
 		 		
 		 		//console.log(JSON.stringify(docs[i].id));
 		 		template = template.replace('$$titel$$',docs[i].properties.titel);
 		 		console.log(template);
  			}
  				
        	    		
        	    		   // console.log(JSON.stringify(docs)+"-----------------------------------"); // logs all of the data in docs
        	    });
  
