const db = require('../db/database');

const Note = {

  // Get all notes, newest first
  getAll(callback) {
    db.all(
      "SELECT * FROM notes ORDER BY datetime(created_at) DESC",
      [],
      callback
    );
  },

  // Get one note by ID
  getById(id, callback) {
    db.get(
      "SELECT * FROM notes WHERE id = ?",
      [id],
      callback
    );
  },

  // Create a new note
  create(data, callback) {
    const { title, content, image } = data;
    const created_at = new Date().toISOString();

    db.run(
      "INSERT INTO notes (title, content, image, created_at) VALUES (?, ?, ?, ?)",
      [title, content, image || null, created_at],
      function(err) {
        if (err) return callback(err);

        callback(null, {
          id: this.lastID,
          title,
          content,
          image: image || null,
          created_at
        });
      }
    );
  },

  // Update an existing note
  update(id, data, callback) {
    const { title, content, image } = data;

    db.run(
      "UPDATE notes SET title = ?, content = ?, image = ? WHERE id = ?",
      [title, content, image || null, id],
      function(err) {
        if (err) return callback(err);

        if (this.changes === 0) {
          return callback(new Error("Note not found"));
        }

        // Fetch updated note and return it
        db.get(
          "SELECT * FROM notes WHERE id = ?",
          [id],
          callback
        );
      }
    );
  },

  // Delete a note
  delete(id, callback) {
    db.run(
      "DELETE FROM notes WHERE id = ?",
      [id],
      function(err) {
        if (err) return callback(err);

        if (this.changes === 0) {
          return callback(new Error("Note not found"));
        }

        callback(null);
      }
    );
  }

};

module.exports = Note;