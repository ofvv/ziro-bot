const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "",
    category: "Images",
    usage: "z!achievment <text>",
    description: "Minecraft Achievment Command",
    run: async (client, message, args, prefix) => {
    const text = args.join("+");
    if(!text) {
      return message.lineReplyNoMention(`**What Achievment Do You Want?**`)
    }
let maxlen = 25
 if(text.length > 25) {
 return message.lineReplyNoMention(`**Please Provide a Text Under 25 Characters!**`)
 }
    const e = new MessageEmbed()
    .setDescription(`**Minecraft Achievment: ${text}**`)
      .setImage(
        `https://minecraftskinstealer.com/achievement/12/Achievement%20Get!/${text}`
      )
      .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Requested By ${message.author.tag}`)
    message.lineReplyNoMention(e);
  },
};
