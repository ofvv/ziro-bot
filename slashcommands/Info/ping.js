const discord = require("discord.js")
const fetch = require("node-fetch")
const { site, extension } = require("../../config.json")

module.exports = {
    name: "ping",
    description: "Get the bot's ping!",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {

      const data = await fetch(`https://${site}.${extension}/api/on`).then((res) =>
            res.json()
          ).catch(e => {
          })

      interaction.sendmsg(`**Ping: \`${client.ws.ping}ms\`\nWebsite Ping: \`${data.ping || `Website Is Offline!`}\`**`)
    }
  }
