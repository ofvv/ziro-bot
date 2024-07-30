const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "users",
  aliases: ["totalusers"],
  description: "Total Users Count",
  usage: "z!users",
  category: "Info",
  run: async (client, message, args, prefix) => {
var totalMembers = 0;
client.guilds.cache.forEach(guild => {
    var x = parseInt(guild.memberCount);
    totalMembers = totalMembers + x;
})

const embed = new MessageEmbed()
.setDescription(`**Total Users: ${totalMembers || `Can't Fetch`}**`)
.setColor("#000001")
//.addField(`User Count:`, `${totalMembers}`, true)
message.lineReplyNoMention(embed)

  }}
