const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const Messages = require("discord-messages");

module.exports = {
    name: "stopcollecting",
    aliases: ["stop"],
    ownerOnly: false,
    cooldown: 1000,
    category: "Messages",
    usage: "z!stopcollecting",
    description: "Stop Collecting Messages For This Guild!",
    run: async (client, message, args, prefix) => {
      let enabled = await db.get(`messages_start_${message.guild.id}`)
      if (!enabled) {
        return message.lineReplyNoMention(`**Im Not Collecting Messages!**`)
      }
      await db.delete(`messages_start_${message.guild.id}`)
      return message.lineReplyNoMention(`**Done! I Won't Count How Many Messages a User Has!**`)
    }
  }
