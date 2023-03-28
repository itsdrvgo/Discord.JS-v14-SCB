const { Router } = require("express")
const router = Router()
const passport = require("passport")

router.get("/discord", passport.authenticate("discord"), (req, res) => {
    res.sendStatus(200)
})

router.get("/discord/redirect", passport.authenticate("discord"), (req, res) => {
    res.redirect("/account")
})

router.get("/status", (req, res) => {
    return req.user ? res.send(req.user) : res.status(401).send("Unauthorized")
})

module.exports = router