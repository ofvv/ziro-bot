const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const axios = require('axios');

module.exports = {
name: "animegif",
aliases: ["animepfp", "anime", "animepf"],
category: "Images",
usage: "z!animegif",
description: "Random Anime Gif Command",
run: async(client, message, args, prefix) => {
    const data = await fetch("https://randomgifapi.razerx.repl.co/gifs/anime").then((res) =>
      res.json()
    );
const embed = new MessageEmbed()
.setFooter(`${client.user.username} ${new Date().getFullYear()} © | Random Gif API 2021 ©`)
.setColor("#000001")
.setImage(`${data.link}`)
.setTimestamp();
message.lineReplyNoMention(embed)

}
}
