var fs = require('fs'),
    Datastore = require('nedb')
  , db = new Datastore({ filename: 'datastore', autoload: true });

    //generate data to add to datafile
 var document = { Shift: "Late"
               , StartTime: "4:00PM"
               , EndTime: "12:00AM"
               };

    // add the generated data to datafile
db.insert(document, function (err, newDoc) {
});

    //test to ensure that this search returns data
db.find({ }, function (err, docs) {
            console.log(JSON.stringify(docs)); // logs all of the data in docs
        });

