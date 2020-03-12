const blogRouter = require("express").Router();
const Blog = require("../models/Blog");

blogRouter.get("/info", (req, res) => {
  Blog.collection.count({}, function(error, numOfDocs) {
    if (error) {
      return res.status(404).json({
        error: "no records found"
      });
    }
    var htmlResponse = "<p> Notes has info for " + numOfDocs + " entries </p>";
    res.send(htmlResponse);
  });
});

blogRouter.get("/", (req, res) => {
  Blog.find({}).then(phoneList => {
    let notes = phoneList.map(phone => phone.toJSON());
    res.json(notes);
  });
});

blogRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(selectedEntry => {
      if (selectedEntry) res.json(selectedEntry.toJSON());
      else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

blogRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

blogRouter.post("/", (req, res, next) => {
  const note = req.body;
  console.log("notes: " + note);

  const phoneEntry = new Blog({
    title: note.title,
    author: note.author,
    url: note.url,
    likes: note.likes
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

blogRouter.put("/:id", (req, res, next) => {
  const note = req.body;
  Blog.updateOne(
    { title: note.title },
    {
      $set: { author: note.author, url: note.url, likes: notes.likes },
      $currentDate: { lastModified: true }
    }
  )
    .then(savedEntry => {
      res.status(200).end();
    })
    .catch(error => next(error));
});

module.exports = blogRouter;
