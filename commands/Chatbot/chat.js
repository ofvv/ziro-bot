const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "",
    aliases: ["chatbot"],
    category: "Chatbot",
    usage: "z!chat <text>",
    description: "Ziro-ChatBot",
    run: async (client, message, args, prefix) => {

      let text = args.join(" ");

      if(text.length === 0) {
          const saysomething = new MessageEmbed()
          .setDescription("**Please Say Something!**")
          //.setFooter(`${client.user.username} ${new Date().getFullYear()} © | Requested By ${message.author.tag}`)
          .setColor("#000001")
          return message.lineReplyNoMention(saysomething);
      }

      if(text.length === 1) {
          const say2 = new MessageEmbed()
          .setDescription("**Please Say Something That Is Atleast 2 Letters!**")
          //.setFooter(`${client.user.username} ${new Date().getFullYear()} © | Requested By ${message.author.tag}`)
          .setColor("#000001")
          return message.lineReplyNoMention(say2);
      }
//https://api.deltaa.me/chatbot?message=${text}
      const data = await fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${text}`).then(res => res.json()).then(data => {
              const chatbot = new MessageEmbed()
              .setDescription(`${message.author.tag} Said: **${text}** \n ${client.user.username} Replied With: **${data.message}**`)
              //.setFooter(`${client.user.username} ${new Date().getFullYear()} © | Chatting With ${message.author.tag}`)
              //.setThumbnail(client.user.displayAvatarURL())
              .setColor("#000001")
              message.lineReplyNoMention(chatbot)
          });
    }
  }
