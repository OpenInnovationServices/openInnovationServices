const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customInnoChallengeSchema = new Schema({
    name:String,
    everyDayObject:String,
    techObject:String,
    solution: String,
    customer: String
});

const customInnovationChallenge = mongoose.model('customInnoChallenge', customInnoChallengeSchema, 'customInnoChallengeCollection');

module.exports = customInnovationChallenge;