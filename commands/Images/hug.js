const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
name: "hug",
aliases: ["hugme"],
category: "Images",
usage: "z!hug <@user>",
description: "Hug Command",
run: async(client, message, args, prefix) => {
    const data = await fetch("https://nekos.life/api/hug").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const hugged = message.author.id === user.id ? "Themselfs" : user.username;

    /*if(!message.channel.nsfw) return message.lineReplyNoMention("Please Enable NSFW For This Channel In Order To Use This Command!") */

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} Hugged ${hugged}`)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
      .setColor("#000000")
      .setImage(`${data.url}`)
      .setTimestamp();

    message.lineReplyNoMention(embed);
  },
};
