const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)

module.exports = {
    name: "disablecommands",
    aliases: ["discom"],
    ownerOnly: false,
    cooldown: 1000,
    category: "Utility",
    usage: "z!disablecommands <channel>",
    description: "Disable Commands In a Channel!",
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
await db.set(`disabled_${message.guild.id}_${channel.id}`, 1)
message.lineReplyNoMention(`**I Have Disabled The Commands For <#${channel.id}>! You Can Do ${prefix}discom <channel> To Choose a Different Channel!**`)
    }
  }
