const { Client, Colors, Collection } = require("discord.js")
const emojis = require("../../emojis.json")
const configuration = require("../../config.json")

class CustomClient extends Client {

    color = Colors.Blue
    emojiList = emojis
    config = configuration
    commands = new Collection()

}

module.exports = { CustomClient }