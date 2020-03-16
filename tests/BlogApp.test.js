const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const blogmodel = require("../models/Blog");
const helper = require("./apiTester");

beforeEach(async () => {
  await blogmodel.deleteMany({});
  const blogObjs = helper.listOfTestBlogs.map(blog => new blogmodel(blog));
  const promiseArray = blogObjs.map(blog => blog.save());
  //need to wait for all the promises to finish executing as these promises
  // are supposed to be handled before the start of each test case
  await Promise.all(promiseArray);
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are four notes", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(helper.listOfTestBlogs.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/blogs");

  const title = response.body.map(r => r.title);

  expect(title).toContain(
    "Rowdy is loved, rowdy is hated but rowdy is never ignored"
  );
});

test("a valid note can be added ", async () => {
  const newNote = {
    title: "dheeraj",
    author: "r dheeraj pasupuleti",
    url: "www.google.com",
    likes: 5
  };

  await api
    .post("/api/blogs")
    .send(newNote)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsTotal = await helper.getAllBlogsInDB();
  expect(blogsTotal.length).toBe(helper.listOfTestBlogs.length + 1);

  const title = blogsTotal.map(n => n.title);

  expect(title).toContain(
    "Rowdy is loved, rowdy is hated but rowdy is never ignored"
  );
});

test("note without content is not added", async () => {
  const newNote = {
    likes: 11
  };

  await api
    .post("/api/blogs")
    .send(newNote)
    .expect(400);

  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(helper.listOfTestBlogs.length);
});

test("a specific blog entry can be viewed", async () => {
  const blogList = await helper.getAllBlogsInDB();
  const blog = blogList[0];

  const resultBlog = await api
    .get(`/api/blogs/${blog.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(resultBlog.body).toEqual(blog);
});

test("delete a blog entry", async () => {
  const blogList = await helper.getAllBlogsInDB();
  const blog = blogList[0];

  await api.delete(`/api/blogs/${blog.id}`).expect(204);

  const blogAfterDeletion = await helper.getAllBlogsInDB();

  expect(blogAfterDeletion.length).toBe(helper.listOfTestBlogs.length - 1);

  const title = blogAfterDeletion.map(r => r.title);

  expect(title).not.toContain(blog.title);
});

afterAll(() => {
  mongoose.connection.close();
});
