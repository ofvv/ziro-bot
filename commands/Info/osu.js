const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const osu = require('node-osu');
const { OsuKey } = require('../../config.json');
const api = new osu.Api(OsuKey , {
    notFoundAsError: true,
    completeScores: false
})

module.exports = {
    name: "osu",
    aliases: ["osustats"],
    ownerOnly: false,
    cooldown: 1000,
    category: "Info",
    usage: "z!osu <user>",
    description: "Shows The Stats Of A Osu Player!",
    run: async (client, message, args, prefix) => {

let username = args[0]


if (!args[0]) return message.lineReplyNoMention('**Please Choose a Osu Player (<https://osu.ppy.sh/home>)**')
api.getUser({u: username}).then(user => {
const osu = new Discord.MessageEmbed()
//.setTitle(`<:osu:760439827086311446> User Osu Search System`)
.setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
.setColor("#000001")
.addField(`Username:`, `\`\`\`yaml\n${user.name}\n\`\`\``, true)
.addField(`Performance Points:`, `\`\`\`yaml\n${Math.round(user.pp.raw)}\n\`\`\``, true)
.addField(`Level:`, `\`\`\`yaml\n${Math.round(user.level)}\n\`\`\``, true)
.addField(`Country Rank:`, `\`\`\`yaml\n${user.pp.countryRank || `No Info`}\n\`\`\``, true)
.addField(`Playcount:`, `\`\`\`yaml\n${user.counts.plays || `No Info`}\n\`\`\``, true)
.addField(`Score:`, `\`\`\`yaml\n${user.scores.ranked || `No Info`}\n\`\`\``, true)
.addField(`Country:`, `\`\`\`yaml\n${user.country || `No Info`}\n\`\`\``, true)
.addField(`Rank:`, `\`\`\`yaml\n${user.pp.rank || `No Info`}\n\`\`\``, true)
.addField(`Accuracy:`, `\`\`\`yaml\n${user.accuracyFormatted || 0}\n\`\`\``, true)
.setTimestamp()
.setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
message.lineReplyNoMention(osu)
}).catch(e => {
  return message.lineReplyNoMention(`**I Can't Find This User!**`)
})

}}
