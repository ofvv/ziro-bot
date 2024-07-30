const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    aliases: ["pleaseleave", "leavefrom"],
    ownerOnly: true,
    description: "Leave Command",
    usage: "z!leave",
    category: "Owner",
    run: async (client, message, args, prefix) => {

      /*
      if(message.author.id != "484701017015975936") return message.lineReplyNoMention("An Error Has Occured | You Are Not The Bot Owner!")
      */

      /*
        const owner1 = client.users.cache.get("484701017015975936")
        const owner2 = client.users.cache.get("643009255372488704")

        let owners = ["484701017015975936", "643009255372488704"];

        if(!owners.includes(message.author.id)) return message.lineReplyNoMention(notowner)
     */
    /*
     const notowner = new MessageEmbed()
     .setDescription(`**An Error Has Occured | You Are Not The Bot Owner!**`)
     .setColor(`#000001`)

     const owner1 = client.users.cache.get("484701017015975936")
     const owner2 = client.users.cache.get("643009255372488704")

     let owners = ["484701017015975936", "643009255372488704"];

     if(!owners.includes(message.author.id)) return message.lineReplyNoMention(notowner)
*/
    if(!args[0]) return message.lineReplyNoMention('**Please Provide a Guild ID So I Can Leave!**')

    let guild = client.guilds.cache.get(args[0]); //client.channels.cache.get

    message.lineReplyNoMention(`**I Left From: ${guild.name} | ${guild.memberCount} Members | Server ID: ${guild.id} | ${guild.roles.cache.size} Roles | ${guild.channels.cache.size} Channels**`).then(guild.leave())


    }
  }
