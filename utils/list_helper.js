const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const getTotalLikes = (total, blog) => {
    return total + blog.likes;
  };
  return blogs.reduce(getTotalLikes, null);
};

module.exports = {
  dummy: dummy,
  totalLikes: totalLikes
};
