const config = require("../../config.json")
const { Client } = require('unb-api');
const unbclient = new Client(process.env.unb || config.unbkey);


const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")


const fetch = require("node-fetch")

module.exports = {
  name: "unbelievaguild",
  ownerOnly: false,
  aliases: ["unbelievaguildinfo", "unbelievainfo"],
  description: "Unbelieva Info",
  usage: "z!unbelievaguild",
  category: "UnbelievaBoat.com",
  run: async (client, message, args, prefix) => {

    const data = await fetch(
      `https://unbelievaboat.com/api/v1/guilds/${message.guild.id}`
    ).then((res) => res.json()).catch(e => {
    message.lineReplyNoMention(`**An Error Has Occured!**\n\`${e}\``)
    });

    try {

  const embed = new MessageEmbed()
  .addField(`Server`, `\`\`\`yaml\n${data.name || message.guild.name} (ID: ${data.id || message.guild.id})\n\`\`\``)
  .setThumbnail(`https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png`)
  .addField(`Owner`, `\`\`\`yaml\n${client.users.cache.get(data.owner_id).tag} (ID: ${data.owner_id || 0} )\n\`\`\``)
  .addField(`Members`, `\`\`\`yaml\n${data.member_count || message.guild.memberCount}\n\`\`\``)
  .addField(`Currency Symbol`, `\`\`\`yaml\n${data.symbol || `Not Found`}\n\`\`\` (${data.symbol})`)
  .setColor("#000001")
  message.lineReplyNoMention(embed)
}catch(e) {
  message.lineReplyNoMention(`**Unbelievaboat Isn't In This Server!**`).then(msg => msg.delete({timeout:8000}))
}

}}
