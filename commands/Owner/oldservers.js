const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const sourcebin = require("sourcebin_js");

module.exports = {
    name: "oldservers",
    ownerOnly: true,
    aliases: ["oldserveri", "oldsurvuri"],
    category: "Owner",
    usage: "z!oldservers",
    description: "The Old Server List",
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
        sourcebin.create([
            {
                name: 'Ziro-Bot',
                content: client.guilds.cache.map(guild => `Name: ${guild.name} | ID: ${guild.id} | Members: ${guild.memberCount} | Roles: ${guild.roles.cache.size} | Channels: ${guild.channels.cache.size} | Created at: ${guild.createdAt} |`).join('\n'),
                languageId: 'txt'
            }
        ]).then(src => {
            message.lineReplyNoMention(`Here is The Link For The List Of Servers Im In => ${src.url}`)
        }).catch(e => {
            let embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`An Error Has Occured\n${e}`);

            message.lineReplyNoMention(embed);
        });
    }
}
