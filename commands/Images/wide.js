const discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: "wide",
  description: "WideImage Command",
  usage: "z!wide",
  category: "Images",
  run: async (client, message, args) => {
    let user;

    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }

    let avatar = user.displayAvatarURL({size: 1024, dynamic: true});

    if(!user) {
      return message.lineReplyNoMention(`Please Choose a User To WideImage!`)
    }

    const data = await fetch(`https://vacefron.nl/api/wide?image=${avatar}`)

    const embed = new discord.MessageEmbed()
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
      .setColor("#000000")
      .setDescription(`**Wide Image**`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.lineReplyNoMention(embed);
  }
}
