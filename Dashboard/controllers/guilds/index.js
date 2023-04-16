const client = require("../../../Structures/index.js")
const { getMutualGuildsService, getAdminButNotMutualGuildsService } = require("../../services/guilds/index.js")

async function getGuildsController(req, res) {

    const user = req.user

    try {

        const mutualGuilds = await getMutualGuildsService(user.id, client)
        const adminButNotMutualGuilds = await getAdminButNotMutualGuildsService(user.id, client)
        res.render("account", { mutualGuilds, adminButNotMutualGuilds })

    } catch (err) {

        res.status(400).send("Error")
        throw err

    }

}

module.exports = { getGuildsController }