const { Client, Events, ActivityType } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: Events.ClientReady,
    once: true,

    /**
     * @param {Client} client
     */
    execute(client) {

        const { ws, user } = client

        console.log(`${user.username} is online!`)

        setInterval(() => {
            
            user.setActivity({
                name: `Ping: ${ws.ping} ms`,
                type: ActivityType.Playing
            })

        }, ms("15s"))

    }
}