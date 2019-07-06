const router = require('express').Router();
const keys = require('../config/keys');
const MongoClient = require('mongodb').MongoClient;
const innovationChallenge = require('../models/innovationChallengeModel');
var mongodb = require('mongodb');


router.get('/',(req,res)=>{
    res.status(200).render('pages/ri-index.ejs');
    // MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true}, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("jl-oauth-test");
    //     dbo.collection("innovationChallengeSolutions").find({}).toArray(function(err, result) {
    //       if (err) res.status(400).json("Error Connecting DB");
    //       res.status(200).render('pages/ic-index.ejs',{length:result.length});
    //       db.close();
    //     });
    // }); 
	
});

module.exports = router;