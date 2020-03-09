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
  PhoneBook.collection.count({}, function(error, numOfDocs) {
    if (error) {
      return res.status(404).json({
        error: "no records found"
      });
    }
    var htmlResponse = "<p> Notes has info for " + numOfDocs + " entries </p>";
    res.send(htmlResponse);
  });
});

app.get("/api/notes", (req, res) => {
  PhoneBook.find({}).then(phoneList => {
    notes = phoneList.map(phone => phone.toJSON());
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res, next) => {
  const id = req.params.id;
  PhoneBook.findById(id)
    .then(selectedEntry => {
      if (selectedEntry) res.json(selectedEntry.toJSON());
      else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete("/api/notes/:id", (req, res, next) => {
  const id = req.params.id;
  PhoneBook.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
  //notes = notes.filter(note => note.id !== id);
});

app.post("/api/notes", (req, res, next) => {
  const note = req.body;
  console.log("notes: " + note);

  if (!note.name) {
    return res.status(400).json({
      error: "name missing"
    });
  }
  PhoneBook.find({});
  const nameExists = notes.find(entry => entry.name === note.name);
  if (nameExists) {
    next(
      res.status(400).json({
        error: "name exists, name must be unique"
      })
    );
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

app.put("/api/notes/:id", (req, res, next) => {
  const note = req.body;
  PhoneBook.updateOne(
    { name: note.name },
    { $set: { number: note.number }, $currentDate: { lastModified: true } }
  )
    .then(savedEntry => {
      res.status(200).end();
    })
    .catch(error => next(error));
});

//This error handler needs to be declared at the end! If not it will
// not work as it will route to different react routers.
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
