const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const { reportschannel } = require("../../config.json");

module.exports = {
    name: "report",
    aliases: ["newreport", "reportaproblem"],
    category: "Info",
    usage: "z!report <problem>",
    description: "Report a Problem!",
    run: async (client, message, args, prefix) => {

      /*if(message.author.id != "484701017015975936") return message.lineReplyNoMention("This Command Is In Development */

      const problem = args.join(" ");

      if(problem.length === 0) {
          const giveproblem = new MessageEmbed()
          .setDescription("**Please Say Your Problem!**")
          .setColor("#000000")
          return message.lineReplyNoMention(giveproblem);
      }

      const embed1 = new MessageEmbed()
      //.setTitle(`You Just Reported a Problem!`)
      .setDescription(`**Your Problem is:** **${problem}**`)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Reported by ${message.author.tag}`)
      .setColor("#000000")
      message.lineReplyNoMention(embed1)

      const embed2 = new MessageEmbed()
      .setTitle(`New Report by ${message.author.tag} (ID: ${message.author.id}) in #${message.channel.name} (${message.channel.id})`)
      .setDescription(`Problem: **${problem}**`)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
      .setColor("#000000")
      client.channels.cache.get(reportschannel).send(embed2)
}}
