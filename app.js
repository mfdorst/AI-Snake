const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static('client'))

app.get('/send-data', (req, res) => {
  res.send('Success!')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
