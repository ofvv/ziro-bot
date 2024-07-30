const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "firstmessage",
    aliases: ["firstmsg"],
    ownerOnly: false,
    cooldown: 1000,
    category: "Info",
    usage: "z!firstmsg",
    description: "Shows The First Message Of A Channel!",
    run: async (client, message, args, prefix) => {
      try {
  const messages = await message.channel.messages.fetch({ after: 1, limit: 1 });
  const fMessage = messages.first();
  const embed = new MessageEmbed()
    .setColor("#000001")
    .setThumbnail(fMessage.author.displayAvatarURL({ format: 'png', dynamic: true }))
    .addField(`Message Content:`, `\`\`\`yaml\n${fMessage.content}\n\`\`\``, true)
    .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
    .addField('Message:', "**" + `[Jump To Message](${fMessage.url})` + "**", false)
    .addField('Message Created:', "**" + `${fMessage.createdAt}` + "**", false)
    .addField(`Message Channel:`, `**#${fMessage.channel.name} (ID: ${fMessage.channel.id})\nGuild: ${fMessage.guild.name} (Guild ID: ${fMessage.guild.id})**`)
    .addField(`Message ID:`, `**${fMessage.id}**`)
    .addField(`Message Author:`, `**${fMessage.author.tag} (ID: ${fMessage.author.id}) ([Avatar Link](${fMessage.author.displayAvatarURL({ dynamic: true })}))**`)
  message.lineReplyNoMention(embed);
} catch (err) {
  if (message.deletable) message.delete();
}
    }}
