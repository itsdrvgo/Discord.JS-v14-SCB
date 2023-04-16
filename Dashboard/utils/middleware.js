const isAuthenticated = (req, res, next) => {
    req.user ? next() : res.status(403).send("Unauthorized")
}

module.exports = { isAuthenticated }