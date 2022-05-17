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

module.exports = {
  initialBlogs,
  api
}
