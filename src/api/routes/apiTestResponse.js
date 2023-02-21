module.exports = {
  route: '/api/test',
  async on(req, res) {
    res.send({ message: 'API is running!' })
  }
}