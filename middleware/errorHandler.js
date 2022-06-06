module.exports = (error, request, response, next) => {
  console.error(error)

  if (error.username === 'CastError') {
    response.status(400).send({ error: 'id is malformed' })
    return
  }

  if (error.username === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  response.status(500).end()
}
