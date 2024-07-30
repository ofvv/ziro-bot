const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
name: "cuddle",
aliases: ["ChuddleMe"],
category: "Images",
description: "Cuddle Command",
usage: "z!cuddle <@user>",
run: async(client, message, args, prefix) => {
    const data = await fetch("https://nekos.life/api/v2/img/cuddle").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const cuddle = message.author.id === user.id ? "Themselfs" : user.username;

    /*if(!message.channel.nsfw) return message.lineReplyNoMention("Please Enable NSFW For This Channel In Order To Use This Command!") */

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} Cuddles ${cuddle}`)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
      .setColor("#000000")
      .setImage(`${data.url}`)
      .setTimestamp();

    message.lineReplyNoMention(embed);
  },
};
