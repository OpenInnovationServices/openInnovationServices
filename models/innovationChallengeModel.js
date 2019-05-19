const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const innovationChallengeSchema = new Schema({
    name:String,
    everyDayObject:String,
    techObject:String,
    solution: String
});

const innovationChallenge = mongoose.model('innovationChallengeSolution', innovationChallengeSchema, 'innovationChallengeSolutions');

module.exports = innovationChallenge;