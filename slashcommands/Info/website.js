const discord = require("discord.js")
const fetch = require("node-fetch")
const { site, extension } = require("../../config.json")

module.exports = {
    name: "website",
    description: "zirobot.xyz",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      sendmsg(`**[Website](<https://${site}.${extension}>)**`)
    }
  }
