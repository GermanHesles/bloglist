const { app } = require('../index')
const supertest = require('supertest')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'String',
    author: 'String',
    url: 'String',
    likes: 2,
    id: '62363c2cf0704bd39d54fc2c'
  },
  {
    title: 'String',
    author: 'String',
    url: 'String',
    likes: 2,
    id: '62363f33f0704bd39d54fc32'
  }
]

const getAllblogs = async () => {
  const response = await api.get('/api/blogs')
  return {
    authors: response.body.map(blog => blog.author),
    response
  }
}

const getBlogById = async (id) => {
  const response = await api.get(`/api/blogs/${id}`)
  return response.body
}

module.exports = {
  initialBlogs,
  api,
  getAllblogs,
  getBlogById
}
