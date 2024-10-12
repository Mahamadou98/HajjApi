const mongoose = require('mongoose');

const AgenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Agence doit avoir un nom'],
    unique: true,
  },
  imgCover: {
    type: String,
    require: [true, 'Agence doit avoir une image associe'],
  },
  content: {
    type: String,
    required: [true, 'Agence doit avoir une description'],
  },
  phone: {
    type: String,
    required: [true, 'Agence doit avoir un numero'],
  },
  address: {
    type: String,
    require: [true, 'Agence doit avoir une localite'],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Agence = mongoose.model('Agence', AgenceSchema);

module.exports = Agence;
