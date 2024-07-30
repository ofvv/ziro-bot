const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { createCanvas, loadImage } = require('canvas')
const api = require("blueapi.js");

module.exports = {
    name: 'animecouple',
    category: 'Images',
    ownerOnly: false,
    description: 'Anime Couple Command',
    aliases: ['animecouples'],
    usage: 'z!animecople <@user>',
    run: async (client, message, args, prefix) => {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
      const canvas = createCanvas(611, 344)
      const ctx = canvas.getContext('2d')
      ctx.font = '15px Impact'
      let pfp1 = await api.image.circle(message.member.user.displayAvatarURL({ format: "jpg" }));
      const userOne = await loadImage(pfp1)
      let url = message.mentions.users.first()
      url = url ? url.displayAvatarURL({ format: "jpg" }) : message.member.user.displayAvatarURL({ format: "jpg" });
      let pfp2 = await api.image.circle(url);
      const userTwo = await loadImage(pfp2)

loadImage('https://cdn.discordapp.com/attachments/805837103464054815/815678646298869810/Ryuuji-Taiga-cute-anime-couples-in-love-1.jpg').then((image) => {
        //ctx.drawImage(textmessage, 50, 0, 70, 70)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(userOne, 125, 30, 160, 160);
        ctx.drawImage(userTwo, 280, 35, 160, 160);
        //ctx.fillText(textmessage, 60, 130)
        //ctx.drawImage(av, 50, 0, 70, 70);
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'animecouple.png')
        message.lineReplyNoMention('**Here Is Your Couple Image!**', attachment)
})
}
}
