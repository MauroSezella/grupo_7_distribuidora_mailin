function adminMiddleware (req, res, next){
    if (!req.session.userLogged || req.session.userLogged.rol != 'ADMIN'){
        return res.redirect('/')
    }
    next()
}


module.exports = adminMiddleware;
