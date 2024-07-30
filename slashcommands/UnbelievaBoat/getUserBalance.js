const config = require("../../config.json")
const { Client } = require('unb-api');
const unbclient = new Client(process.env.unb || config.unbkey);


const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")


module.exports = {
    name: "unbbalance",
    options: [
        {
          name: "user",
          description: "User To Get Info",
          type: 6,
          required: false
        }
      ],
    description: "UnbelievaBoat.com",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      const channel = client.channels.cache.get(interaction.channel_id)
      let userid;

      if (args) {
        userid = args.find(u => u.name).value
      } else userid = interaction.member.user.id

      let user = client.users.cache.get(userid)


unbclient.getUserBalance(interaction.guild_id, userid).then(async user => {
  //console.log(user)
  const embed = new MessageEmbed()
  .addField(`User`, `\`\`\`yaml\n${client.users.cache.get(user.user_id).tag || `Not Found`}\n\`\`\``)
  .addField(`Server Rank`, `\`\`\`yaml\n#${user.rank || 0}\n\`\`\``)
  .addField(`Cash`, `\`\`\`yaml\n${user.cash || 0}\n\`\`\``)
  .addField(`Bank`, `\`\`\`yaml\n${user.bank || 0}\n\`\`\``)
  .setColor("#000001")
  .addField(`Total`, `\`\`\`yaml\n${user.total || 0}\n\`\`\``)
  sendembed(embed)
}).catch(e => channel.send(`**Unbelievaboat Isn't In This Server!**`).then(msg => msg.delete({timeout:8000})))
  }
}
