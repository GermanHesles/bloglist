const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  name: String,
  passwordHash: {
    type: String,
    minlength: 3
  },
  blogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User
