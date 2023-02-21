module.exports = {
  route: '/api/calc/:a/:b',
  async on(req, res) {
    const a = parseInt(req.params.a)
    const b = parseInt(req.params.b)

    if (isNaN(a) || isNaN(b))
      return res.send({ message: 'Unable to parse a or b.' })

    res.send({ message: 'Done', value: a + b })
  }
}