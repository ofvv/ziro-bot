const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "flushedmeter",
    aliases: ["Flushed", "FlushedMeter", "flushed"],
    category: "Fun",
    usage: "z!flushed",
    description: `FlushedMeter Command`,
    run: async (client, message, args, prefix) => {

      const flushed = Math.random() * 101;
      const flushedlevel = "😳".repeat(flushed);

      const embed = new MessageEmbed()
      .setColor("#000000")
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(`You Are  ${Math.floor(flushed)}/100% Flushed :flushed: `)
      .addField(`Flushed Level:`, `${flushedlevel}`)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
      .setTimestamp();

      message.lineReplyNoMention(embed);


    }
  }
