const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kanna",
  aliases: ["Kannafy", "Kanna"],
  description: "Kanna Command",
  category: "Images",
  usage: "z!kanna <text>",
  run: async (client, message, args, prefix) => {
    const text = args.join(" ");
    if (!text) return message.lineReplyNoMention("**Please Provide a Valid Text!**");

    let maxlen = 85
 if(text.length > 85) {
 return message.lineReplyNoMention(`**Please Provide a Text Under 85 Characters!**`)
 }


    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=kannagen&text=${text}`
    ).then((res) => res.json()).catch(e => {
    message.lineReplyNoMention(`**An Error Has Occured!**\n\`${e}\``)
  });

    const embed = new MessageEmbed()
      .setTitle("Kannafied")
      .setImage(data.message)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Requested by ${message.author.tag}`)
      .setColor("#000000")
      //.setDescription(`**Here Is Your Kannafied Image!**`);

    message.lineReplyNoMention(embed);
  },
};
