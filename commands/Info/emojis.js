const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "emojis",
    aliases: ["emojilist"],
    ownerOnly: false,
    cooldown: 1000,
    category: "Info",
    usage: "z!emojis",
    description: "Shows The Emojis of a Server!",
    run: async (client, message, args, prefix) => {
  //    try {
  const em = new MessageEmbed()
  //.setDescription(`**Here Is The Emoji List!**`)
  .addField(`**Emoji List:**`, `${message.guild.emojis.cache.map(e => e.toString()).join(' ') || `**This Server Doesn't Have Any Emojis!**`}`)
        message.lineReplyNoMention(em).catch(e => {
         return message.lineReplyNoMention(`**I Can't Send My Message Because Its Over 2000 Characters!**`)
        })
//} catch (err) {
//  message.lineReplyNoMention(`**I Can't Send My Message Because Its Over 2000 Characters!**`)
//}
    }}
