const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser');
const crazyCombinationRoutes=require('./routes/crazyCombinationRoutes');
const innovationChallenge=require('./routes/innovationChallengeRoutes');
const customInnovationChallenge=require('./routes/customInnovationChallengeRoutes');
const reImagine = require('./routes/reImagineRoutes');
const gallery = require('./routes/galleryRoutes');
const sustainableSolution = require('./routes/sustainableSolutionsRoutes');

//Setting Port
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));

// set the view engine to ejs
app.set('view engine', 'ejs');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.status(200).send("Welcome to Open Innovation Services");
})

//set up routes
app.use('/crazyCombinations', crazyCombinationRoutes);
app.use('/innovationChallenge', innovationChallenge);
// app.use('/innovationChallenge/enterpriseIreland', customInnovationChallenge);
app.use('/reImagine', reImagine);
app.use('/gallery', gallery);
app.use('/sustainableSolution', sustainableSolution);

app.get('/challenges',(req,res)=>{
    res.status(200).render('pages/challenges-index.ejs');
})

app.get('/newSprint',(req,res)=>{
    res.status(200).render('pages/sprintIndex.ejs');
})


app.get('/dashboard',(req,res)=>{
    res.status(200).render('pages/master-view.ejs');
})

app.get('/videoWall',(req,res)=>{
    res.status(200).render('pages/videoWall.ejs');
})

// Handle 404 - Keep this as a last route
app.use(function(req, res, next) {
    res.status(404).send('404: File Not Found');
});


app.listen(port,()=>{
	console.log('app now listening for request on port 3000');
});