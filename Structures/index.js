const { GatewayIntentBits, Partials } = require("discord.js")
const { CustomClient } = require("./Classes/CustomClient")
const { loadEvents } = require("./Functions/EventLoader")
require("dotenv").config()

const client = new CustomClient({
    intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction
    ]
})

loadEvents(client)

client.start()