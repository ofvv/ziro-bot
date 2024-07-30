const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "support",
    aliases: ["server", "supportserver"],
    category: "Info",
    usage: "z!support",
    description: "Support Server Command",
    run: async (client, message, args, prefix) => {

   const embed = new MessageEmbed()
	.setColor('#FFFFFF')
	.setTitle('Ziro-Bot Support Server')
	.setDescription('^^^^^^^^^^^^^^^^^^^^^^^^^')
  .setURL('https://discord.gg/yXjx596')
	.setThumbnail(client.user.displayAvatarURL())
	.setTimestamp()
	.setFooter(`${client.user.username} ${new Date().getFullYear()} ©`);

  message.lineReplyNoMention(embed);
    }}
