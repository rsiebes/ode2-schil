
/*
var exec = require('child_process').exec, child, query;
query = 'INSERT DATA {GRAPH <urn:chris:tests:delete:data>{<#book2> <http://purl.org/dc/elements/1.1/title> "Amsterdam en haarfff Data" . <#book2> <http://purl.org/dc/elements/1.1/creator> "Chris3 van Aart" .}}';
child = exec("curl -d \"format=application%2Fsparql-results%2Bjson&query="+escape(query)+"\" ode2.ronald.ops.few.vu.nl/sparql-auth --anyauth -u chris:chrisode2",
             function (error, stdout, stderr) {
                 var result = JSON.parse(stdout.toString());
                 console.log(result);
             });
*/
