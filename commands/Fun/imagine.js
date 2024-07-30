const Discord = require ('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
name: "imagine",
aliases: ["imagining"],
category: "Fun",
usage: "z!imagine <text to imagine>",
description: "Imagine Reading This LMAO!",
run: async(client, message, args, prefix) => {
  
  let imagine = message.content.split(" ").slice(1).join(" ")
  if(!imagine) return message.lineReplyNoMention("What Do You Want To Imagine?")
  let embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL())
  .setDescription(`imagine ${imagine}`)
  .setColor("#000000")
  .setFooter(`${message.author.username} Is a Very Imaginable Person`)
  .setTimestamp()
  message.lineReplyNoMention(embed)
}
}