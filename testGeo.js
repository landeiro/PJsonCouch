var PJsonCouch = require("./lib/PJsonCouch.js");

// connection without database definition
var test = PJsonCouch({
	host : "127.0.0.1",
	port:5984
});

// These are the same examples of GeoCouch github page: https://github.com/couchbase/geocouch

// modify the default debug settings
test.setDebugConfig({
	debug : false,
	debugOnError : true,
	debugWithHeaders : true,
	throwExceptionsOnError : false
});


// Make a bounding box request
test.queryDesign({
	db : "places",
	design : "main",
	spatial : "points",
	args : {
		bbox : "0,0,180,90"
	}
}, function(data) {
	console.log(data);
});


// Bounding box search and the date line
test.queryDesign({
	db : "places",
	design : "main",
	spatial : "points",
	args : {
		bbox : "110,-60,-30,15",
		plane_bounds:"-180,-90,180,90"
	}
}, function(data) {
	console.log(data.rows);
});


// List function support
test.queryDesign({
	db : "places",
	design : "main",
	spatial : "points",
	list:"wkt",
	args : {
		bbox : "-180,-90,180,90"
	}
}, function(data) {
	console.log(data);
});


// Compaction
test.queryDesign({
	db : "places",
	design : "main",
	spatial : "points",
	action:"_compact"
}, function(data) {
	console.log(data);
});


// Info
test.queryDesign({
	db : "places",
	design : "main",
	spatial : "points",
	action:"_info"
}, function(data) {
	console.log(data);
});

// Cleanup
test.queryDB({
	db : "places",
	action:"_spatial_cleanup",
}, function(data) {
	console.log(data);
});