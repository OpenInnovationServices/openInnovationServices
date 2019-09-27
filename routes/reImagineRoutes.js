const router = require('express').Router();
const keys = require('../config/keys');
const MongoClient = require('mongodb').MongoClient;
const reImagine = require('../models/reImagineModel');
const riImage = require('../models/imageUploadModal');
var mongodb = require('mongodb');

const fs = require('fs');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })


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

router.post('/postPicture', upload.single('newImage'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    var finalImg = {
        contentType: req.file.mimetype,
        data: new Buffer(encode_image, 'base64')
    }

    const newPicture = new riImage({
        picture: finalImg,
        imgText: req.body.imgText,
        display: "0"
    });


    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("riImageSolutions").insertOne(newPicture, function (err, result) {
            if (err) res.status(400).json("Error Connecting DB");
            res.status(201).redirect('/reImagine/view');
            db.close();
        });
    });

})

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

router.get('/getAllImages',(req,res)=>{
     MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db("jl-oauth-test");
            dbo.collection("riImageSolutions").find({ }).toArray(function(err, result) {
              if (err) res.status(400).json("Error Connecting DB");
              res.status(200).json(result);
              db.close();
            });
        }); 
});

router.post('/selectImage',(req,res)=>{
    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        var myquery = { _id: new mongodb.ObjectID(req.body.reImagneObjects) };
        var newValue = { $set: { display: "1" } };
        dbo.collection("riImageSolutions").updateOne(myquery, newValue, function (err, obj) {
            if (err) throw err;
            //console.log("1 document deleted");
            res.status(200).redirect('/reImagine/view');
            db.close();
        });
    });
})

router.get('/getImg', (req, res) => {
    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        var myquery = { display :'1' };
        dbo.collection("riImageSolutions").findOne(myquery, function (err, result) {
            if (err) throw err;
            db.close();
            res.contentType('image/jpg');
            console.log(result.picture.data.buffer);
            res.send(result.picture.data.buffer);
        });
    });
})

module.exports = router;