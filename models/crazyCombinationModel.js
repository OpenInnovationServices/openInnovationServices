const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crazyCombinationSchema = new Schema({
    name:String,
    everyDayObject:String,
    techObject:String,
    solution: String
});

const crazyCombination = mongoose.model('crazyCombinationSolution', crazyCombinationSchema, 'crazyCombinationSolutions');

module.exports = crazyCombination;