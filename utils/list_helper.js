const _ = require('lodash')
const { all } = require("express/lib/application")


const dummy = (blog) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const sumLikes = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return sumLikes
}

const favoriteBlog = (blogs) => {
/*   const allLikes = blogs.map((blog) => {
    return blog.likes
  })

  const maxLikes = Math.max(...allLikes)

  const position = allLikes.indexOf(maxLikes)

  return blogs[position] */

  return _.maxBy(blogs, (blog) => {
    return blog.likes
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}