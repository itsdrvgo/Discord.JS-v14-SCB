const routes = require("../routes/index")
const express = require("express")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const { discordStrategy } = require("../strategies/discord")
const passport = require("passport")
const session = require("express-session")
const ms = require("ms")
const path = require("path")
const store = require("connect-mongo")

/**
 * @param {CustomClient} client
 */
function createApp(client) {

    discordStrategy(client)

    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.set("views", path.join(__dirname, "../views"));
    app.use(express.static(path.join(__dirname, "../public")));
    app.set("view engine", "ejs");

    app.use(session({
        secret: "UYIGFGALIOGILB79J7980U8",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: ms("15m")
        },
        store: store.create({ mongoUrl: process.env.DATABASE })
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    app.use("/", routes)

    return app

}

module.exports = { createApp }