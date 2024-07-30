const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { normalPrefix, dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)

module.exports = {
    name: "setprefix",
    aliases: ["prefix"],
    category: "Utility",
    usage: "z!prefix <prefix>",
    description: "Set The Server Prefix",
    run: async (client, message, args, prefix) => {

if(!message.member.hasPermission("ADMINISTRATOR")) {
let embed = new MessageEmbed()
.setColor(`#00001`)
.setDescription(`**Only Server Admins Can Change My Prefix!**`);

return message.lineReplyNoMention(embed);
}

if (!args[0]) {
  let embed = new MessageEmbed()
  .setColor(`#00001`)
  .setDescription(`**Please Select a Prefix!**`);

return message.lineReplyNoMention(embed);
}

if (args[1]) {
  let embed = new MessageEmbed()
  .setColor(`#00001`)
  .setDescription(`**Please Select a Prefix That Is Only One Argument! Example:** \`z!\``);

return message.lineReplyNoMention(embed);
}

if (args[0].length > 5) {
  let embed = new MessageEmbed()
  .setColor(`#00001`)
  .setDescription(`**Please Select a Prefix Under 5 Characters!**`);

return message.lineReplyNoMention(embed);
}

if (args[0] === normalPrefix) {
  let embed = new MessageEmbed()
  .setColor(`#00001`)
  .setDescription(`**My Prefix Is Now Set To Default!**`);

await db.delete(`guild_prefix_${message.guild.id}`);

return message.lineReplyNoMention(embed);
}

if (args[0].includes("`")) {
let embed = new MessageEmbed()
.setDescription(`**Please Don't Use Backtick In Your Prefix!**`)
.setColor(`#00001`);

return message.lineReplyNoMention(embed);
}

let embed = new MessageEmbed()
.setColor(`#00001`)
.setDescription(`**I Will Now Respond To:** \`${args[0]}\`**!**`);

await db.set(`guild_prefix_${message.guild.id}`, args[0]);

await message.lineReplyNoMention(embed);

 }
}
