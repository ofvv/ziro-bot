const { normalPrefix, dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildwhitelist',
    category: 'Owner',
    ownerOnly: true,
    description: 'Guild Whitelist Command',
    aliases: ['guildunblock'],
    usage: 'z!guildwhitelist <@user>',
    run: async (client, message, args, prefix) => {
      /*
      const notowner = new MessageEmbed()
      .setDescription(`**An Error Has Occured | You Are Not The Bot Owner!**`)
      .setColor(`#000001`)

      const owner1 = client.users.cache.get("484701017015975936")
      const owner2 = client.users.cache.get("643009255372488704")

      let owners = ["484701017015975936", "643009255372488704"];

      if(!owners.includes(message.author.id)) return message.lineReplyNoMention(notowner)*/

        const guild1 = args[0];

        if(!guild1) return message.lineReplyNoMention("**Please Give Me a Guild ID!**")

        const whit = client.guilds.cache.get(guild1)

        let blacklist = await db.get(`blacklist_guild_${guild1}`)

        if(blacklist === 0 || blacklist === null) return message.lineReplyNoMention(`**This Guild is Not Blacklisted!**`)

        message.lineReplyNoMention(`**This Guild Has Been Whitelisted!**`)
await db.delete(`blacklist_guild_${guild1}`, 1)
  }}
