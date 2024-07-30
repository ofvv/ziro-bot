const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas')
registerFont('impact.ttf', { family: 'Impact' })

module.exports = {
    name: 'simpsonsign',
    category: 'Images',
    description: 'Simpson Sign Command',
    aliases: ['oldmansign'],
    usage: 'z!simpsonsign <text>',
    run: async (client, message, args, prefix) => {
      const textmessage =  args.join(" ");
      if(!textmessage) {
        return message.lineReplyNoMention(`**Please Give Me Some Text!**`)
      }
let maxlen = 22
   if(textmessage.length > 22) {
   return message.lineReplyNoMention(`**Please Provide a Text Under 22 Characters!**`)
}
      const canvas = createCanvas(300, 288)
      const ctx = canvas.getContext('2d')
      ctx.font = '20px Impact'
      //ctx.rotate(0.1)
      //ctx.fillText(textmessage, 50, 100)

loadImage('https://cdn.discordapp.com/attachments/805837103464054815/815699408955244544/old-man-simpson-holding-sign-meme-template.png').then((image) => {
        //ctx.drawImage(textmessage, 50, 0, 70, 70)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.fillText(textmessage, 6, 70)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'simpsonsign.png')
        message.lineReplyNoMention('**Here Is Your Image!**', attachment)
})
}
}
