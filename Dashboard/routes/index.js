const { Router } = require("express")
const homeRouter = require("./home")
const accountRouter = require("./account")

const router = Router()

router.use("/", homeRouter)
router.use("/account", accountRouter)

module.exports = router