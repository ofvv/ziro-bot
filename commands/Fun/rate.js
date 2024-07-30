const discord = require("discord.js");
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "rate",
    aliases: ["rateme"],
    category: "Fun",
    description: "Rate Me Command",
    usage: "z!rate",
    run: async (client, message, args) => {

        const rate = Math.random() * 10;

        const embed = new MessageEmbed()
            .setColor("#000000")
            .setAuthor(message.author.username, message.author.avatarURL())
            .setDescription(`I Rate You ${Math.floor(rate)}/10!`)
            .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
            .setTimestamp();

        message.lineReplyNoMention(embed);
    }
}
