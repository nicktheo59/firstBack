// set up mongoose
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let CreatureSchema = new Schema({
  // list model properties
  name: String,
  type: String,
  habitat: String,
  numLegs: Number,
  isDangerous: Boolean,
  imageUrl: String
});

let Creature = mongoose.model('Creature', CreatureSchema);

module.exports = Creature;
