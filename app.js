require('dotenv').config()
require('./mongo')
const cors = require('cors')
const express = require('express')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)
app.use(notFound)

module.exports = { app }
