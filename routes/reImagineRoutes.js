const router = require('express').Router();
const keys = require('../config/keys');
const MongoClient = require('mongodb').MongoClient;
const reImagine = require('../models/reImagineModel');
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

router.get('/view',(req,res)=>{
    MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("reImagineSolutions").find({}).toArray(function(err, result) {
          if (err) res.status(400).json("Error Connecting DB");
          console.log(result);
          res.status(200).render('pages/ri-view.ejs',{data:result,length:result.length});
          db.close();
        });
    }); 
	
});

router.post('/submit',(req,res)=>{
    console.log(req.body);
    const reImagined = new reImagine({
        teamName:req.body.name,
        imgObj:req.body.imgObj,
        imaginations: req.body.imaginations
    });
    MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("reImagineSolutions").insertOne(reImagined,function(err, result) {
          if (err) res.status(400).json("Error Connecting DB");
          res.status(201).redirect('/challenges');
          db.close();
        });
    });
})

// router.post('/delete', (req,res)=>{
//     MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true},function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("jl-oauth-test");
//     dbo.collection('crazyCombinationSolutions', {}, function(err, solution) {
//         solution.deleteMany({}, function(err, result) {
//             if (err) {
//                 console.log(err);
//             }
//             res.status(200).redirect('/crazyCombinations/view');
//             db.close();
//             });
//         });
//     });
// });

router.post('/delete/id', (req,res)=>{
   MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true},function(err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        var myquery = { _id: new mongodb.ObjectID(req.body.id) };
        dbo.collection("reImagineSolutions").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            res.status(200).redirect('/reImagine/view');
            db.close();
          });
    });
});

module.exports = router;