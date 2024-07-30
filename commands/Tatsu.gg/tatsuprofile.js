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
  name: "tatsuprofile",
  ownerOnly: false,
  aliases: ["tatsup", "tatsu", "tprofile"],
  description: "Tatsu Profile",
  usage: "z!tatsuprofile <@user>",
  category: "Tatsu.gg",
  run: async (client, message, args, prefix) => {

    let user = message.mentions.members.first() || message.author

    tatsu.getProfile(user.id).then(user => {
      let data = user._data
      const embed = new MessageEmbed()
      .addField(`Title`, `\`\`\`yaml\n${data.title || `No Title`}\n\`\`\``)
      .addField(`Reputations`, `\`\`\`yaml\n${data.reputation || 0}\n\`\`\``)
      .addField(`Info Box`, `\`\`\`yaml\n${data.info_box || `No Info`}\n\`\`\``)
      .addField(`Credits`, `\`\`\`yaml\n${data.credits}\n\`\`\``)
      .addField(`Tokens`, `\`\`\`yaml\n${data.tokens}\n\`\`\``)
      .addField(`XP`, `\`\`\`yaml\n${data.xp}\n\`\`\``)
      .addField(`Subscription Type`, `\`\`\`yaml\n${data.subscription_type || `No Subscription`}\n\`\`\``)
      .setColor(`#000001`)
      .setThumbnail(data.avatar_url)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} © | ID: ${data.id}`);
      message.lineReplyNoMention(`**Tatsu Profile For ${data.username}#${data.discriminator}**`, embed)
})

}
}
