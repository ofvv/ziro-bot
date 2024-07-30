const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");

module.exports = {
name: "enlarge",
aliases: ["emoji", "emojiinfo", "eminfo"],
category: "Utility",
usage: "z!enlarge <emoji>",
description: "Enlarge/Emoji Command",
run: (client, message, args, prefix) => {

    const emoji = args[0];
    if (!emoji) return message.lineReplyNoMention("Please Provide an Emoji!");

    let custom = Discord.Util.parseEmoji(emoji);
    const embed = new MessageEmbed()
    .setTitle(`Enlarged!`)
    .setColor("#000000")
    .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Requested By ${message.author.tag}`)
    .setTimestamp();

    if (custom.id) {
        embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
        return message.lineReplyNoMention(embed);
    }
    else {
        let parsed = parse(emoji, { assetType: "png" });
        if (!parsed[0]) return message.lineReplyNoMention("Please Provide a Valid Emoji!");

        embed.setImage(parsed[0].url);
        return message.lineReplyNoMention(embed);
    }
}
}
