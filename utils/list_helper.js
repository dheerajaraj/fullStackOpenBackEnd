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

module.exports = {
  dummy: dummy,
  totalLikes: totalLikes,
  getBlogWithMostLikes: getBlogWithMostLikes
};
