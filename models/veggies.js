const mongoose = require('mongoose');

const veggies = [
    {
      name: "spinach",
      color: "green",
      readyToEat: true,
    },
    {
      name: "onion",
      color: "yellow",
      readyToEat: true,
    },
    {
      name: "eggplant",
      color: "purple",
      readyToEat: false,
    }
  ];

  const vegSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});
const Veggie = mongoose.model('Veggie', vegSchema);
module.exports = Veggie, veggies;