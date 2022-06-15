const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = model('Blog', blogSchema)

module.exports = Blog
