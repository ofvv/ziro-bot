const discord = require("discord.js")
const fetch = require("node-fetch")
const { site, extension } = require("../../config.json")

module.exports = {
    name: "invite",
    description: "Invite Me",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      interaction.sendmsg(`**[Invite Me](<https://${site}.${extension}/invite>)**`)
    }
  }
