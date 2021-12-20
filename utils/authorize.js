const authorize = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  return next();
};

module.exports = authorize;
