DESCRIPTION FOR LOCALLY INSTALLED npm MODULE my-json
(used to interface with mysql database)
---------------------------------------------------------
@@ MyJSON - MySQL as JSON @@
This package provides an interface to a MySQL database, accessing data as JSON documents.

Queries are performed using JSON Schema to provide powerful search constraints on the data.

!!!!!!!!!!!!!!Constructing a class!!!!!!!!!!!!!!!!!
You generate a class using a config object. This config file specifies:

which table to use
which column(s) to use for keys
what data types to supply to / expect from different columns
where in the resulting JSON document those values should go
var myJson = require('my-json');
 
var TestClass = myJson({
    table: 'TestTable',
    keyColumn: 'integer/id',
    columns: {
        'integer/id': 'id',
        'string/name': 'name',
        'json': 'json_remainder'
    }
});
This will work with a table structure like:

+----------+----------+----------------+
|    id    |   name   | json_remainder |
+----------+----------+----------------+
|    5     |   blah   | {"extra": 20}  |
+----------+----------+----------------+
Columns of the json type contain a JSON representation of any properties that are not accounted-for by any of the other columns. This table row therefore corresponds to a document like:

{
    "id": 5,
    "name": "blah",
    "extra": 20
}
Currently it only supports plain objects (taken from a single row), but support for arrays (as table joins) is planned - see the PHP equivalent JSON Store for what's planned.

!!!!!!!!!!!!!!!!Binding to a MySQL connection!!!!!!!!!!!!!!
For all the operations, you can either supply a MySQL connection each time, or you can bind a connection.

Binding also creates a cache - this means that if the same document is returned by two different queries, then they will be represented by the same instance. These caches are expected to be temporary (perhaps once per request for a web-server).

var mysql = require('mysql');
var connection = mysql.createConnection({...});
 
var BoundTestClass = TestClass.cacheWith(connection);
Loading, saving, editing
Open:
TestClass.open(connection, 5, function (err, result) {...});
BoundTestClass.open(5, function (err, result) {...});
The arguments given to open() should match (length and order) the columns specified in the config's "keyColumn" (or "keyColumns") property.

If found, result will be an instance of the appropriate class - otherwise, it will be undefined.

Search (with JSON Schema):
var schema = {
    type: "object",
    properties: {
        "id": {"enum": [5]}
    }
};
 
TestClass.search(connection, schema, function (err, results) {...});
BoundTestClass.search(schema, function (err, results) {...});
Currently, the only schema keywords supported are properties and enum, but support for all validation keywords is planned.

!!!!!!!!!!!!!Save!!!!!!!!!!!!!
TestClass.save(connection, testObj, function (err, results) {...});
BoundTestClass.save(testObj, function (err, results) {...});
Create:
Creation is performed by saving an object that is missing a key column:

var newObj = new TestClass();
newObj.name = 'test';
 
TestClass.save(connection, testObj, function (err, results) {...});
// or: 
BoundTestClass.save(testObj, function (err, results) {...});
 
newObj.id; // populated using the auto-increment, if there is one 
Remove/delete:
TestClass.remove(connection, testObj, function (err, results) {...});
BoundTestClass.remove(testObj, function (err, results) {...});
Promises
For the above methods/functions that take a callback as a final argument, the callback can be omitted.

If the callback is omitted, then a Promise object is returned instead (from this module).