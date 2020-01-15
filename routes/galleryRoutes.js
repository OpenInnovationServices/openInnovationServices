const router = require('express').Router();
const keys = require('../config/keys');
const MongoClient = require('mongodb').MongoClient;
const gallery = require('../models/galleryModel');
var mongodb = require('mongodb');
const fs = require('fs');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

router.get('/', (req, res) => {
    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("gallerySolutions").find({}).toArray(function (err, result) {
            //.sort({position : 1})
            //.collation({locale: "en_US", numericOrdering: true})
            
            if (err) res.status(400).json("Error Connecting DB");
            //console.log(result);
            res.status(200).render('pages/gallery.ejs', { data: result, length: result.length });
            //console.log(result[0]._id);
            db.close();
        });
    });

});

router.get('/dashboard', (req, res) => {
    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("gallerySolutions").find({}).toArray(function (err, result) {
            // .sort({position : 1})
            // .collation({locale: "en_US", numericOrdering: true})
            
            if (err) res.status(400).json("Error Connecting DB");
            //console.log(result);
            res.status(200).render('pages/galleryDashboard.ejs', { data: result, length: result.length });
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
    var pos = calculatePosition();
    const newPicture = new gallery({
        picture: finalImg,
        imgText: req.body.imgText,
        position: pos
    });


    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("gallerySolutions").insertOne(newPicture, function (err, result) {
            if (err) res.status(400).json("Error Connecting DB");
            res.status(201).redirect('/gallery/dashboard');
            db.close();
        });
    });


})

router.get('/img/:imgId', (req, res) => {
    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        var myquery = { _id: new mongodb.ObjectID(req.params.imgId) };
        dbo.collection("gallerySolutions").findOne(myquery, function (err, result) {
            if (err) throw err;
            db.close();
            res.contentType('image/jpg');
            //console.log(result.picture.data.buffer);
            res.send(result.picture.data.buffer);
        });
    });
})

router.post('/delete/id', (req, res) => {
    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        var myquery = { _id: new mongodb.ObjectID(req.body.id) };
        dbo.collection("gallerySolutions").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            //console.log("1 document deleted");
            res.status(200).redirect('/gallery/dashboard');
            db.close();
        });
    });
});

router.put('/update/:id', (req, res) => {
    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        var myquery = { _id: new mongodb.ObjectID(req.params.id) };
        var newValue = { $set: { position: req.body.position } };
        console.log(req.params.id+"->"+req.body.position);
        dbo.collection("gallerySolutions").updateOne(myquery, newValue, function (err, obj) {
            if (err) throw err;
            //console.log("1 document deleted");
            res.status(200).redirect('/gallery/dashboard');
            db.close();
        });
    });
});


function calculatePosition() {
    var pos = 0;
    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jl-oauth-test");
        dbo.collection("gallerySolutions").find({}).toArray(function (err, result) {
            if (err) res.status(400).json("Error Connecting DB");
            //console.log(result);
            db.close();
            pos = result.length + 1;
        });
    });
    return pos;
}

/**
* Generic array sorting
*
* @param property
* @returns {Function}
*/
var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};

module.exports = router;