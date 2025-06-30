const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
  },
  body: {
    type: String,
    required: [true, 'El cuerpo es obligatorio'],
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);


