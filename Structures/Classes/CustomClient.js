const { Client, Colors, Collection } = require("discord.js")
const emojis = require("../../emojis.json")
const configuration = require("../../config.json")
const mongoose = require("mongoose")
const { Dashboard } = require("../../Dashboard")

class CustomClient extends Client {

    color = Colors.Blue
    emojiList = emojis
    config = configuration
    commands = new Collection()
    dashboard = new Dashboard(this)

    start() {

        const token = process.env.TOKEN
        const db = process.env.DATABASE

        this.login(token)
            .then(() => {

                this.dashboard.init()

                if (!db) return

                mongoose.set("strictQuery", false)
                mongoose.connect(db)
                    .then(data => {
                        console.log(`Connected to: ${data.connection.name}`)
                    })
                    .catch(err => console.log(err))

            })
            .catch(err => console.log(err))

    }

}

module.exports = { CustomClient }