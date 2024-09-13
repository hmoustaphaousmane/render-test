require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('./utils/logger')

// const uri = process.env.MONGODB_URI
const testUri = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)

// mongoose.connect(uri)
mongoose.connect(testUri)
  .then(result => logger.info('connected to MongoDB'))
  .catch(error =>
    logger.error('error connecting to MongoDB', error.message))

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note1 = new Note({
  content: 'HTML is easy',
  important: true,
})

// save a note1
note1.save().then(result => {
  console.log('note1 saved!')
})

const note2 = new Note({
  content: 'GET and POST are the most important methods of HTTP protocol',
  important: true,
})

// save a note2
note2.save().then(result => {
  console.log('note2 saved!')
  mongoose.connection.close()
})

// get all notes using find method of the model Note
// Note.find({ important: true }).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })
