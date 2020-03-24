const User = require("../models/user");

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const getTotalLikes = (total, blog) => {
    return total + blog.likes;
  };
  return blogs.reduce(getTotalLikes, null);
};

const getBlogWithMostLikes = blogs => {
  const maxLikes = Math.max.apply(Math, blogs.map(blog => blog.likes));
  console.log("Max likes is: ");
  console.log(maxLikes);
  return blogs.find(blog => blog.likes === maxLikes);
};

const getAuthorWithMostLikes = blogs => {
  const blog = getBlogWithMostLikes(blogs);
  return {
    author: blog.author,
    likes: blog.likes
  };
};

const getAuthorWithMostNumberOfBlogs = blogs => {
  let group = blogs.reduce((total, curr) => {
    total[curr.author] =
      curr.author in total == true ? total[curr.author] + 1 : 1;
    return total;
  }, {});
  const arrGroup = Object.values(group);
  const arrEntries = Object.keys(group);
  maxCount = Math.max.apply(Math, arrGroup);
  finalResult = {};
  arrEntries.forEach((item, index) => {
    if (group[item] == maxCount) {
      finalResult = {
        author: item,
        count: maxCount
      };
    }
  });
  return finalResult;
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  dummy: dummy,
  totalLikes: totalLikes,
  getBlogWithMostLikes: getBlogWithMostLikes,
  getAuthorWithMostLikes: getAuthorWithMostLikes,
  getAuthorWithMostNumberOfBlogs: getAuthorWithMostNumberOfBlogs,
  usersInDB
};
