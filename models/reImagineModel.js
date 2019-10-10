const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reImagineSchema = new Schema({
    teamName:String,
    imgObj:String,
    ilength:String,
    imaginations:String
});

const reImagine = mongoose.model('reImagineSolution', reImagineSchema, 'reImagineSolutions');

module.exports = reImagine;