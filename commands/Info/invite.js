const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    aliases: ["inviteme", "inviteziro"],
    category: "Info",
    usage: "z!invite",
    description: "Invite Command",
    run: async (client, message, args, prefix) => {

   const embed = new MessageEmbed()
	.setColor('#FFFFFF')
	.setTitle('Invite Me Here')
	.setDescription('^^^^^^^^^^^^^^^')
  .setURL('https://discord.com/oauth2/authorize?client_id=752242570532225064&permissions=268815426&scope=bot')
	.setThumbnail(client.user.displayAvatarURL())
	.setTimestamp()
	.setFooter(`${client.user.username} ${new Date().getFullYear()} ©`);

  message.lineReplyNoMention(embed);
    }}
