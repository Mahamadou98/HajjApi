const mongoose = require('mongoose');

const PostSchemas = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'le titre est requis'],
  },
  content: {
    type: String,
    required: [true, 'le contenu est requis'],
  },
  image: {
    type: String,
    required: [true, 'veuillez selectionner une image'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model('Post', PostSchemas);

module.exports = Post;
