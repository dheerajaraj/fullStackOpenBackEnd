const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
var morgan = require("morgan");

let notes = [];
const PhoneBook = require("./ModelConfig");

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
  PhoneBook.find({}).then(phoneList => {
    res.json(phoneList.map(phone => phone.toJSON()));
  });
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  PhoneBook.findById(id)
    .then(selectedEntry => {
      if (selectedEntry) res.json(selectedEntry.toJSON());
      else {
        response.status(404).end();
      }
    })
    .catch(error => {
      response.status(400).send({ error: "malformatted id" });
    });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  PhoneBook.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(400).end();
    });
  //notes = notes.filter(note => note.id !== id);
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

  const phoneEntry = new PhoneBook({
    name: note.name,
    number: note.number
  });
  phoneEntry.save().then(savedEntry => {
    res.json(savedEntry.toJSON());
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
