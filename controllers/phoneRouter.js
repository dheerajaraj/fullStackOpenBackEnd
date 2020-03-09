const phoneRouter = require("express").Router();
const PhoneBook = require("../models/PhoneBook");

phoneRouter.get("/info", (req, res) => {
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

phoneRouter.get("/", (req, res) => {
  PhoneBook.find({}).then(phoneList => {
    let notes = phoneList.map(phone => phone.toJSON());
    res.json(notes);
  });
});

phoneRouter.get("/:id", (req, res, next) => {
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

phoneRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  PhoneBook.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

phoneRouter.post("/", (req, res, next) => {
  const note = req.body;
  console.log("notes: " + note);

  const phoneEntry = new PhoneBook({
    name: note.name,
    number: note.number
  });
  phoneEntry
    .save()
    .then(savedEntry => {
      return savedEntry.toJSON();
    })
    .then(formattedNote => {
      res.json(formattedNote);
    })
    .catch(error => next(error));
});

phoneRouter.put("/:id", (req, res, next) => {
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

module.exports = phoneRouter;
