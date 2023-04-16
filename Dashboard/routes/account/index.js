const { Router } = require("express")
const { isAuthenticated } = require("../../utils/middleware")
const { getGuildsController } = require("../../controllers/guilds")
const router = Router()

router.get("/", isAuthenticated, getGuildsController)

module.exports = router