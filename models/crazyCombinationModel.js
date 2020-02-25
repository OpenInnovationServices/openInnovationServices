const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crazyCombinationEsbSchema = new Schema({
    name:String,
    player:String,
    school:String,
    everyDayObject:String,
    techObject:String,
    solution: String
});

const crazyCombination = mongoose.model('crazyCombinationEsbSolution', crazyCombinationEsbSchema, 'crazyCombinationEsbSolutions');

module.exports = crazyCombination;