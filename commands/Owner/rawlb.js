const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const Messages = require("discord-messages");
const api = require("blueapi.js");

module.exports = {
    name: "rawlb",
    aliases: ["rawlevels"],
    ownerOnly: true,
    cooldown: 1000,
    category: "Owner",
    usage: "z!rawlb id",
    description: "Dev Tools",
    run: async (client, message, args, prefix) => {
let id = args[0];
let top = args[1];
if (!id) {
  return message.lineReplyNoMention(`**Please Provide a Guild ID!**`)
}
const rawLeaderboard = await Messages.fetchLeaderboard(id, top || 25);

if (rawLeaderboard.length < 1) return message.lineReplyNoMention("**I Can't Find Any Data For This Server Yet!**");

const leaderboard = await Messages.computeLeaderboard(client, rawLeaderboard, true);

const lb = leaderboard.map(e => `**${e.position}. ${e.username}#${e.discriminator}'s Messages:** \`${e.messages}\``);

//message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
let guildname = client.guilds.cache.get(id);
message.lineReplyNoMention(`**${guildname}'s Leaderboard\nLeaderboard (Top ${top || 25})**:\n${lb.join("\n")}`).catch(e => {
  return message.lineReplyNoMention(`**An Error Has Occured!:\n**\`\`\`\n${e}\n\`\`\``)
})
    }
  }
