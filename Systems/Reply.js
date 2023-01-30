const { EmbedBuilder, CommandInteraction } = require("discord.js")

/**
 * @param {CommandInteraction} interactionInteraction
 * @param {String} emoji
 * @param {String} description
 * @param {Boolean} type
 */
function Reply(interaction, emoji, description, type) {

    interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setColor("#0072FF")
                .setDescription(`\`${emoji}\` | ${description}`)
        ],
        ephemeral: type || true
    })

}

module.exports = Reply