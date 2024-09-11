const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const uri =
  `mongodb+srv://undjonline:${password}@fs-notes-cluster.360dr.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fs-notes-cluster`

mongoose.set('strictQuery', false)

mongoose.connect(uri)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'GET and POST are the most important methods of HTTP protocol',
  important: true,
})

// save a note
// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// get all notes using find method of the model Note
Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
