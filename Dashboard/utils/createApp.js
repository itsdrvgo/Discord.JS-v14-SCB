const routes = require("../routes/index")
const express = require("express")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const { discordStrategy } = require("../strategies/discord")
const passport = require("passport")
const session = require("express-session")
const ms = require("ms")

/**
 * @param {CustomClient} client
 */
function createApp(client) {

    discordStrategy(client)

    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use(session({
        secret: "UYIGFGALIOGILB79J7980U8",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: ms("15m")
        }
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    app.use("/", routes)

    return app

}

module.exports = { createApp }