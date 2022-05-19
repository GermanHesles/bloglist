require('dotenv').config()
require('./mongo')

const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/Blog')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

app.post('/api/blogs', async (request, response) => {
  const blog = (request.body)

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: new URL(),
    likes: blog.likes
  })

  const savedBlog = await newBlog.save()
  response.json(savedBlog)
})

const PORT = process.env.PORT || 3003
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
