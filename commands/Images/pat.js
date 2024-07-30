const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
name: "pat",
aliases: ["patme"],
category: "Images",
description: "Pat Command",
usage: "z!pat <@user>",
run: async(client, message, args, prefix) => {
    const data = await fetch("https://nekos.life/api/pat").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const pat = message.author.id === user.id ? "Themselfs" : user.username;

    if(!message.channel.nsfw) return message.lineReplyNoMention("Please Enable NSFW For This Channel In Order To Use This Command!")

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} Patted ${pat}`)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
      .setColor("#000000")
      .setImage(`${data.url}`)
      .setTimestamp();

    message.lineReplyNoMention(embed);
  },
};
