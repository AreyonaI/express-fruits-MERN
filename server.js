const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/.env' });


const fruits = require('./models/fruits.js');
const veggies = require('./models/veggies.js');
const Fruit = require('./models/fruits.js');
const Veggie = require('./models/veggies.js');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

// Set up view engine
const jsxViewEngine = require('jsx-view-engine');
app.engine('jsx', jsxViewEngine());
app.set('view engine', 'jsx');

app.use(express.urlencoded({ extended: false }));


app.post('/fruits', async (req, res) => {
  try {
    if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
    }
    const createdFruit = await fruits.create(req.body);
    res.redirect('/fruits');
  } catch (error) {
    console.error('Error creating fruit:', error);
    res.redirect('/fruits'); // or handle the error in another way
  }
});

app.get('/fruits', async (req, res) => {
  try {
    const allFruits = await fruits.find();
    res.render('fruits/Index', {
      fruits: allFruits,
    });
  }
  catch (error) {
    console.error('error fetching fruits', error);
    res.render('ErrorPage', { error: 'Failed to fetch fruits' })
  }
});

app.get('/veggies', async (req, res) => {
  try {
   
    const allVeggies = await veggies.find();
    res.render('veggies/Index', {
      veggies: allVeggies
    });
  }
  catch (error) {
    console.error('error fetching veggies', error);
    res.render('ErrorPage', { error: 'Failed to fetch veggies' })
  }
});



app.post('/veggies', async (req, res) => {
  try {
    if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
    }
    const createdVeggie = await veggies.create(req.body);
    res.redirect('/veggies');
  } catch (error) {
    console.error('Error creating veggie:', error);
    res.redirect('/veggies'); // or handle the error in another way
  }
});



app.use((req, res, next) => {
  console.log('I run for all routes');
  next();
});

// Define Routes
app.get('/', (req, res) => {
  res.send('This is the homepage for Fruits and Veggies');
});

app.get('/fruits/new', (req, res) => {
  res.render('fruits/New');
});
app.get('/veggies/new', (req, res) => {
  res.render('veggies/New');
});



//new show route
app.get('/fruits/:id', async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);

    if (foundFruit) {
      res.render('fruits/Show', {
        Fruit: foundFruit
      });
    }
    else {
      res.render('ErrorPage', { error: 'Fruit not found' });
      return;
    }
  }
  catch (error) {
    console.log('Can not find fruit ID', error);
    res.render('ErrorPage', { error: 'Failed to fetch fruit ID' })
  }
});


//'delete' method using post
app.post('/fruits/:id', async (req, res) => {

  try {
    const deletedFruit = await fruits.findByIdAndDelete(req.params.id);
    if (!deletedFruit) {
      res.render('ErrorPage', { error: 'Fruit not found' });
      return;
    }
    res.render("fruits/Delete",{
      fruit: deletedFruit
    })
  } catch (error) {
    console.error('Error deleting fruit:', error);
    res.render('ErrorPage', { error: 'Failed to delete fruit' });
  }
});





app.get('/veggies/:id', async (req, res) => {
  try {
    const foundVeggie = await Veggie.findById(req.params.id);

    if (foundVeggie) {
      res.render('veggies/Show', {
        Veggie: foundVeggie
      });
    }
    else {
      res.render('ErrorPage', { error: 'Veggie not found' });
      return;
    }
  }
  catch (error) {
    console.log('Can not find veggie ID', error);
    res.render('ErrorPage', { error: 'Failed to fetch veggie ID' })
  }
});

app.post('/veggies/:id', async (req, res) => {

  try {
    const deletedVeggie = await veggies.findByIdAndDelete(req.params.id);
    if (!deletedVeggie) {
      res.render('ErrorPage', { error: 'Veggie not found' });
      return;
    }
    res.render("veggies/Delete",{
      veggie: deletedVeggie
    })
  } catch (error) {
    console.error('Error deleting veggie:', error);
    res.render('ErrorPage', { error: 'Failed to delete veggie' });
  }
});
app.listen(3000, function () {
  console.log('Server started on port 3000');
});
