const config = require("../../config.json")
const { Client } = require('unb-api');
const unbclient = new Client(process.env.unb || config.unbkey);


const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "unbelievaboatbalance",
  ownerOnly: false,
  aliases: ["unbelievaboatbal"],
  description: "Unbelieva Info",
  usage: "z!unbelievaboatbalance <@user>",
  category: "UnbelievaBoat.com",
  run: async (client, message, args, prefix) => {

    let user = message.mentions.members.first() || message.author

unbclient.getUserBalance(message.guild.id, user.id).then(async user => {
  const embed = new MessageEmbed()
  .addField(`User`, `\`\`\`yaml\n${client.users.cache.get(user.user_id).tag || `Not Found`}\n\`\`\``)
  .addField(`Server Rank`, `\`\`\`yaml\n#${user.rank || 0}\n\`\`\``)
  .addField(`Cash`, `\`\`\`yaml\n${user.cash || 0}\n\`\`\``)
  .addField(`Bank`, `\`\`\`yaml\n${user.bank || 0}\n\`\`\``)
  .setColor("#000001")
  .addField(`Total`, `\`\`\`yaml\n${user.total || 0}\n\`\`\``)
  message.lineReplyNoMention(embed)
}).catch(e => message.lineReplyNoMention(`**Unbelievaboat Isn't In This Server!**`).then(msg => msg.delete({timeout:8000})))

}}
