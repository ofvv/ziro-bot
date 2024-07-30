const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { normalPrefix, dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)

module.exports = {
    name: '',
    category: 'Tickets',
    ownerOnly: false, // tva e zaduljitelno btw (ako imam cooldown ili bot/authorperms)
    cooldown: 60000, // kat cqlo she e dobre vsichko da se addva
    authorPermission: ["SEND_MESSAGES"],
    botPermission: ["MANAGE_CHANNELS"],
    description: 'Create a Ticket!',
    aliases: ['ticket'],
    usage: 'z!ticket',
    run: async (client, message, args, prefix) => {

      //if(message.author.id != "484701017015975936") return message.lineReplyNoMention("**This Command Is Currently In Development!**")

      //message.guild.channels.create('Ziro-Tickets', { type: 'category' })
      let category = message.guild.channels.cache.find(cat=> cat.name === 'Ziro-Tickets')
      if (!category) {
        return message.lineReplyNoMention(`**I Can't Find a Category Named \`Ziro-Tickets\`! Please Create One!**`)
      }
      const channel = await message.guild.channels.create(`${message.author.tag} Ticket`);
      channel.setParent(category);


        channel.updateOverwrite(message.guild.id, {
          SEND_MESSAGE: false,
          VIEW_CHANNEL: false,
        });
        channel.updateOverwrite(message.author, {
          SEND_MESSAGE: true,
          VIEW_CHANNEL: true,
        });
        const thx = new MessageEmbed()
        .setColor("#000001")
        .setDescription(`**<@${message.author.id}> Opened a Ticket!**`)
        //.setThumbnail(message.author.displayAvatarURL({size: 256, dynamic: true}))
        //.setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
        const reactionMessage = await channel.send(`**Powered By ${client.user.username}!\nIf The Reactions Don't Work That Means ${client.user.username} Is Offline!\nPlease Delete Your Channel Manually!**`, thx);

        try {
          await reactionMessage.react("🔒");
          await reactionMessage.react("⛔");
        } catch (err) {
          channel.send("**I Can't React!**");
          throw err;
        }

        const collector = reactionMessage.createReactionCollector(
          (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
          { dispose: true }
        );

        collector.on("collect", (reaction, user) => {
          switch (reaction.emoji.name) {
            case "🔒":
              channel.updateOverwrite(message.author, { SEND_MESSAGES: false }).catch(e => {
                return channel.send(`**I Don't Have Enough Perms!**`);
              });
              //channel.send(`**${channel} Has Been Locked!**`)
              break;
            case "⛔":
              setTimeout(() => channel.delete().catch(e => {
                return channel.send(`**I Don't Have Enough Perms!**`);
              }), 1000)
              //channel.send(`**Deleting ${channel} In 5 Seconds!**`)
              break;
          }
        });
        const em = new MessageEmbed()
        .setColor("#000001")
        .setDescription(`**<@${message.author.id}>'s Ticket: ${channel}!**`)
        //.setThumbnail(message.author.displayAvatarURL({size: 256, dynamic: true}))
        //.setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)

        message.channel
          .send(`**Go To Your Ticket!**`, em)
          .then((msg) => {
            setTimeout(() => msg.delete(), 7000);
            setTimeout(() => message.delete(), 3000);
          })
          .catch((err) => {
            throw err;
          });
  }}
