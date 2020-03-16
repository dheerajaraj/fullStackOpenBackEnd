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

blogRouter.get("/", async (req, res) => {
  const phoneList = await Blog.find({});
  let notes = phoneList.map(phone => phone.toJSON());
  res.json(notes);
});

blogRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    selectedEntry = await Blog.findById(id);
    res.json(selectedEntry.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    result = await Blog.findByIdAndDelete(id);
    res.status(204).end();
  } catch (exp) {
    next(exp);
  }
});

blogRouter.post("/", async (req, res, next) => {
  const note = req.body;

  const phoneEntry = new Blog({
    title: note.title,
    author: note.author,
    url: note.url,
    likes: note.likes
  });

  try {
    savedEntry = await phoneEntry.save();
    return res.json(savedEntry.toJSON());
  } catch (exception) {
    next(exception);
  }
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
