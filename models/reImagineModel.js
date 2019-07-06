const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reImagineSchema = new Schema({
    name:String,
    everyDayObject:String,
    techObject:String,
    solution: String
});

const reImagine = mongoose.model('reImagineSolution', reImagineSchema, 'reImagineSolutions');

module.exports = reImagine;