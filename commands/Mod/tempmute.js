const discord = require("discord.js");
const ms = require("ms")

module.exports = {
  name: "",
  description: "TempMute Command",
  category: "Mod",
  usage: "z!tempmute <@user> <time> <reason>",
  run: async(client, message, args, prefix) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      let embed = new discord.MessageEmbed()
      .setColor()
      .setDescription("You Don't Have Enough Perms!")
      return message.lineReplyNoMention(embed)
    }

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
      let embed = new discord.MessageEmbed()
      .setColor("#000000")
      .setDescription("I Don't Have Enough Perms!")
      return message.lineReplyNoMention(embed)
    }

    let user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]);
    if(!user) {
      let embed = new discord.MessageEmbed()
      .setColor("#000000")
      .setDescription("Please Mention a User To tempmute!")
      return message.lineReplyNoMention(embed)
    }

    let time = args[1];
    if(!time || isNaN(ms(time))) {
      let embed = new discord.MessageEmbed()
      .setColor("#000000")
      .setDescription("Please Provide a Valid Time!")
      return message.lineReplyNoMention(embed);
    }

    let reason = args.slice(2).join(" ");
    if(!reason) {
      reason = "No Reason"
    }

    if(!user.kickable) {
      let embed = new discord.MessageEmbed()
      .setColor("#000000")
      .setDescription("I Can't Mute This Person!")
    }

    let mute = await message.guild.roles.cache.find(r => r.name === "Muted");
    if(!mute) {
      message.guild.roles.create({
        data: {
          name: "Muted",
          color: "#000000",
          permissions: {
            "SEND_MESSAGES": false
          }
        }
      })
    };

    if(user.roles.cache.has(mute.id)) {
      let embed = new discord.MessageEmbed()
      .setColor("#000000")
      .setDescription("This User Is Already Muted!")
      return message.lineReplyNoMention(embed);
    }

    user.roles.add(mute.id).then(() => {
      message.guild.channels.cache.forEach(ch => {
        ch.updateOverwrite(mute, {
          SEND_MESSAGES: false
        })
      })
      let embed = new discord.MessageEmbed()
      .setColor("#000000")
      .setDescription("**I Have Successfully Muted This Person!**")
      .addField("Mod:", message.author, true)
      .addField("Muted For:", time, true)
      message.lineReplyNoMention(embed)
      user.send(`You Were Muted In ${message.guild.name} For ${time} For The Reason: ${reason}`).catch()
      setTimeout(() => {
        user.roles.remove(mute.id)
      }, ms(time))
    })

  }
}
