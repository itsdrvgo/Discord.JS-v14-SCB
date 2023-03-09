const routes = require("../routes/index")
const express = require("express")
const cors = require("cors")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

/**
 * 
 * @param {CustomClient} client
 */
function createApp(client) {

    const app = express()

    app.use(cors({
        origin: [`${client.config.domain}:${client.config.port}`],
        credentials: true
    }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use("/", routes)
    
    return app

}

module.exports = { createApp }