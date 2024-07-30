const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "membercount",
    aliases: ["members"],
    category: "Info",
    usage: "z!membercount",
    description: "MemberCount Command",
    run: async (client, message, args, prefix) => {

      const members = message.guild.members.cache;

      const embed = new MessageEmbed()
      .setDescription(`**Member Count:** ${message.guild.memberCount}`)
      .setColor("#000000")
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
      .setTimestamp();

      message.lineReplyNoMention(embed);

    }
  }
