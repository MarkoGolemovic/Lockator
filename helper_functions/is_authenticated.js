function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  } else {
    return res.redirect("/notallowed");
  }
}

module.exports.isAuthenticated = isAuthenticated;
