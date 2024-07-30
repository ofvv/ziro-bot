const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")
const { site, extension } = require("../../config.json")

module.exports = {
    name: "membercount",
    description: "Total Server Members",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {

      const guild = client.guilds.cache.get(interaction.guild_id)

      sendmsg(`**Member Count:** \`${guild.memberCount}\``)
    }
  }
