const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    picture:{
        data: Buffer,
        contentType: String
    },
    imgText: String
});

const gallery = mongoose.model('gallerySolution', gallerySchema, 'gallerySolutions');

module.exports = gallery;