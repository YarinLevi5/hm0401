let json = require('./resources/users.json');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("node-db");
    dbo.collection("node").insertMany(json, function (err, res) {
        if (err) throw err;
        console.log("documents inserted");
        db.close();
    });
});

var pass = process.env.mongo;
console.log(pass)