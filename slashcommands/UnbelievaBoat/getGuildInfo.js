const config = require("../../config.json")
const { Client } = require('unb-api');
const unbclient = new Client(process.env.unb || config.unbkey);


const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")


module.exports = {
    name: "unbguild",
    options: [],
    description: "UnbelievaBoat.com",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      const channel = client.channels.cache.get(interaction.channel_id)
      const data = await fetch(
      `https://unbelievaboat.com/api/v1/guilds/${interaction.guild_id}`
    ).then((res) => res.json()).catch(e => {
    channel.send(`**An Error Has Occured!**\n\`${e}\``).then(msg => msg.delete({timeout:8000}))
    });

    try {

  const embed = new MessageEmbed()
  .addField(`Server`, `\`\`\`yaml\n${data.name || client.guilds.cache.get(interaction.guild_id).name} (ID: ${data.id || interaction.guild_id})\n\`\`\``)
  .setThumbnail(`https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png`)
  .addField(`Owner`, `\`\`\`yaml\n${client.users.cache.get(data.owner_id).tag} (ID: ${data.owner_id || 0} )\n\`\`\``)
  .addField(`Members`, `\`\`\`yaml\n${data.member_count || client.guilds.cache.get(interaction.guild_id).memberCount}\n\`\`\``)
  .addField(`Currency Symbol`, `\`\`\`yaml\n${data.symbol || `Not Found`}\n\`\`\` (${data.symbol})`)
  .setColor("#000001")
  sendembed(embed)
}catch(e) {
  channel.send(`**Unbelievaboat Isn't In This Server! ${e}**`).then(msg => msg.delete({timeout:8000}))
}
    }}
