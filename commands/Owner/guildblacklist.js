const { normalPrefix, dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildblacklist',
    category: 'Owner',
    ownerOnly: true,
    description: 'Guild Blacklist Command',
    aliases: ['guildblock'],
    usage: 'z!guildblacklist <@user>',
    run: async (client, message, args, prefix) => {
    /*  const notowner = new MessageEmbed()
      .setDescription(`**An Error Has Occured | You Are Not The Bot Owner!**`)
      .setColor(`#000001`)

      const owner1 = client.users.cache.get("484701017015975936")
      const owner2 = client.users.cache.get("643009255372488704")

      let owners = ["484701017015975936", "643009255372488704"];

      if(!owners.includes(message.author.id)) return message.lineReplyNoMention(notowner)
*/
        const guild1 = args[0];

        if(!guild1) return message.lineReplyNoMention("**Please Give Me a Guild ID!**")
        let blacklist = await db.get(`blacklist_guild_${guild1}`)

        if(blacklist === null) {
        await db.set(`blacklist_guild_${guild1}`, 1);
        //const leavepls = client.guilds.cache.get(guild1)
        message.lineReplyNoMention(`**lacklisted!**`)

        leavepls.leave()
        } else if(blacklist !== null) {
            message.lineReplyNoMention(`**This Guild Is Already Blacklisted!**`)
        } return;
    }
}
