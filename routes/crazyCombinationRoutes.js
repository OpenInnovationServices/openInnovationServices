const router = require('express').Router();
const keys = require('../config/keys');
const MongoClient = require('mongodb').MongoClient;
const crazyCombination = require('../models/crazyCombinationModel');
var mongodb = require('mongodb');

router.get('/',(req,res)=>{
    //res.status(200).render('pages/index.ejs');
    MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("crazyCombinationEsbSolutions").find({}).toArray(function(err, result) {
          if (err) res.status(400).json("Error Connecting DB");
          res.status(200).render('pages/cc-index.ejs',{length:result.length});
          db.close();
        });
    }); 
	
});

//create home route
router.get('/view',(req,res)=>{
    MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("crazyCombinationEsbSolutions").find({}).toArray(function(err, result) {
          if (err) res.status(400).json("Error Connecting DB");
          //console.log(result);
          res.status(200).render('pages/cc-view.ejs',{data:result,length:result.length});
          db.close();
        });
    }); 
	
});

router.post('/',(req,res)=>{
    const idea = new crazyCombination({
        name:req.body.brandName,
        player:req.body.teamName,
        school:req.body.school,
        everyDayObject:req.body.everyDayObject,
        techObject:req.body.techObject,
        solution: req.body.solution
    });
    MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("crazyCombinationEsbSolutions").insertOne(idea,function(err, result) {
          if (err) res.status(400).json("Error Connecting DB");
          res.status(201).redirect('/crazyCombinations');
          db.close();
        });
    });
})

router.post('/delete', (req,res)=>{
    MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true},function(err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
    dbo.collection('crazyCombinationEsbSolutions', {}, function(err, solution) {
        solution.deleteMany({}, function(err, result) {
            if (err) {
                console.log(err);
            }
            res.status(200).redirect('/crazyCombinations/view');
            db.close();
            });
        });
    });
});

router.post('/delete/id', (req,res)=>{
   MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true},function(err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        var myquery = { _id: new mongodb.ObjectID(req.body.id) };
        dbo.collection("crazyCombinationEsbSolutions").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            res.status(200).redirect('/crazyCombinations/view');
            db.close();
          });
    });
});

module.exports = router;