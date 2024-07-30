const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const Messages = require("discord-messages");
const { createCanvas, loadImage, registerFont } = require('canvas')
const api = require("blueapi.js");
//registerFont('BebasNeue-Regular_real.ttf', { family: 'BebasNeue-Regular' })
registerFont('ziro.ttf', { family: 'Ziro-Bot' })
module.exports = {
    name: "messages",
    aliases: ["msgs"],
    ownerOnly: false,
    cooldown: 1000,
    category: "Messages",
    usage: "z!msgs <user>",
    description: "Show The Messages That a User Has!",
    run: async (client, message, args, prefix) => {
      let sizeX = 626;
      let sizeY = 313;
      const canvas = createCanvas(750, 250)
      const ctx = canvas.getContext('2d')
      ctx.font = "38px Roboto"
      const target = message.mentions.users.first() || message.author;

      const user = await Messages.fetch(target.id, message.guild.id);

      let enabled = await db.get(`messages_start_${message.guild.id}`)
      if (!enabled) {
        return message.lineReplyNoMention(`**Im Not Collecting Messages! Please Enable It By Typing ${prefix}start**`)
      }

      if (!user) return message.lineReplyNoMention("**I Can't Find Any Data For This User!**");

      const avatar = await loadImage(await api.image.circle(target.displayAvatarURL({ format: 'png' })));
      let targetname = target.username > 6 ? `${target.username.substring(0, 6)}` : target.username;
      let textmessage = `${targetname}#${target.discriminator}'s Messages:`
      let text2 = `${user.data.messages}`

      loadImage('https://cdn.discordapp.com/attachments/805837103464054815/822747067834957824/v462-n-130-textureidea_1.jpg').then((image) => {
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      	      let avatarSizeX = Math.floor(sizeX / 5.5),
      	    	avatarSizeY = Math.floor(sizeY / 2.5),
      	    	avatarX = Math.floor(sizeX / 2) - Math.floor(avatarSizeX / 2),
      	    	avatarY = Math.floor(sizeY / 6.7),
      	    	circleOffset = 0;
              ctx.drawImage(avatar, 10, 20, 220, 220);
              ctx.fillStyle = "white";
             ctx.fillText(textmessage, 250, 85)
             ctx.fillText(text2, 450, 135)

            	ctx.beginPath();
            		ctx.strokeStyle = "white";
            		ctx.lineWidth = 7;
            		ctx.arc(122, 130, 110, 0, Math.PI * 2, true);
            		ctx.stroke();
            	ctx.closePath();

            	ctx.beginPath();
            		ctx.arc(122, 130, 110, 0, Math.PI * 2, true);
            	ctx.closePath();
              const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png')
              message.lineReplyNoMention(`> **${target.tag} Has ${user.data.messages} Message(s)!**`, attachment)
      })
    }
  }
