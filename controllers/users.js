const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 0
  })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { body } = request
  const { username, name, password } = body

  if (!username || !password) {
    return response.status(400).json({
      error: 'requeride "content" fied is missing'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  try {
    const savedUser = await newUser.save()

    response.status(201).json(savedUser)
  } catch (error) {
    response.status(400).json(error)
  }
})

module.exports = usersRouter
