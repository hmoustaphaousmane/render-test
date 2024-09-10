const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static('dist'))

app.use(express.json())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  },
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Boddy:', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  return response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const generatedId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => Number(n.id)))
  : 0

  return String(maxId + 1)
}

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return request.status(400).json({ error: 'content missing' })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generatedId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const unknownEndpont = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpont)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
