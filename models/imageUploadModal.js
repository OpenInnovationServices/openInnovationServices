const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reImagineImageSchema = new Schema({
    picture:{
        data: Buffer,
        contentType: String
    },
    imgText: String,
    display:String
});

const riImage = mongoose.model('riImageSolution', reImagineImageSchema, 'riImageSolutions');

module.exports = riImage;