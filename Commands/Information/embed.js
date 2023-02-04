const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Sends an embed"),

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {CustomClient} client
     */
    execute(interaction, client) {

        const Embed = new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({ name: "Author Name", iconURL: client.user.displayAvatarURL(), url: "https://itsdrago.tk/" })
            .setThumbnail(client.user.displayAvatarURL())
            .setURL("https://itsdrago.tk/")
            .setTitle("Title of the Embed")
            .setDescription("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo hic numquam et, unde perspiciatis, atque inventore laudantium dolor enim ipsam modi. Dolore cum adipisci iste, ipsam iure quaerat doloremque neque corporis?")
            .addFields(
                { name: "Field 1", value: "Value 1", inline: true },
                { name: "Field 2", value: "Value 2", inline: true },
                { name: "Field 3", value: "Value 3", inline: true }
            )
            .setImage("https://cdn.discordapp.com/icons/1024309441723650109/8878565c4735de38e9c62eaf33068bf9.webp")
            .setFooter({ text: "Footer", iconURL: client.user.displayAvatarURL() })
            .setTimestamp()

        interaction.reply({ embeds: [Embed] })

    }
}