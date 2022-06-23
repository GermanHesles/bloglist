const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { app } = require('../app')
const supertest = require('supertest')
const User = require('../models/User')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Nosferatu',
    author: 'Murnau',
    url: 'String',
    likes: 2,
    id: '62363c2cf0704bd39d54fc2c',
    userId: '56cb91bdc3464f14678934ca'
  },
  {
    title: 'El Séptimo Sello',
    author: 'Ingmar Bergman',
    url: 'String',
    likes: 3,
    id: '62363f33f0704bd39d54fc32',
    userId: '56cb91bdc3464f14678934ca'
  }
]

const initializeDb = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('pswd', 10)
  const user = new User({
    username: 'root',
    passwordHash,
    _id: new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca')
  })

  await user.save()

  await Blog.deleteMany({})

  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
}

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
  getUsers,
  initializeDb
}
