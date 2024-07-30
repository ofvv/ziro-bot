const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "randomavatar",
    aliases: ["randomav"],
    category: "Utility",
    usage: "z!randomav",
    description: "Random Avatar!",
    run: async (client, message, args, prefix) => {
const user = client.users.cache.random();

 message.lineReplyNoMention(
    new MessageEmbed()
    .setColor("#000001")
    .setDescription(`**${user.tag}'s Avatar!**`)
    .setImage(user.displayAvatarURL({size: 4096, dynamic: true}))
    .setFooter(`${client.user.username} ${new Date().getFullYear()} © | (${user.tag}'s ID: ${user.id})`)
 )
 }
}
