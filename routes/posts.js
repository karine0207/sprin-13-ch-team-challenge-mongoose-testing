const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Crear publicación
router.post('/create', async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: 'Título y cuerpo son obligatorios' });
    }
    const newPost = new Post({ title, body });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las publicaciones
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar publicación por ID
router.get('/id/:_id', async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar publicación por título
router.get('/title/:title', async (req, res) => {
  try {
    const posts = await Post.find({ title: req.params.title });
    if (posts.length === 0) return res.status(404).json({ error: 'No se encontraron publicaciones con ese título' });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar publicación por ID
router.put('/id/:_id', async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: 'Título y cuerpo son obligatorios' });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params._id,
      { title, body },
      { new: true, runValidators: true }
    );
    if (!updatedPost) return res.status(404).json({ error: 'Publicación no encontrada' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar publicación por ID
router.delete('/id/:_id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params._id);
    if (!deletedPost) return res.status(404).json({ error: 'Publicación no encontrada' });
    res.json({ message: 'Publicación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Paginación (10 posts por página)
router.get('/postsWithPagination', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


