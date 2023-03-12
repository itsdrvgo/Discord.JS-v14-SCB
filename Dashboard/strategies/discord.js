const passport = require("passport")
const { Strategy } = require("passport-discord")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const User = require("../../Schemas/User")

/**
 * @param {CustomClient} client
 */
function discordStrategy(client) {

    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {

        try {

            const user = await User.findOne({ _id: id })
            return user ? done(null, user) : done(null, null)

        } catch (err) {

            console.log(err)
            return done(err, null)

        }

    })

    passport.use(

        new Strategy({

            clientID: client.config.clientId,
            clientSecret: client.config.clientSecret,
            callbackURL: "http://localhost:8000/auth/discord/redirect",
            scope: ["identify", "email", "guilds"]

        }, async (accessToken, refreshToken, profile, done) => {

            const { id: discordId, email } = profile

            try {

                const existingUser = await User.findOneAndUpdate(
                    { discordId },
                    { accessToken, refreshToken },
                    { new: true })

                if (existingUser) return done(null, existingUser)

                const newUser = new User({ discordId, accessToken, refreshToken, email })
                const savedUser = await newUser.save()

                return done(null, savedUser)

            } catch (err) {

                console.log(err)
                return done(err, undefined)

            }

        })

    )

}

module.exports = { discordStrategy }