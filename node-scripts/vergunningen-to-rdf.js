var fs = require('fs'),
    Datastore = require('nedb')
  , db = new Datastore({ filename: 'datastore', autoload: true });

// Using a unique constraint with the index
db.ensureIndex({ fieldName: 'id', unique: true }, function (err) {
		fillTemplates();
});


function fillTemplates(){

	var template = fs.readFileSync('vergunningen-rdf-template.txt').toString();
	console.log(template);
	db.find({'properties.categorie':/wonen/ }, function (err, docs) {
 		 		
 		// console.log(JSON.stringify(docs.id));
 		 
 		 
 		 
		for(var i =0 ;i<docs.length ; i++){
			(function() {
				var j = i;
				var newValue = template+"";
				process.nextTick(function() {
				
					//console.log(JSON.stringify(docs[i].id));
					newValue = newValue.replace(/$$id$$/gi,docs[j].id);
					newValue = newValue.replace('$$titel$$',docs[j].properties.titel);
					newValue = newValue.replace('$$beschrijving$$',docs[j].properties.beschrijving);
					newValue = newValue.replace('$$categorie$$',docs[j].properties.categorie);
					newValue = newValue.replace('$$onderwerp$$',docs[j].properties.onderwerp);
					newValue = newValue.replace('$$url$$',docs[j].properties.url);
					var rdnap_pos_x = docs[j].geometry.coordinates[0];
					newValue = newValue.replace('$$rdnap_pos_x$$',rdnap_pos_x);
					var rdnap_pos_y = docs[j].geometry.coordinates[1];
					newValue = newValue.replace('$$rdnap_pos_y$$',rdnap_pos_y);
					
					var location_id = "location_"+rdnap_pos_x+"_"+rdnap_pos_y;
					newValue = newValue.replace('$$location_id$$',location_id);
					newValue = newValue.replace('$$location_id$$',location_id);//need to be done twice
					
					
					var url = docs[j].properties.url;
					
					var stadsdeel_label = "onbekend stadsdeel";
					var stadsdeel_homepage = "http://onbekende-url.nl";
					if(url.indexOf('zuid.amsterdam.nl')>-1){
						stadsdeel_label = "Gemeente Amsterdam, Stadsdeel Zuid"
						stadsdeel_homepage = "http://www.zuid.amsterdam.nl";
						
						
					}else if(url.indexOf('nieuwwest.amsterdam.nl')>-1){
						stadsdeel_label = "Gemeente Amsterdam, Stadsdeel Nieuw-West"
						stadsdeel_homepage = "http://www.nieuwwest.amsterdam.nl";
						
						
					}else if(url.indexOf('noord.amsterdam.nl')>-1){
						stadsdeel_label = "Gemeente Amsterdam, Stadsdeel Noord"
						stadsdeel_homepage = "http://www.noord.amsterdam.nl";
						
						
					}
					newValue = newValue.replace('$$stadsdeel_label$$',stadsdeel_label);
					newValue = newValue.replace('$$stadsdeel_homepage$$',stadsdeel_homepage);
					
					if(docs[j].enrichments.length>0){
						newValue = newValue.replace('$$whitelist1$$',docs[j].enrichments[0]);
					}else{
						newValue = newValue.replace('\n    dc:subject dbpedia_nl:$$whitelist1$$;','');	
					}
					if(docs[j].enrichments.length>1){
						newValue = newValue.replace('$$whitelist2$$',docs[j].enrichments[1]);
					}else{
						newValue = newValue.replace('\n    dc:subject dbpedia_nl:$$whitelist2$$;','');	
					}
					if(docs[j].enrichments.length>2){
						newValue = newValue.replace('$$whitelist3$$',docs[j].enrichments[2]);
					}else{
						newValue = newValue.replace('\n    dc:subject dbpedia_nl:$$whitelist3$$;','');	
					}
					console.log(newValue);
				});
				
			})();
				
		}
			
			
			   // console.log(JSON.stringify(docs)+"-----------------------------------"); // logs all of the data in docs
	    });
}
  
