const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const Messages = require("discord-messages");
const api = require("blueapi.js");

module.exports = {
    name: "resetguildmsgs",
    aliases: ["resetguild"],
    ownerOnly: false,
    cooldown: 1000,
    category: "Messages",
    usage: "z!resetguild",
    description: "Reset The Messages Of a Guild!",
    run: async (client, message, args, prefix) => {
      if(!message.member.hasPermission("ADMINISTRATOR")) {
      let embed = new MessageEmbed()
      .setColor(`#000001`)
      .setDescription(`**You Don't Have The "Administrator" Permission!**`);

      return message.lineReplyNoMention(embed);
      }
      let enabled = await db.get(`messages_start_${message.guild.id}`)
      if (!enabled) {
        return message.lineReplyNoMention(`**Im Not Collecting Messages! Please Enable It By Typing ${prefix}start**`)
      }
      let yesno = args[0];
      if (!yesno) {
        return message.lineReplyNoMention(`**Are You Sure You Want To Reset The Guild's Messages? If Yes Then Type ${prefix}resetguild yes**`)
      }
      if (yesno === 'yes') {
        await Messages.resetGuild(message.guild.id);
        return message.lineReplyNoMention(`**I Have Reseted The Guild's Messages!**`)
      }
      if (yesno === 'no') {
        return message.lineReplyNoMention(`**Alright!**`)
      }
    }
  }
