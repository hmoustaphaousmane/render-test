const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

// reset database endpoint
router.post('/reset', async (request, response) => {
  console.log('emptying database')
  await Note.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
