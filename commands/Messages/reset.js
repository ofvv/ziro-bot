const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const Messages = require("discord-messages");
const api = require("blueapi.js");

module.exports = {
    name: "resetmsgs",
    aliases: ["reset"],
    ownerOnly: false,
    cooldown: 1000,
    category: "Messages",
    usage: "z!resetmsgs <user>",
    description: "Reset The Messages Of a User!",
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
      const target = message.mentions.users.first();
      if(!target) {
        return message.lineReplyNoMention(`**Please Choose a User To Reset Messages!**`)
      }
      const user = await Messages.fetch(target.id, message.guild.id);
      if (!user) {
        return message.lineReplyNoMention(`**This User Doesn't Have Any Messages!**`)
      }
      //await Messages.setMessages(target.id, message.guild.id, '0')
      Messages.deleteUser(target.id, message.guild.id)
      message.lineReplyNoMention(`**I Have Successfuly Reseted <@${target.id}>'s Messages!**`)
    }
  }
