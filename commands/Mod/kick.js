const Discord = require('discord.js')

module.exports = {
name: "",
aliases: [],
category: "Mod",
usage: "kick <@user> [reason]",
description: "Kick Command.",
run: async (client, message, args, prefix) => {

        let user = message.mentions.users.first();
        let reasonkick = message.content.split(' ').slice(2).join(' ');
        let guild = message.guild;
        let memberkick = message.guild.member;

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.lineReplyNoMention(`You Need **KICK_MEMBERS** Permissions to Execute this Command`)

     if (message.mentions.users.size < 1) {
            return message.lineReplyNoMention('You Need to Mention Someone to Kick!');
        }

     if (!reasonkick) {
            reasonkick = "No Reason Given"
        }

    if (!message.guild.member(user).kickable) {
            return message.lineReplyNoMention("That Member Couldn't be Kicked Due to His Role Being Above Mine");
        }

    message.guild.member(user).kick();

    let embed = new Discord.MessageEmbed()
    .setTitle("User Was Successfully Kicked")
    .setDescription(`${user.username}#${user.discriminator} was kicked by ${message.author.username}#${user.discriminator}`)
    .addField(`Reason :`, `${reasonkick}`)
    .setColor("#000000")
    message.lineReplyNoMention(embed)

     let DmEmbed = new Discord.MessageEmbed()
    .setDescription(`You Were Kicked From ${guild} For: ${reasonkick}`)
    .setColor("#000000")
    user.send(DmEmbed)
  }
}
