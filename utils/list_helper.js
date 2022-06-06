const _ = require('lodash')
// const { all } = require('express/lib/application')

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
  return _.maxBy(blogs, (blog) => {
    return blog.likes
  })
}

const mostBlogs = (blogs) => {
  const countByAuthors = _.countBy(blogs, (blog) => {
    return blog.author
  })

  const newList = _.map(countByAuthors, (blogs, author) => {
    return {
      author: author,
      blogs: blogs
    }
  })

  const maxAuthor = _.maxBy(newList, (authorWithBlogsCount) => {
    return authorWithBlogsCount.blogs
  })

  return maxAuthor
}

const mostLikes = (blogs) => {
  const authorLikes = _.reduce(blogs, (result, blog) => {
    const sumLikes = (result[blog.author] !== undefined) ? result[blog.author] : 0
    result[blog.author] = blog.likes + sumLikes

    return result
  }, {})

  const formattedAuthorLikes = _.map(authorLikes, (likes, author) => {
    return {
      author: author,
      likes: likes
    }
  })

  const mostLikedAuthor = _.maxBy(formattedAuthorLikes, (likesByAuthor) => {
    return likesByAuthor.likes
  })

  return mostLikedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
