const fs = require("fs")
const express = require("express")
const app = express()
const port = 25565

// Set location for static content
app.use('/public', express.static(__dirname + '/public'))

// Set the root directory to display "Hello, world!"
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/results', (req, res) => {
  res.sendFile(__dirname + '/public/results.html')
})

// Load all API endpoints dynamically
fs.readdir(__dirname + '/api/routes/', (err, files) => {
  files.forEach(file => {
    // Load that js file
    const { route, on } = require("./api/routes/" + file)
    app.get(route, (req, res) => on(req, res))
  })
})

// Start the web server on port {port}
// Start the program with command "npm start" in terminal
// Head to "localhost:{port}" in a web browser to see
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})