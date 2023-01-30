const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const { CustomClient } = require("../../Structures/Classes/CustomClient");
const Reply = require("../../Systems/Reply");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Shows the bot's current latency"),

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {CustomClient} client
     */
    execute(interaction, client) {

        const { emojiList, ws } = client

        Reply(interaction, emojiList.timer, `The current Websocket Lantency is: \`${ws.ping} ms\``)

    }
}