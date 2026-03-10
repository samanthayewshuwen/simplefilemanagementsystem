const express = require('express');
const cors = require('cors');
const path = require('path');

const notesRoutes = require('./routes/notesRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/notes', notesRoutes);

module.exports = app;