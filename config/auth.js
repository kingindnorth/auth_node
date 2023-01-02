const ensureAuthenticated = (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error', 'Please log in to view that resource');
      res.redirect('/login');
    }

const ensureLogin = (req, res, next) => {
  if(!req.isAuthenticated()){
    return next()
  }
  res.redirect("/dashboard")
}    

module.exports = {
  ensureAuthenticated,
  ensureLogin
}