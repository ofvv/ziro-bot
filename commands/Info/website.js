const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { site, extension, inviteurl } = require("../../config.json");

module.exports = {
    name: "website",
    aliases: ["web", "site"],
    category: "Info",
    usage: "z!website",
    description: "Website Command",
    run: async (client, message, args, prefix) => {

   const embed = new MessageEmbed()
	.setColor('#FFFFFF')
	.setTitle('Ziro-Bot Site')
	.setDescription('^^^^^^^^^^^^^^')
  .setURL(`https://${site}.${extension}/`)
	.setThumbnail(client.user.displayAvatarURL())
	.setTimestamp()
	.setFooter(`${client.user.username} ${new Date().getFullYear()} ©`);

  message.lineReplyNoMention(embed);
    }}
