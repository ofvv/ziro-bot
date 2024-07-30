const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const Messages = require("discord-messages");
const api = require("blueapi.js");

module.exports = {
    name: "leaderboard",
    aliases: ["levels", 'lb'],
    ownerOnly: false,
    cooldown: 1000,
    category: "Messages",
    usage: "z!leaderboard",
    description: "Check The Leaderboard For Messages!",
    run: async (client, message, args, prefix) => {
      let enabled = await db.get(`messages_start_${message.guild.id}`)
      if (!enabled) {
        return message.lineReplyNoMention(`**Im Not Collecting Messages! Please Enable It By Typing ${prefix}start**`)
      }
const rawLeaderboard = await Messages.fetchLeaderboard(message.guild.id, 10);

if (rawLeaderboard.length < 1) return message.lineReplyNoMention("**I Can't Find Any Data For This Server Yet!**");

const leaderboard = await Messages.computeLeaderboard(client, rawLeaderboard, true);

const lb = leaderboard.map(e => `**${e.position}. ${e.username}#${e.discriminator}'s Messages:** \`${e.messages}\``);

//message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
const levelsem = new MessageEmbed()
.setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
.setColor(`#000001`)
.setThumbnail(message.guild.iconURL())
.setDescription(`**Leaderboard (Top 10)**:\n${lb.join("\n")}`)
message.lineReplyNoMention(`**${message.guild.name}'s Leaderboard**`, levelsem)
    }
  }
