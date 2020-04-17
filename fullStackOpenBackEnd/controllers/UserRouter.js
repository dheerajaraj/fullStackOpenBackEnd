const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  if (body.password.length < 3) {
    response.status(400).json({ error: "Password length must be at least 3" });
  } else if (body.username.length < 3) {
    response.status(400).json({ error: "username length must be at least 3" });
  } else {
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
  }
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs");
  res.json(users.map(u => u.toJSON()));
});

module.exports = usersRouter;
