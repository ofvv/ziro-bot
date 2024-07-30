const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)

module.exports = {
    name: "enablecommands",
    aliases: ["encom"],
    ownerOnly: false,
    cooldown: 1000,
    category: "Utility",
    usage: "z!encom <channel>",
    description: "Enable Commands In a Channel!",
    run: async (client, message, args, prefix) => {
      if(!message.member.hasPermission("ADMINISTRATOR")) {
      let embed = new MessageEmbed()
      .setColor(`#000001`)
      .setDescription(`**You Don't Have The "ADMINISTRATOR" Permission!**`);

      return message.lineReplyNoMention(embed);
      }

let channel = /*message.guild.channels.cache.get(args[1]) ||*/ message.guild.channels.cache.find(channel => channel.name === args.join(' ')) || message.mentions.channels.first() || message.channel;
if (!channel) {
  return message.lineReplyNoMention(`**Please Choose a Channel!**`)
}
let disabled = await db.get(`disabled_${message.guild.id}_${channel.id}`)
if (!disabled) {
  return message.lineReplyNoMention(`**The Commands For <#${channel.id}> Are Not Disabled! You Can Do ${prefix}encom <channel> To Choose a Different Channel!**`)
}
await db.delete(`disabled_${message.guild.id}_${channel.id}`)
message.lineReplyNoMention(`**I Have Enabled The Commands For <#${channel.id}>!**`)
    }
  }
