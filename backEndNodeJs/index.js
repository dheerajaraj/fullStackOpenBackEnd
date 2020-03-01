const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3001;
let notes = [
  {
    id: 1,
    name: "Mummy",
    number: "97959402"
  }
];
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  var dateNow = new Date();
  var htmlResponse =
    "<p> Notes has info for " + notes.length + " entries </p>" + dateNow;
  res.send(htmlResponse);
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const selectedNote = notes.find(note => note.id === id);
  if (selectedNote) {
    res.json(selectedNote);
  } else {
    res.status(404).send("Selected note not found!");
  }
});

app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).end();
});

app.post("/notes", (req, res) => {
  const note = req.body;
  console.log("notes: " + note);

  if (!note.name) {
    return res.status(400).json({
      error: "name missing"
    });
  }
  const nameExists = notes.find(entry => entry.name === note.name);
  if (nameExists) {
    return res.status(400).json({
      error: "name exists, name must be unique"
    });
  }

  if (!note.number) {
    return res.status(400).json({
      error: "number missing"
    });
  }

  const idGen = Math.floor(Math.random() * 1000000);
  note.id = idGen;
  notes = notes.concat(note);
  res.json(note);
});

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
