const discord = require("discord.js")
const moment = require("moment")

module.exports = {
    name: "firstmessage",
    description: "First Message In a Channel!",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {

      const channel = client.channels.cache.get(interaction.channel_id)

        const messages = await channel.messages.fetch({ after: 1, limit: 1 });
        const fMessage = messages.first();/*
        const embed = new discord.MessageEmbed()
          .setColor("#000001")
          .setThumbnail(fMessage.author.displayAvatarURL({ format: 'png', dynamic: true }))
          .addField(`Message Content:`, `\`\`\`yaml\n${fMessage.content}\n\`\`\``, true)
          .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
          .addField('Message:', "**" + `[Jump To Message](${fMessage.url})` + "**", false)
          .addField('Message Created:', "**" + `${fMessage.createdAt}` + "**", false)
          .addField(`Message Channel:`, `**#${fMessage.channel.name} (ID: ${fMessage.channel.id})\nGuild: ${fMessage.guild.name} (Guild ID: ${fMessage.guild.id})**`)
          .addField(`Message ID:`, `**${fMessage.id}**`)
          .addField(`Message Author:`, `**${fMessage.author.tag} (ID: ${fMessage.author.id}) ([Avatar Link](${fMessage.author.displayAvatarURL({ dynamic: true })}))**`)
*/


      sendmsg(`**Message Content:** \`\`\`yaml\n${fMessage.content}\n\`\`\` \n**Message: [Jump To Message](<${fMessage.url}>)**\n**Message Created:** \`${fMessage.createdAt}\`\n**Message ID:** \`${fMessage.id}\`\n**Message Author: ${fMessage.author.tag} (ID: ${fMessage.author.id}) ([Avatar Link](${fMessage.author.displayAvatarURL({ dynamic: true })}))**`)
    }
  }
