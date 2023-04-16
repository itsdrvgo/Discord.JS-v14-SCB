const { default: axios } = require("axios");
const { CustomClient } = require("../../../Structures/Classes/CustomClient.js");
const User = require("../../../Schemas/User.js");
const DISCORD_API_URL = "https://discord.com/api/v9"

/**
 * @param {CustomClient} client
 */
function getBotGuildsService(client) {
    return axios.get(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    });
}

/**
 * @param {String} id
 */
async function getUserGuildsService(id) {
    const user = await User.findById(id);
    if (!user) throw new Error("No user found!");
    return axios.get(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    });
}

/**
 * @param {String} id
 * @param {CustomClient} client
 */
async function getMutualGuildsService(id, client) {
    const { data: botGuilds } = await getBotGuildsService(client);
    const { data: userGuilds } = await getUserGuildsService(id);

    const adminUserGuilds = userGuilds.filter(({ permissions }) => (parseInt(permissions) & 0x8) === 0x8);
    const mutualGuilds = adminUserGuilds.filter((guild) => botGuilds.some((botGuild) => botGuild.id === guild.id));

    return mutualGuilds;
}

/**
 * @param {String} id
 * @param {CustomClient} client
 */
async function getAdminButNotMutualGuildsService(id, client) {
    const { data: botGuilds } = await getBotGuildsService(client);
    const { data: userGuilds } = await getUserGuildsService(id);

    const adminUserGuilds = userGuilds.filter(({ permissions }) => (parseInt(permissions) & 0x8) === 0x8);
    const mutualGuilds = adminUserGuilds.filter((guild) => botGuilds.some((botGuild) => botGuild.id !== guild.id));

    return mutualGuilds;
}

module.exports = { getBotGuildsService, getUserGuildsService, getMutualGuildsService, getAdminButNotMutualGuildsService }