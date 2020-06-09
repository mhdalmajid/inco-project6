const index = async (req, res) => {
  res.render('index', { user: req.user })
}

module.exports = index
