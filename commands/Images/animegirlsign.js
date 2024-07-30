const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas')
registerFont('impact.ttf', { family: 'Impact' })

module.exports = {
    name: 'animegirl',
    category: 'Images',
    description: 'Anime Girl Sign Command',
    aliases: ['animegirlsign'],
    usage: 'z!animegirl <text>',
    run: async (client, message, args, prefix) => {
      const textmessage =  args.join(" ");
      if(!textmessage) {
        return message.lineReplyNoMention(`**Please Give Me Some Text!**`)
      }
let maxlen = 12
   if(textmessage.length > 12) {
   return message.lineReplyNoMention(`**Please Provide a Text Under 12 Characters!**`)
}
      const canvas = createCanvas(200, 200)
      const ctx = canvas.getContext('2d')
      ctx.font = '15px Impact'
      //ctx.rotate(0.1)
      //ctx.fillText(textmessage, 50, 100)

loadImage('https://cdn.discordapp.com/attachments/805837103464054815/815626469925322752/anime-girl-holding-a-paper.jpg').then((image) => {
        //ctx.drawImage(textmessage, 50, 0, 70, 70)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.fillText(textmessage, 60, 130)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'animegirlsign.png')
        message.lineReplyNoMention('**Here Is Your Image!**', attachment)
})
}
}
