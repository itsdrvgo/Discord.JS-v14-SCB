const { model, Schema } = require("mongoose")

module.exports = model("user", new Schema({
    discordId: String,
    accessToken: String,
    refreshToken: String,
    email: String
}))