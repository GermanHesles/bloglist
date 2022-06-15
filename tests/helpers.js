const { app } = require('../index')
const supertest = require('supertest')
const User = require('../models/User')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Nosferatu',
    author: 'Murnau',
    url: 'String',
    likes: 2,
    id: '62363c2cf0704bd39d54fc2c'
  },
  {
    title: 'El Séptimo Sello',
    author: 'Ingmar Bergman',
    url: 'String',
    likes: 3,
    id: '62363f33f0704bd39d54fc32'
  }
]

const getAllBlogs = async () => {
  const response = await api.get('/api/blogs')
  return {
    authors: response.body.map(blog => blog.author),
    likes: response.body.map(blog => blog.likes),
    response
  }
}

const getBlogById = async (id) => {
  console.log(id)
  const response = await api.get(`/api/blogs/${id}`)
  console.log(response.body)

  return response.body
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  api,
  getAllBlogs,
  getBlogById,
  getUsers
}
