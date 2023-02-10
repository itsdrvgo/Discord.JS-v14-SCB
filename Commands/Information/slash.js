const { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, PermissionFlagsBits } = require("discord.js");
const { CustomClient } = require("../../Structures/Classes/CustomClient");
const Reply = require("../../Systems/Reply");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("slash")
        .setDescription("This is a slash command")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        .addSubcommand(sub => sub.setName("slice").setDescription("This is a slice").addStringOption(opt => opt.setName("string").setDescription("Provide a string").setRequired(true)))
        .addSubcommandGroup(grp => grp.setName("parts").setDescription("These are the commands").addSubcommand(sub => sub.setName("part").setDescription("This is a part").addStringOption(opt => opt.setName("string").setDescription("Provide a string").setRequired(true))))

        // .addAttachmentOption(opt => opt.setName("attachment").setDescription("Add an attachment").setRequired(true))
        // .addChannelOption(opt => opt.setName("channel").setDescription("Provide a channel").setRequired(true).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement))
        // .addIntegerOption(opt => opt.setName("integer").setDescription("Provide an integer").setRequired(true).setMaxValue(200).setMinValue(20))
        // .addNumberOption(opt => opt.setName("number").setDescription("Provide a number").setRequired(true).setMaxValue(200).setMinValue(20))
        // .addRoleOption(opt => opt.setName("role").setDescription("Provide a role").setRequired(true))
        // .addStringOption(opt => opt.setName("string").setDescription("Provide a string").setRequired(true))
        // .addStringOption(opt => opt.setName("choices").setDescription("Provide a string").setRequired(true).addChoices({ name: "Choice 1", value: "1" }, { name: "Choice 2", value: "2" }, { name: "Choice 3", value: "3" }))
        // .addUserOption(opt => opt.setName("user").setDescription("Provide a user").setRequired(true))
        ,
    owner: true,

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {CustomClient} client
     */
    execute(interaction, client) {

        const { options } = interaction

        const subGrp = options.getSubcommandGroup()
        const sub = options.getSubcommand()

        const attachment = options.getAttachment("attachment")
        const channel = options.getChannel("channel")
        const int = options.getInteger("integer")
        const num = options.getNumber("number")
        const role = options.getRole("role")
        const str = options.getString("string")
        const opt = options.getString("choices")
        const user = options.getUser("user")
        const member = options.getMember("user")

        switch (sub) {

            case "slice": {

                // your code

            }
                break;

        }

        Reply(interaction, client.emojiList.tick, `This is a slash command!`)

    }
}