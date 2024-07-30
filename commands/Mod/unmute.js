const Discord = require("discord.js")

module.exports = {
  name: "",
  category: "Mod",
  aliases: ["ela", "untempmute"],
  description: "UnMute Command",
  usage: "unmute <@user>",
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
        "Who Do You Want To Unmute?"
      );
    }

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
    
    
 if(user.roles.cache.has(muterole)) {
      return message.lineReplyNoMention("This User Doesn't Have The Role `Muted`")
    }

       user.roles.remove(muterole)
    
    await message.lineReplyNoMention(`**${message.mentions.users.first().username}** Has Been Unmuted`)
    
    user.send(`You Were Unmuted From **${message.guild.name}**`)

  }}