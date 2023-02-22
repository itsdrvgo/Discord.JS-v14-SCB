const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const EditReply = require("../../Systems/EditReply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Removes ban from a target")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(opt => opt.setName("target-id").setDescription("Provide the target id").setRequired(true)),

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {CustomClient} client
     */
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true })

        const { options, guild } = interaction
        const { emojiList } = client

        const targetId = options.getString("user-id")
        if (isNaN(targetId)) return EditReply(interaction, emojiList.cross, `Invalid target ID!`)

        guild.bans.fetch().then(async bannedMembers => {

            if (bannedMembers.size === 0) return EditReply(interaction, emojiList.cross, `No one is banned in this server!`)
            if (!bannedMembers.find(x => x.user.id === targetId)) return EditReply(interaction, emojiList.cross, `Target is not banned!`)

            await guild.members.unban(targetId)

            EditReply(interaction, emojiList.tick, `<@${targetId}> has been unbanned`)

        }).catch(err => {

            EditReply(interaction, emojiList.cross, `Unexpected error occurred : \`\`\`${err}\`\`\``)

        })

    }
}