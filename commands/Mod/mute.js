const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "",
  category: "Mod",
  aliases: ["mlukniwe", "tempmute"],
  description: "Mute Command",
  usage: "mute <@user> <reason>",
  run: async (client, message, args, prefix) => {

     if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.lineReplyNoMention(
        "You Don't Have Enough Permissions To Use This Command!"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.lineReplyNoMention("I Don't Have Enough Permissions To Use This Command!");
    }

       const user = message.mentions.members.first();

    if (!user) {
      return message.lineReplyNoMention(
        "Who Do You Want To Mute?"
      );
    }
 
    if(user.id === message.author.id) {
      return message.lineReplyNoMention("You Can't Mute Yourself");
    }

     
    let reason = args.slice(1).join(" ")
    
    
    if(!reason) {
      return message.lineReplyNoMention("Please Specify The Reason For The Mute!")
    }

      
    let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
    
    
      if(!muterole) {
      return message.lineReplyNoMention("This Server Doesn't Have a Role Named `Muted`, Please Create One!")
    }
    
     if(user.roles.cache.has(muterole)) {
      return message.lineReplyNoMention("This User Is Already Muted!")
    }

     
    user.roles.add(muterole)
    
await message.lineReplyNoMention(`You Muted **${message.mentions.users.first().username}** For \`${reason}\``)
    
    user.send(`You Are Muted In **${message.guild.name}** For \`${reason}\``)

  }
}