const mongoose = require('mongoose')
const { server } = require('../index')
const Blog = require('../models/Blog')
const { api, initialBlogs, getAllblogs, getBlogById } = require('./blog_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const { body } = await api.get('/api/blogs')
  const id = body[0].id
  expect(id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'String',
    author: 'String',
    url: 'String',
    likes: Number
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { response } = await getAllblogs()

  expect(response.body).toHaveLength(3)
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'Dr Strange',
    author: 'Stanley Kubrick',
    url: 'String'
  }

  const { body } = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(body.likes).toStrictEqual(0)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
