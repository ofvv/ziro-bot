const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone',
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: 'High',
	VERY_HIGH: 'Very High',
};

const discord = require("discord.js")

module.exports = {
    name: "serverinfo",
    description: "Get Server Info!",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      let guild = client.guilds.cache.get(interaction.guild_id)
      			const roles = guild.roles.cache
      				.sort((a, b) => b.position - a.position)
      				.map((role) => role.toString());
      			const members = guild.members.cache;
      			const channels = guild.channels.cache;
      			const emojis = guild.emojis.cache;
      			const embed2 = new MessageEmbed()
      			.setColor("#000001")
      			.setThumbnail(guild.iconURL({ dynamic: true }))
      			.addField(`Server Name`, `\`\`\`yaml\n${guild.name}\n\`\`\``, true)
      			.addField(`Server Created`, `\`\`\`yaml\n${moment(guild.createdTimestamp).format(
      				'LT'
      			)} ${moment(guild.createdTimestamp).format('LL')} (${moment(
      				guild.createdTimestamp
      			).fromNow()})\n\`\`\``, true)
      			.addField(`Server ID`, `\`\`\`yaml\n${guild.id}\n\`\`\``, true)
      			.addField(`Server Members`, `\`\`\`yaml\n${guild.memberCount}\n\`\`\``, true)
      			.addField(`Boost Level`, `\`\`\`yaml\n${
      				guild.premiumTier
      					? `Level ${guild.premiumTier}`
      					: 'None'
      			}\n\`\`\``, true)
      			.addField(`Explicit Filter`, `\`\`\`yaml\n${guild.explicitContentFilter}\n\`\`\``, true)
      			.addField(`Verificaton Level`, `\`\`\`yaml\n${guild.verificationLevel}\n\`\`\``, true)
      			.addField(`Roles`, `\`\`\`yaml\n${roles.length}\n\`\`\``, true)
      			.addField(`Emojis`, `\`\`\`yaml\n${emojis.size}\n\`\`\``, true)
      			.addField(`Regular Emojis`, `\`\`\`yaml\n${
      				emojis.filter((emoji) => !emoji.animated).size
      			}\n\`\`\``, true)
      			.addField(`Animated Emojis`, `\`\`\`yaml\n${
      				emojis.filter((emoji) => emoji.animated).size
      			}\n\`\`\``, true)
      			.addField(`Text Channels`, `\`\`\`yaml\n${
      					channels.filter((channel) => channel.type === 'text').size
      				}\n\`\`\``, true)
      			.addField(`Voice Channels`, `\`\`\`yaml\n${
      				channels.filter((channel) => channel.type === 'voice').size
      			}\n\`\`\``, true)
      			.addField(`Boosters`, `\`\`\`yaml\n${guild.premiumSubscriptionCount || '0'}\n\`\`\``, true)
      			.setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)

            sendembed(embed2)
    }}
