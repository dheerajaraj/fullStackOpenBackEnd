const blogmodel = require("../models/Blog");
const listOfTestBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Whats up whats up rowdy boys and girls",
    author: "Vijay Deverakonda",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Rowdy is loved, rowdy is hated but rowdy is never ignored",
    author: "RDP",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 10
  },
  {
    title: "Black panther",
    author: "Chadwik boseman",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 11
  }
];
const getAllBlogsInDB = async () => {
  const blogs = await blogmodel.find({});
  let blogsFinal = blogs.map(phone => phone.toJSON());
  return blogsFinal;
};

const nonExistingId = async () => {
  const blog = new blogmodel({ content: "willremovethissoon" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

module.exports = { listOfTestBlogs, getAllBlogsInDB, nonExistingId };
