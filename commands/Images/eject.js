const discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: "eject",
  description: "Eject Among Us Command",
  usage: "z!eject <user>",
  category: "Images",
  run: async (client, message, args, prefix) => {
    const user = message.mentions.users.first()
    const imp = [true, false];
    const imposter = imp[Math.floor(Math.random() * imp.length)];
    const crew = ["black", "blue", "brown", "cyan", "darkgreen", "lime", "orange", "pink", "purple", "red", "white", "yellow"]
    const crewmate = crew[Math.floor(Math.random() * crew.length)];

    if(!user) {
      return message.lineReplyNoMention(`Please Choose a User To Eject!`)
    }

    const data = await fetch(`https://vacefron.nl/api//ejected?name=${user.username}&impostor=${imposter}&crewmate=${crewmate}`)

    const embed = new discord.MessageEmbed()
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
      .setColor("#000000")
      .setDescription(`**Ejected**`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.lineReplyNoMention(embed);
  }
}
