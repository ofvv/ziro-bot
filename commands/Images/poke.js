const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
name: "poke",
aliases: ["pokeme"],
category: "Images",
description: "Poke Command",
usage: "z!poke <@user>",
run: async(client, message, args, prefix) => {
    const data = await fetch("https://nekos.life/api/v2/img/poke").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const poke = message.author.id === user.id ? "Themselfs" : user.username;

    if(!message.channel.nsfw) return message.lineReplyNoMention("Please Enable NSFW For This Channel In Order To Use This Command!")

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} Poked ${poke}`)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
      .setColor("#000000")
      .setImage(`${data.url}`)
      .setTimestamp();

    message.lineReplyNoMention(embed);
  },
};
