const express = require('express');
const app = express();
const fruits = require('./models/fruits.js');
const veggies = require('./models/veggies.js');
const jsxViewEngine = require('jsx-view-engine');


// Set up view engine
app.engine('jsx', jsxViewEngine());
app.set('view engine', 'jsx');


app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
  console.log('I run for all routes');
  next();
});

// Define Routes
app.get('/', (req, res) => {
  res.render('This is the homepage for Fruits and Veggies');
});

app.get('/fruits', (req, res) => {
  res.render('Index', { fruits: fruits });
});

app.get('/fruits/new', (req, res) => {
    res.render('New');
});

app.post('/fruits', (req, res)=>{
    console.log(req.body);
    res.send('data received');
});

app.post('/fruits', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    fruits.push(req.body);
    console.log(fruits);
    res.send('data received');
});

app.post('/fruits', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    console(fruits)
    res.redirect('/fruits'); //send the user back to /fruits
});




app.get('/fruits/:indexOfFruitsArray', (req, res) => {
  const index = parseInt(req.params.indexOfFruitsArray);
  if (index >= 0 && index < fruits.length) {
    res.render('Show', { fruits: fruits[index] });//"fruits" is the name of the variable we set equal to the fruits array from fruit.js
  } else {
    res.render('Invalid index');
  }
});

app.get('/veggies', (req, res) => {
  res.render(veggies);
});

app.get('/veggies/:indexOfVeggiesArray', (req, res) => {
  const index = parseInt(req.params.indexOfVeggiesArray);
  if (index >= 0 && index < veggies.length) {
    res.render(veggies[index]);
  } else {
    res.render('Invalid index');
  }
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
