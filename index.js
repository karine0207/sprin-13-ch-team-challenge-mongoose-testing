const express = require('express');
const connectDB = require('./config/config');
const postRoutes = require('./routes/posts');
require('dotenv').config();


const app = express();
app.use(express.json());

connectDB();

app.use('/', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app; 
