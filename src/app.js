const { text } = require("express");
const express = require("express");
const app = express();
const jsonParser = express.json();
const notes = require("./data/notes-data");
app.get("/notes/:noteId", (req, res, next) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (!foundNote) {
    return next({ message: `Note id not found: ${noteId}` });
  }
  res.status(200).json({ data: foundNote });
});
app.get("/notes", (req, res) => {
  res.status(200).json({ data: notes });
});
// TODO: Add ability to create a new note
app.post("/notes", jsonParser, (req, res, next) => {
  const { data: { text } = {} } = req.body;
  if (!text || text.length === 0) {
    return next({ message: "please provide text for the note" });
  } else {
    const newNote = {
      id: notes.length + 1,
      text,
    };
    notes.push(newNote);
    res.status(201).json({ data: newNote });
  }
});
// TODO: add not found handler
app.use((req, res, next) => {
  res.status(400).send(`Not found: ${req.originalUrl}`);
});
// TODO: Add error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});
module.exports = app;
