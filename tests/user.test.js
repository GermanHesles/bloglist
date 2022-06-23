const mongoose = require('mongoose')
const { api, getUsers, initializeDb } = require('./helpers')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await initializeDb()
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('creation succeeds with a fresh username', async () => {
    const newUser = {
      username: 'midudev',
      name: 'Miguel',
      password: 'twitch'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(2)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain('midudev')
  })

  test('creation falls with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'root',
      name: 'Miguel',
      password: 'echoplex'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.errors.username.message).toContain('`username` to be unique')

    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
