const express = require("express")
const app = express()
const port = 25565

// TODO(Matt): Set location for static content

// Set the root directory to display "Hello, world!"
app.get('/', (req, res) => {
  res.send("Hello, world!")
})

// Start the web server on port {port}
// Start the program with command "npm start" in terminal
// Head to "localhost:{port}" in a web browser to see
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})