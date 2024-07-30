const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const config = require("../../config.json")

const Tatsu = require('tatsu');

const tatsu = new Tatsu(config.tatsukey || process.env.tatsu);

module.exports = {
    name: "tatsuguildrank",
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

tatsu.getGuildRankings(interaction.guild_id).then(async rankings => {
  let finder = rankings.find(r => r.user_id === user.id)
  const embed = new MessageEmbed()
  .addField(`User`, `\`\`\`yaml\n${client.users.cache.get(finder.user_id).tag || `Not Found`}\n\`\`\``)
  .setColor(`#000001`)
  .addField(`Server Rank`, `\`\`\`yaml\n#${finder.rank || `Not Info`}\n\`\`\``)
  .addField(`Score`, `\`\`\`yaml\n${finder.score || `Not Info`}\n\`\`\``)
  sendembed(embed)
})
  }
}
