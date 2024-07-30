const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
    name: "time",
    aliases: ["Calendar", "Date"],
    category: "Info",
    usage: "z!time",
    description: `Date/Time Command`,
    run: async (client, message, args, prefix) => {

      let user = message.mentions.users.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]);
      if (!user) user = message.author;
      if (user.avatarURL === undefined || user.avatarURL == null) return message.lineReplyNoMention("An Error Has Occured")

      const embed = new MessageEmbed()
     .setColor('#FFFFFF')
     .setDescription('**Calendar**')
     .addField("The Date Is:", `${moment(user.joinedAt).format('LL LTS')}`, true)
     .setThumbnail(client.user.displayAvatarURL())
     .setTimestamp()
     .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`);

     message.lineReplyNoMention(embed);


    }
  }
