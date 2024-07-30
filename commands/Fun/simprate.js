const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "simp",
    aliases: ["simprate"],
    category: "Fun",
    usage: "z!simp",
    description: `Simp % Command`,
    run: async (client, message, args) => {

           const simprate = Math.random() * 101;

           const embed = new MessageEmbed()
          .setColor("#000000")
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(`You Are a ${Math.floor(simprate)}/100% Simp :flushed: `)
          .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
          .setTimestamp();

          message.lineReplyNoMention(embed);



    }
  }
