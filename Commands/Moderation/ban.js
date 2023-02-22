const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const EditReply = require("../../Systems/EditReply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Permanently bans a target from the server")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(opt => opt.setName("target").setDescription("Select a target").setRequired(true))
        .addStringOption(opt => opt.setName("reason").setDescription("Provide a reason").setRequired(false)),

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {CustomClient} client
     */
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true })

        const { options, user, guild } = interaction
        const { emojiList, color } = client

        const target = options.getMember("target")
        const reason = options.getString("reason") || "no reason provided"

        if (!target) return EditReply(interaction, emojiList.cross, `Invalid target!`)

        if (target.id === user.id) return EditReply(interaction, emojiList.cross, `You can't ban yourself!`)
        if (guild.ownerId === target.id) return EditReply(interaction, emojiList.cross, `You can't ban the server's owner!`)

        if (!target.bannable) return EditReply(interaction, emojiList.cross, `Target can't be banned!`)

        await target.ban({ reason: reason })

        EditReply(interaction, emojiList.tick, `${target} has been banned for : **${reason}**`)

        target.send({
            embeds: [
                Embed
                    .setTitle(`\`${emojiList.warning}\` | You have been Banned!`)
                    .setColor(color)
                    .setThumbnail(target.user.displayAvatarURL())
                    .addFields(
                        { name: "Name:", value: `${target.user.tag}`, inline: true },
                        { name: "Banned from:", value: `${guild.name}`, inline: true },
                        { name: "reason:", value: `${reason}`, inline: false }
                    )
                    .setTimestamp()
            ]
        }).catch(err => {

            if (err.code !== 50007) return

        })

    }
}