const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "shutdown",
    ownerOnly: true,
    aliases: ["shut", "down", "restart"],
    category: "Owner",
    usage: "z!shutdown",
    description: "Shutdown Command Only For The Owner!",
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
      try {
        await message.lineReplyNoMention("Shuttingdown The Bot...")
        process.exit()
      } catch(e) {
        message.lineReplyNoMention(`An Error Has Occured!`)
      }


    }
  }
