const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "poll",
    aliases: ["question"],
    category: "Utility",
    usage: "z!poll <Question>",
    description: "Poll Command",
    run: async (client, message, args, prefix) => {

      let question = message.content.split(" ").slice(1).join(" ")
      if(!question) return message.lineReplyNoMention("What Question Do You Want To Ask?")

   let embed = new discord.MessageEmbed()
   .setColor("#000000")
   .setAuthor(`Question Asked By ${message.member.displayName}`, message.author.displayAvatarURL())
   .setDescription(`${question}?`);

   message.lineReplyNoMention(embed).then(m => {
     m.react('👍');
     m.react('👎');
   })


    }
  }
