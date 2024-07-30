const { normalPrefix, dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'whitelist',
    category: 'Owner',
    ownerOnly: true,
    description: 'Whitelist Command',
    aliases: ['unblock'],
    usage: 'z!whitelist <@user>',
    run: async (client, message, args, prefix) => {
      /*
      const notowner = new MessageEmbed()
      .setDescription(`**An Error Has Occured | You Are Not The Bot Owner!**`)
      .setColor(`#000001`)

      const owner1 = client.users.cache.get("484701017015975936")
      const owner2 = client.users.cache.get("643009255372488704")

      let owners = ["484701017015975936", "643009255372488704"];

      if(!owners.includes(message.author.id)) return message.lineReplyNoMention(notowner)*/
      let user;
        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else if (args[0]) {
          user = message.guild.members.cache.get(args[0]).user;
        }

        if(!user) return message.lineReplyNoMention("**Please Specify a User!**")

        let blacklist = await db.get(`blacklist_${user.id}`)

        if(blacklist === 0 || blacklist === null) return message.lineReplyNoMention(`${user} **Is Not Blacklisted!**`) //here you are checking if the user is already blacklisted

        const embed = new MessageEmbed()
        //.setAuthor('Hype', client.user.displayAvatarURL())
        //.setTitle('Blacklisted!')
        .setDescription('**You Have Been Blacklisted!**')
        .setTimestamp()
        //user.send(embed)

        message.lineReplyNoMention(`**${user} Is Now Whitelisted!**`)
await db.delete(`blacklist_${user.id}`, 1)
  }}
