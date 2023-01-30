const { Events, ChatInputCommandInteraction } = require("discord.js");
const { CustomClient } = require("../../Structures/Classes/CustomClient");
const Reply = require("../../Systems/Reply");

module.exports = {
    name: Events.InteractionCreate,

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {CustomClient} client
     */
    execute(interaction, client) {

        if (!interaction.isChatInputCommand()) return

        const { commandName, guild, user } = interaction

        if (!guild) return

        const command = client.commands.get(commandName)
        if (!command) return Reply(interaction, client.emojiList.cross, `The command you're trying to execute doesn't exist!`) && client.commands.delete(commandName)

        if (command.owner && !client.config.devs.includes(user.id)) return Reply(interaction, client.emojiList.cross, `This command is classified!`)

        command.execute(interaction, client)

    }
}