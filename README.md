ode2-schil
==========

<b> Note: due to some server troubles caused by heavy rainfall last monday, the live service
is temporarily off-line</b>
Tools and scripts to convert open data to RDF for the Open Data Exchange II project

<h2>INSTALLATION </h2>

The scripts are made for <a href="http://nodejs.org">Node.js </a>, so you need to install that in order to execute them.

<h3>node dependencies</h3>
Also you will need to install some node.js packages, like the <a href="https://github.com/louischatriot/nedb#basic-querying">NEBDB</a> file-based datastore by typing (after having installed node.js):

- npm install nedb --save <i>( a file-based json database)</i>
- npm install temp <i>( writing temp files, needed to execute Raptor rapper RDF parser and transformation)</i>
- npm install async <i>( some things need to be done synchronously, like db updates and some virtuoso inserts. Async is the perfect library to deal with that)</i>

<h3>other dependencies</h3>
- You need to have a virtuoso RDF store running, with sparql 'insert data' permissions via O-Auth
- You need to have the Raptor rapper RDF tool installed, which is needed to transform turtle to N-triples (which is required by the 'insert data' part of SPARQL, needed to put the result in the Virtuoso store)

 
For more info please visit <a href="http://amsterdamopendata.nl> http://amsterdamopdendata.nl </a>

Ronald Siebes - VU University Amsterdam - June 2014 - rm.siebes@few.vu.nl
