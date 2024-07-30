const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clyde",
  aliases: ["Clyde", "ClydeBot"],
  description: "Clyde Command",
  category: "Images",
  usage: "z!clyde <text>",
  run: async (client, message, args, prefix) => {
    const text = args.join(" ");
    if (!text) return message.lineReplyNoMention("**Please Provide a Valid Text**");

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`
    ).then((res) => res.json());

    const embed = new MessageEmbed()
      .setTitle("Clyde")
      .setImage(data.message)
      .setFooter(`${client.user.username} 2020 © | Requested by ${message.author.tag}`)
      .setColor("#000000")
      .setDescription(`Here Is Your ClydeBot Image`);

    message.lineReplyNoMention(embed);
  },
};
