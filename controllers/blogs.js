const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/User')

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

blogsRouter.post('/', async (request, response, next) => {
  const { body, blog } = request
  const { userId } = body

  const user = await User.findById(userId)

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  if (!blog.author || !blog.url) {
    return response.status(400).json({
      error: 'requeride "content" fied is missing'
    })
  }

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    userId: user._id
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

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  await Blog.findByIdAndDelete(id)
  response.status(200).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
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
