const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./apiTester");

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });
});

test("new user created", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "Dheeraj1994",
    name: "Dheeraj",
    password: "Periyavame1994!"
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

  const usernames = usersAtEnd.map(user => user.username);
  expect(usernames).toContain(newUser.username);
});

describe("When there is initially one user at db", () => {
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: "root",
      name: "superUser",
      password: "dhiheijak"
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});
