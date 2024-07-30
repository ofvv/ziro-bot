const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const Messages = require("discord-messages");

module.exports = {
    name: "startcollecting",
    aliases: ["start"],
    ownerOnly: false,
    cooldown: 1000,
    category: "Messages",
    usage: "z!startcollecting",
    description: "Start Collecting Messages For This Guild!",
    run: async (client, message, args, prefix) => {
      let enabled = await db.get(`messages_start_${message.guild.id}`)
      if (enabled === 1) {
        return message.lineReplyNoMention(`**Im Already Collecting Messages!**`)
      }
      db.set(`messages_start_${message.guild.id}`, 1)
      return message.lineReplyNoMention(`**Done! I Will Now Count How Many Messages a User Has!**`)
    }
  }
