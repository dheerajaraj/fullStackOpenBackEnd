const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");
const User = require("../models/User");

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
  const phoneList = await Blog.find({}).populate("user");
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
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res
      .status(401)
      .json({ error: "token missing or token with invalid token id" });
  }
  const user = await User.findById(note.userId);
  const newEntry = new Blog({
    title: note.title,
    author: note.author,
    url: note.url,
    likes: note.likes,
    user: user._id
  });
  try {
    const savedEntry = await newEntry.save();

    user.blogs = user.blogs.concat(savedEntry._id);
    await user.save();
    return res.json(savedEntry.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put("/:id", async (req, res, next) => {
  const note = req.body;
  try {
    savedEntry = await Blog.updateOne(
      { title: note.title },
      {
        $set: { author: note.author, url: note.url, likes: note.likes },
        $currentDate: { lastModified: true }
      }
    );
    res.status(200).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
