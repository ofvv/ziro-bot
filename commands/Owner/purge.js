const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "devpurge",
  ownerOnly: true,
  description: "Purge Command",
  usage: "z!devpurge <amount>",
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

    if(!args[0]) return message.reply("Please Enter a Valid Amount!");
  if(isNaN(args[0])) return message.reply("That Is Not A Number!");

    if(args[0] > 99) return message.reply("You Can Only Clear 100 Messages At a Time!");
    if(args[0] < 1) return message.reply("You Can't Delete 0 Messages!");

    await message.channel.messages.fetch({limit: args[0]}).then(messages => {
    message.channel.bulkDelete(messages);
});
  }
}
