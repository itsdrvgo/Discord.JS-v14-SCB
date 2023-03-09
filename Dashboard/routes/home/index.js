const { Router } = require("express")
const router = Router()

router.get("/", (req, res) => {
    res.send({
        msg: "Home"
    })
})

module.exports = router