const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notesController");
const upload = require("../middleware/upload");

// GET all notes
router.get("/", notesController.getAllNotes);

// CREATE note
router.post("/", upload.single("image"), notesController.createNote);

// UPDATE note
router.put("/:id", upload.single("image"), notesController.updateNote);

// DELETE note
router.delete("/:id", notesController.deleteNote);

module.exports = router;