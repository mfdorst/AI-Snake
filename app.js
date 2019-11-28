require('dotenv').config()
const express = require('express')
const app = express()

const PORT = process.env.PORT || 1001

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
