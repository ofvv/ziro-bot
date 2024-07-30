const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pewdiemeter",
    aliases: ["pewdiepie", "pewdie", "bros", "pewds"],
    category: "Fun",
    usage: "z!pewdie",
    description: `PewDiePie Fan % Command`,
    run: async (client, message, args, prefix) => {

           const fan = Math.random() * 101;

           const embed = new MessageEmbed()
          .setColor("#000000")
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(`You Are a ${Math.floor(fan)}/100% PewDiePie Fan! `)
          .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
          .setTimestamp();

          message.lineReplyNoMention(embed);



    }
  }
