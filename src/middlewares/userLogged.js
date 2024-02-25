const productService = require('../data/productService')//MODIFICARR

const userService = require('../model/services/userService');

async function userLoggedMiddleware(req, res, next) {
  res.locals.categorias = productService.getCategorias(); //MODIFICARR categorias en header

  res.locals.isLogged = false;
  res.locals.isAdmin = false

  let emailInCookie = req.cookies.userEmail

  if (emailInCookie) {
    try {
      let userFromCookie = await userService.getByEmail(emailInCookie);
      if (userFromCookie) {
        req.session.userLogged = userFromCookie;
      }
    } catch (error) {
      console.error("Error al obtener usuario desde la cookie: ", error.message);
    }
  }

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged

    if (req.session.userLogged.rol === 'ADMIN') {
      res.locals.isAdmin = true;
    }

  }

  next()
}


module.exports = userLoggedMiddleware;

