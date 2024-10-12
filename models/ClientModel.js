const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Veuillez entrer votre nom'],
  },
  lastName: {
    type: String,
    required: [true, 'Veuillez entrer votre prenom'],
  },
  phone: {
    type: String,
    required: [true, 'Veuillez entrer votre numero'],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
