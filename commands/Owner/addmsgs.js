const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const Messages = require("discord-messages");

module.exports = {
    name: "addmsgs",
    aliases: ["add"],
    ownerOnly: true,
    cooldown: 1000,
    category: "Owner",
    usage: "z!addmsgs <user>",
    description: "Add Messages To a User!",
    run: async (client, message, args, prefix) => {
      let amount = args[1];
      typeof amount;
      let enabled = await db.get(`messages_start_${message.guild.id}`)
      if (!enabled) {
        return message.lineReplyNoMention(`**This Feature Is Not Enabled On This Server!**`)
      }
      const target = message.mentions.users.first();
      if (!target) {
        return message.lineReplyNoMention(`**Please Choose a User To Add Messages!**`)
      }
      const user = await Messages.fetch(target.id, message.guild.id);
      if (!amount) {
        return message.lineReplyNoMention(`**Choose an Amount!**`)
      }
      const AddMessage = await Messages.appendMessage(target.id, message.guild.id, amount);
      let newamount = user.data.messages + Number(amount);
      message.lineReplyNoMention(`**Done! <@${target.id}> Now Has ${newamount} Message(s)!**`)
      //Messages.appendMessage(target.id, amount);
    }
  }
