const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/User')
const userExtractor = require('../middleware/userExtractor')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  const blog = await Blog.findById(id)

  response.json(blog)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const { likes, author, url, title } = request.body

  const { userId } = request

  const user = await User.findById(userId)

  if (likes === undefined) {
    return { likes: 0 }
  }

  if (!author || !url) {
    return response.status(400).json({
      error: 'requeride "content" fied is missing'
    })
  }

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  try {
    const savedBlog = await newBlog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { id } = request.params

  await Blog.findByIdAndDelete(id)
  response.status(200).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const blog = request.body

  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }

  const updateBlog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })

  response.json(updateBlog).end()
})

module.exports = blogsRouter
