const { Client, GatewayIntentBits, Partials } = require("discord.js")
const { loadEvents } = require("./Functions/EventLoader")
require("dotenv").config()

const client = new Client({
    intents: [
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
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

client.login(process.env.TOKEN)