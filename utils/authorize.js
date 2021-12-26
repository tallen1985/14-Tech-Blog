const authorize = (req, res, next) => {
  //check to make sure user has session cookie for log in
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  return next();
};

module.exports = authorize;
