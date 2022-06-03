const mongoose = require('mongoose')

const { server } = require('../index')
const Blog = require('../models/Blog')
const { api, initialBlogs, getAllBlogs } = require('./blog_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('GET endpoints', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const { response } = await getAllBlogs()
    expect(response.body).toHaveLength(2)
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const { body } = await api.get('/api/blogs')
    const id = body[0].id
    expect(id).toBeDefined()
  })
})

describe('POST endpoints', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Apocalipse now',
      author: 'Francis Ford Coppola',
      url: 'String',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { response } = await getAllBlogs()

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

  test('verifies that if the title and url properties are missing from the request data', async () => {
    const newBlog = {
      author: 'Martin Scorsese',
      likes: Number
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const { response } = await getAllBlogs()

    expect(response.body).toHaveLength(2)
  })
})

describe('DELETE endpoints', () => {
  test('a blog can be deleted', async () => {
    const { response: firstResponse } = await getAllBlogs()
    const { body: blogs } = firstResponse
    const blogToDelete = blogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(200)

    const { authors, response: secondResponse } = await getAllBlogs()

    expect(secondResponse.body).toHaveLength(1)
    expect(authors).not.toContain(blogToDelete.author)
  })
})

describe('PUT endpoints', () => {
  test('a blog can be update', async () => {
    const { response: allBlogsResponse } = await getAllBlogs()
    const { body: blogs } = allBlogsResponse
    const blogToUpdate = blogs[0]

    const newDataBlog = {
      title: 'Nosferatu',
      author: 'Murnau',
      url: 'String',
      likes: 13
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newDataBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(updatedBlog.body.likes).toStrictEqual(13)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
