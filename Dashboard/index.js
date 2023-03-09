const { Events } = require("discord.js");
const { CustomClient } = require("../Structures/Classes/CustomClient");
const { createApp } = require("./utils/createApp");

class Dashboard {

    /**
     * @param {CustomClient} client
     */
    constructor(client) {
        this.client = client
    }

    init() {

        const initialize = () => {

            try {

                const app = createApp(this.client)
                app.listen(this.client.config.port, () => console.log("Initialized Dashboard on Port : " + this.client.config.port))

            } catch (err) {

                console.log(err)

            }

        }

        if (!this.client.isReady()) this.client.once(Events.ClientReady, () => initialize())
        else initialize()

    }

}

module.exports = { Dashboard }