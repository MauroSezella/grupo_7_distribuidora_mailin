const User = require('../data/userService')
const productService = require('../data/productService')

function userLoggedMiddleware(req, res, next) {
  res.locals.categorias = productService.getCategorias(); //categorias en header

  res.locals.isLogged = false;
  res.locals.isAdmin = false

  let emailInCookie = req.cookies.userEmail
  let userFromCookie = User.findByField('email', emailInCookie)

  if (userFromCookie) {
    req.session.userLogged = userFromCookie
    if (userFromCookie.rol === 'admin') {
      res.locals.isAdmin = true;
    }
  }

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged
  }

  next()
}


module.exports = userLoggedMiddleware;

