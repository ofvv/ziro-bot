const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js");
const { evalchannel } = require("../../config.json");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const config = require("../../config.json")

const Tatsu = require('tatsu');

const tatsu = new Tatsu(config.tatsukey || process.env.tatsu);

module.exports = {
  name: "tatsuguildrank",
  ownerOnly: false,
  aliases: ["tatsuguild", "tatsutop", "tguild"],
  description: "Tatsu Info",
  usage: "z!tatsu <@user>",
  category: "Tatsu.gg",
  run: async (client, message, args, prefix) => {

tatsu.getGuildRankings(message.guild.id).then(rankings => {
  console.log(rankings)
  let user = message.mentions.members.first() || message.author
  let finder = rankings.find(r => r.user_id === user.id)
  const embed = new MessageEmbed()
  .addField(`User`, `\`\`\`yaml\n${client.users.cache.get(finder.user_id).tag || `Not Found`}\n\`\`\``)
  .addField(`Server Rank`, `\`\`\`yaml\n#${finder.rank || `Not Info`}\n\`\`\``)
  .addField(`Score`, `\`\`\`yaml\n${finder.score || `Not Info`}\n\`\`\``)
  message.lineReplyNoMention(`**Tatsu Rank Info**`, embed)
})
  }
}
