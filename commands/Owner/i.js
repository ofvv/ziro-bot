const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'i',
    category: 'Owner',
    ownerOnly: true,
    description: 'I Command',
    aliases: ['devcreateinv'],
    usage: 'z!i <id>',
    run: async (client, message, args, prefix) => {
      /*
      const notowner = new MessageEmbed()
      .setDescription(`**An Error Has Occured | You Are Not The Bot Owner!**`)
      .setColor(`#000001`)

      const owner1 = client.users.cache.get("484701017015975936")
      const owner2 = client.users.cache.get("643009255372488704")

      let owners = ["484701017015975936", "643009255372488704"];

      if(!owners.includes(message.author.id)) return message.lineReplyNoMention(notowner)
      */

      let inviteguild = args[0];

      if(!inviteguild) return message.lineReplyNoMention('**Please Provide a Guild ID So I Can Generate an Invite!**')

      let guild = client.guilds.cache.get(inviteguild);
      const channel = guild.channels.cache.filter(ch => ch.type === "text").first()
      channel.createInvite({unique: true}).then(invite => {
      message.lineReplyNoMention(`**Invite:** https://discord.gg/${invite.code}`)
      })
}
}
