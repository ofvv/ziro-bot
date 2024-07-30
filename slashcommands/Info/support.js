const discord = require("discord.js")
const fetch = require("node-fetch")
const { site, extension } = require("../../config.json")

module.exports = {
    name: "support",
    description: "Support Server",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      sendmsg(`**[Support Server](<https://${site}.${extension}/support>)**`)
    }
  }
