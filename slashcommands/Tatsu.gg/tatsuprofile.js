const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const config = require("../../config.json")

const Tatsu = require('tatsu');

const tatsu = new Tatsu(config.tatsukey || process.env.tatsu);

module.exports = {
    name: "tatsuprofile",
    options: [
        {
          name: "user",
          description: "User To Get Info",
          type: 6,
          required: false
        }
      ],
    description: "Tatsu.gg",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      let userid;
      const channel = client.channels.cache.get(interaction.channel_id)

      if (args) {
        userid = args.find(u => u.name).value
      } else userid = interaction.member.user.id

      let user = client.users.cache.get(userid)

tatsu.getProfile(userid).then(async user => {
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
  const channel = client.channels.cache.get(interaction.channel_id)
  channel.send(`**Tatsu Profile For ${data.username}#${data.discriminator}**`).then(msg => msg.delete({timeout:8000}))
  sendembed(embed)
})
  }
}
