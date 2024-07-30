const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")

module.exports = {
    name: "iq",
    aliases: ["Iq", "IQ", "iQ"],
    description: "IQ Command",
    usage: "z!iq",
    category: "Fun",
    run: async(client, message, args, prefix) => {
        const iq = Math.floor(Math.random() * 164) + 1;

const user = message.mentions.users.first() || message.author;


        const embed = new MessageEmbed()
            .setTitle(`${user.username}'s IQ : ${iq}`)
            //.setAuthor(user.username, user.avatarURL())
            .setColor("#000000")
            .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
            .setTimestamp();

        message.lineReplyNoMention(embed);
    }
};
/*
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "iq",
    aliases: ["Iq", "IQ", "iQ"],
    description: "IQ Command",
    usage: "z!iq",
    category: "Fun",
    run: async(client, message, args, prefix) => {
        const iq = Math.floor(Math.random() * 164) + 1;

        const embed = new MessageEmbed()
            .setTitle(`Your IQ is ${iq}`)
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor("#000000")
            .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
            .setTimestamp();

        message.lineReplyNoMention(embed);
    }
};

*/
