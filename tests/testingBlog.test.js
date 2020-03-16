const totalLikes = require("../utils/list_helper").totalLikes;
const popularBlog = require("../utils/list_helper").getBlogWithMostLikes;
const popularAuthor = require("../utils/list_helper")
  .getAuthorWithMostNumberOfBlogs;

describe("Total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ];

  test("Testing the total number of likes: ", () => {
    const likes = totalLikes(listWithOneBlog);
    expect(likes).toBe(5);
  });
});

const listOfBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422a093b54a679834d17f8",
    title: "Whats up whats up rowdy boys and girls",
    author: "Vijay Deverakonda",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "092109103b54a6023902398",
    title: "Rowdy is loved, rowdy is hated but rowdy is never ignored",
    author: "RDP",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 10,
    __v: 0
  },
  {
    _id: "092109103b54a679834d17f8",
    title: "Comrade deverakonda",
    author: "Vijay Deverakonda",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 10,
    __v: 0
  }
];

describe("Object with most likes", () => {
  test("Object with most number of likes: ", () => {
    const popBlog = popularBlog(listOfBlogs);
    expect(popBlog).toEqual({
      _id: "092109103b54a6023902398",
      title: "Rowdy is loved, rowdy is hated but rowdy is never ignored",
      author: "RDP",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0
    });
  });
});

describe("Author with most publishes", () => {
  test("Author with most number of published posts: ", () => {
    const popAuthor = popularAuthor(listOfBlogs);
    console.log(popAuthor);
    expect(popAuthor).toEqual({
      author: "Vijay Deverakonda",
      count: 2
    });
  });
});
