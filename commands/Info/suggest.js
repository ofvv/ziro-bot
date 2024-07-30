const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const { suggestionschannel } = require("../../config.json");

module.exports = {
    name: "suggest",
    aliases: ["newsuggestion"],
    category: "Info",
    usage: "z!suggest <suggestion>",
    description: "Suggest an idea!",
    run: async (client, message, args, prefix) => {

      /*if(message.author.id != "484701017015975936") return message.lineReplyNoMention("This Command Is In Development!") */

      const suggest = args.join(" ");

      if(suggest.length === 0) {
          const givesuggest = new MessageEmbed()
          .setDescription("**Please Give a Suggestion!**")
          .setColor("#000000")
          return message.lineReplyNoMention(givesuggest);
      }

      const embed1 = new MessageEmbed()
      //.setTitle(`You Just Gave a Suggestion!`)
      .setDescription(`**Your Suggestion is:** **${suggest}**`)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Suggested by ${message.author.tag}`)
      .setColor("#000000")
      message.lineReplyNoMention(embed1)

      const embed2 = new MessageEmbed()
      .setTitle(`New Suggestion by ${message.author.tag} (${message.author.id}) in #${message.channel.name} (${message.channel.id})`)
      .setDescription(`Suggestion: **${suggest}**`)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
      .setColor("#000000")
      client.channels.cache.get(suggestionschannel).send(embed2)
}}
