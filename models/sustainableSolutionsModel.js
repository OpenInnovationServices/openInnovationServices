const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sustainableSolutionSchema = new Schema({
    name:String,
    player:String,
    school:String,
    everyDayObject:String,
    techObject:String,
    solution: String
});

const sustainableSolution = mongoose.model('sustainableSolutionSolution', sustainableSolutionSchema, 'sustainableSolutionSolutions');

module.exports = sustainableSolution;