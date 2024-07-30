const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "waifu",
    aliases: ["Waifu"],
    category: "Fun",
    usage: "z!waifu",
    description: `Waifu % Command`,
    run: async (client, message, args) => {

           const waifu = Math.random() * 101;

           const embed = new MessageEmbed()
          .setColor("#000000")
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(`You Are a ${Math.floor(waifu)}/100% waifu :flushed: `)
          .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
          .setTimestamp();

          message.lineReplyNoMention(embed);



    }
  }
