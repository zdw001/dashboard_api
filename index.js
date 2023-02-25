const express = require('express')
const Gun = require('gun')

const app = express()
const port = 8000
app.use(Gun.serve)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const server = app.listen(port, () => {
    console.log("Listening at: http://localhost://" + port)
})

Gun({ web: server })