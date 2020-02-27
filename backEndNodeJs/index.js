const express = require("express");
const app = express();
const PORT = 3001;
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
];

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

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
