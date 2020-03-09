const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
var morgan = require("morgan");

let notes = [];

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));
app.use(
  morgan(function(tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body)
    ].join(" ");
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  var dateNow = new Date();
  var htmlResponse =
    "<p> Notes has info for " + notes.length + " entries </p>" + dateNow;
  res.send(htmlResponse);
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const selectedNote = notes.find(note => note.id === id);
  if (selectedNote) {
    res.json(selectedNote);
  } else {
    res.status(404).send("Selected note not found!");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
