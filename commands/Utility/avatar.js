const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ["av"],
    category: "Utility",
    usage: "z!avatar <@user>",
    description: "Avatar Command",
    run: async (client, message, args, prefix) => {

  let user;

  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    user = message.guild.members.cache.get(args[0]).user;
  } else {
    user = message.author;
  }

  let avatar = user.displayAvatarURL({size: 4096, dynamic: true});
  let avatar1024 = user.displayAvatarURL({size: 1024, dynamic: true});
  let avatar512 = user.displayAvatarURL({size: 512, dynamic: true});
  let avatar256 = user.displayAvatarURL({size: 256, dynamic: true});
  let avatar128 = user.displayAvatarURL({size: 128, dynamic: true});
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.tag === args.join(' ')) || message.guild.members.cache.find(m => m.user.username === args.join(' ')) || message.member;

  const embed = new Discord.MessageEmbed()
  .setDescription(`**${user.tag}**'s **__Avatar__**`)
  .addField(`Avatar`, `**[Link](${avatar})**`, true)
  .addField(`Formats`, `**[PNG](${member.user.displayAvatarURL({ dynamic: true, format: 'png' })}) | [JPG](${member.user.displayAvatarURL({ dynamic: true, format: 'jpg' })}) | [GIF](${member.user.displayAvatarURL({ dynamic: true, format: 'gif' })})**`)
  .addField(`Sizes`, `**[1024x1024](${avatar1024})**`, `**[512x512](${avatar512})**`, `**[256x256](${avatar256})**`, `**[128x128](${avatar128})**`, true)
  .setColor("#000000")
  .setImage(avatar)

  return message.lineReplyNoMention(embed);
}}
