const router = require('express').Router();
const keys = require('../config/keys');
const MongoClient = require('mongodb').MongoClient;
const innovationChallenge = require('../models/innovationChallengeModel');



router.get('/',(req,res)=>{
    //res.status(200).render('pages/index.ejs');
    MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("innovationChallengeSolutions").find({}).toArray(function(err, result) {
          if (err) res.status(400).json("Error Connecting DB");
          res.status(200).render('pages/ic-index.ejs',{length:result.length});
          db.close();
        });
    }); 
	
});

//create home route
router.get('/view',(req,res)=>{
    MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("innovationChallengeSolutions").find({}).toArray(function(err, result) {
          if (err) res.status(400).json("Error Connecting DB");
          res.status(200).render('pages/ic-view.ejs',{data:result,length:result.length});
          db.close();
        });
    }); 
	
});

router.post('/',(req,res)=>{
    const idea = new innovationChallenge({
        name:req.body.teamName,
        everyDayObject:req.body.everyDayObject,
        techObject:req.body.techObject,
        solution: req.body.solution
    });
    MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("innovationChallengeSolutions").insertOne(idea,function(err, result) {
          if (err) res.status(400).json("Error Connecting DB");
          res.status(201).redirect('/innovationChallenge');
          db.close();
        });
    });
})

router.post('/delete', (req,res)=>{
    MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true},function(err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
    dbo.collection('innovationChallengeSolutions', {}, function(err, solution) {
        solution.deleteMany({}, function(err, result) {
            if (err) {
                console.log(err);
            }
            res.status(200).redirect('/innovationChallenge/view');
            db.close();
            });
        });
    });
});

module.exports = router;