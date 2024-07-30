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
  name: "tatsutop",
  ownerOnly: false,
  aliases: ["ttop"],
  description: "Tatsu Info",
  usage: "z!tatsutop",
  category: "Tatsu.gg",
  run: async (client, message, args, prefix) => {

tatsu.getGuildRankings(message.guild.id).then(rankings => {
  let map = rankings.map(r => `**\`${client.users.cache.get(r.user_id).tag || `Not Found`}\` - \`#${r.rank}\` | Score: \`${r.score}\`**`)
  const embed = new MessageEmbed()
  .setDescription(map)
  .setColor(`#000001`)
  .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`);
  message.lineReplyNoMention(`**Tatsu Top**`, embed)
})
  }
}
