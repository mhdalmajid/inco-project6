const logOut = (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are logged out')
  res.redirect('/login')
}

module.exports = logOut
