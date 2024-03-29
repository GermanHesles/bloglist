const ERROR_HANDLERS = {
  CastError: res =>
    res.status(400).send({ error: 'id is malformed' }),

  ValidationError: (res, { message }) =>
    res.status(400).send({ error: message }),

  JsonWebTokenError: (res, error) =>
    res.status(401).send({ error: 'token missing or invalid' }),

  TokenExpireError: res =>
    res.status(401).json({ error: 'token expired' }),

  defaultError: res => res.status(500).end()
}

module.exports = (error, request, response, next) => {
  console.error(error.name)

  const handler =
    ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(response, error)
}
