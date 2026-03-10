const Note = require('../models/noteModel');

// Get all notes
exports.getAllNotes = (req, res) => {

  Note.getAll((err, rows) => {

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);

  });

};


// Create note
exports.createNote = (req, res) => {

  const { title, content } = req.body;

  const image = req.file ? req.file.filename : null;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  Note.create({ title, content, image }, (err, note) => {

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json(note);

  });

};


// Update note
exports.updateNote = (req, res) => {

  const id = req.params.id;

  const { title, content } = req.body;

  const image = req.file ? req.file.filename : req.body.image || null;

  Note.update(id, { title, content, image }, (err, note) => {

    if (err) {

      if (err.message === "Note not found") {
        return res.status(404).json({ error: err.message });
      }

      return res.status(500).json({ error: err.message });

    }

    res.json(note);

  });

};


// Delete note
exports.deleteNote = (req, res) => {

  const id = req.params.id;

  Note.delete(id, (err) => {

    if (err) {

      if (err.message === "Note not found") {
        return res.status(404).json({ error: err.message });
      }

      return res.status(500).json({ error: err.message });

    }

    res.json({ message: "Note deleted" });

  });

};