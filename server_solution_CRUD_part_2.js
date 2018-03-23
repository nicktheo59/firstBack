/** This is our server file! Where the magic happens. **/

// require express, for routing, and body parser, for form parsing
let express = require('express'),
    bodyParser = require('body-parser');

// connect to db models
let db = require('./models');

// make a new express app named "app".
let app = express();

// Body parser and encoding setup.
app.use(bodyParser.urlencoded({
    extended: true
}));

// get all
app.get('/api/creatures', (req, res) => {
  db.Creature.find((err, allCreatures) => {
    if (err) {
      console.log(`index error: ${err}`);
    } else {
      res.json({
        creatures: allCreatures
      });
    }
  });
});

// get one
app.get('/api/creatures/:id', (req, res) => {
  db.Creature.findOne({
    _id: req.params.id
  }, (err, creature) => {
    if (err) {
      console.log(`show error: ${err}`);
    }
    res.json(creature);
  });
});

// create new
app.post('/api/creatures', (req, res) => {
  let newCreature = new db.Creature(req.body);
  newCreature.save((err, creature) => {
    if (err) {
      console.log(`save error: ${err}`);
    }
    console.log(`saved new creature: ${creature.name}`);
    res.json(creature);
  });
});

// delete one
app.delete('/api/creatures/:id', (req, res) => {
});

// update one
app.put('/api/creatures/:id', (req, res) => {
});

// This is where we serve our API!
app.listen(process.env.PORT || 5000, () => {
    console.log('Your First API is running on http://localhost:5000/');
});
