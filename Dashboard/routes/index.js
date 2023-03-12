const { Router } = require("express")
const homeRouter = require("./home")
const accountRouter = require("./account")
const authRouter = require("./auth")

const router = Router()

router.use("/", homeRouter)
router.use("/account", accountRouter)
router.use("/auth", authRouter)

module.exports = router