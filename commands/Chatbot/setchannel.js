const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink);

module.exports = {
    name: "setchannel",
    aliases: ["setchatbot"],
    category: "Chatbot",
    usage: "z!setchannel <#channel>",
    description: "Ziro-ChatBot",
    run: async (client, message, args, prefix) => {
      const noperms = new MessageEmbed()
      .setDescription(`**You Need Manage Guild/Administrator Permissions To Use This Command!**`)
      .setColor(`#000001`)
      if (!message.member.hasPermission("MANAGE_GUILD")) return message.lineReplyNoMention(noperms)
if (!args[0]) {
  let b = await db.fetch(`chatbot_${message.guild.id}`);
  let channelName = message.guild.channels.cache.get(b);
  if (message.guild.channels.cache.has(b)) {
    return message.lineReplyNoMention(
      `**Chatbot Channel: #${channelName.name}**`
    );
  } else
    return message.lineReplyNoMention({embed: {
            color: `#000001`,
            description: `**Please Choose a Channel!**`
        }})
}
    let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

    if (!channel || channel.type !== 'text') return message.lineReplyNoMention({embed: {
            color: `#000001`,
            description: `**Please Choose a Valid Channel!**`
        }})

    try {
        let a = await db.fetch(`chatbot_${message.guild.id}`)

        if (channel.id === a) {
            return message.lineReplyNoMention({embed: {
            color: `#000001`,
            description: `**Done!**`
        }})
        } else {
            client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send(`**You Can Chat With Me Here!**`)
            db.set(`chatbot_${message.guild.id}`, channel.id)

           message.lineReplyNoMention({embed: {
            color: `#000001`,
            description: `**Done!**`
        }})
        }
    } catch (e) {
        return message.lineReplyNoMention(`**An Error Has Occured\n${e}**`);
    }
    }}
