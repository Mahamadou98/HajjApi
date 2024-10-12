const mongoose = require('mongoose');

const CoursSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Veuillez saisie un subject'],
  },
  title: {
    type: String,
    required: [true, 'Veuillez saisir un titre'],
  },
  content: {
    type: String,
    required: [true, 'Veuillez saisir le contenu'],
  },
  url: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Cours = mongoose.model('Cours', CoursSchema);

module.exports = Cours;
