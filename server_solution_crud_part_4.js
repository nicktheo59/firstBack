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
  let creatureId = req.params.id;
  db.Creature.findOneAndRemove({
    _id: creatureId
  })
  .populate('creature')
  .exec((err, deletedCreature) => {
    res.json(deletedCreature);
  });
});

// update one
app.put('/api/creatures/:id', (req, res) => {
  let creatureId = req.params.id;
  db.Creature.findOne({
    _id: creatureId
  }, (err, foundCreature) => {
    if (err) {
      console.log('cound not find the creature.')
    }
    foundCreature.name = req.body.name || foundCreature.name;
    foundCreature.type = req.body.type || foundCreature.type;
    foundCreature.habitat = req.body.habitat || foundCreature.habitat;
    foundCreature.numLegs = req.body.numLegs || foundCreature.numLegs;
    foundCreature.isDangerous = req.body.isDangerous || foundCreature.isDangerous;
    foundCreature.imageUrl = req.body.imageUrl || foundCreature.imageUrl;
    console.log(`updating: ${foundCreature.name}`);
    //save it
    foundCreature.save((err, creature) => {
      if (err) {
        console.log(`update error: ${err}`);
      }
      console.log(`updated: ${creature.name}`);
      res.json(creature);
    });
  });
});

// This is where we serve our API!
app.listen(process.env.PORT || 5000, () => {
    console.log('Your First API is running on http://localhost:5000/');
});
