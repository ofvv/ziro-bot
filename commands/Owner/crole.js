const { readFileSync } = require("fs");
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const sourcebin = require("sourcebin_js");
const { site, extension, inviteurl } = require("../../config.json")

module.exports = {
  name: "cr",
  aliases: ["createrole", "crole"],
  ownerOnly: true,
  description: "CRole Command",
  usage: "z!crole",
  category: "Owner",
  run: async (client, message, args, prefix) => {
    if(!message.guild.me.hasPermission("MANAGE_ROLES") && !message.guild.me.hasPermission("ADMINISTRATOR")) {
   let embed = new discord.MessageEmbed()
   .setColor("#000001")
   .setDescripion(`**I Don't Have Enough Perms!**`);

   return message.lineReplyNoMention(embed);
 }
 let perms = args[0]
 let color = args[1]
 let rolename =  args.slice(2).join(" ")
 let permss = [
   "CREATE_INSTANT_INVITE",
   "KICK_MEMBERS",
   "BAN_MEMBERS",
   "ADMINISTRATOR",
   "MANAGE_CHANNELS",
   "MANAGE_GUILD",
   "ADD_REACTIONS",
   "VIEW_AUDIT_LOG",
   "PRIORITY_SPEAKER",
   "STREAM",
   "VIEW_CHANNEL",
   "SEND_TTS_MESSAGES",
   "MANAGE_MESSAGES",
   "EMBED_LINKS",
   "ATTACH_FILES",
   "READ_MESSAGE_HISTORY",
   "MENTION_EVERYONE",
   "USE_EXTERNAL_EMOJIS",
   "VIEW_GUILD_INSIGHTS",
   "CONNECT",
   "SPEAK",
   "MUTE_MEMBERS",
   "DEAFEN_MEMBERS",
   "MOVE_MEMBERS",
   "USE_VAD",
   "CHANGE_NICKNAME",
   "MANAGE_NICKNAMES",
   "MANAGE_ROLES",
   "MANAGE_WEBHOOKS",
   "MANAGE_EMOJIS",
   "USE_SLASH_COMMANDS",
   "REQUEST_TO_SPEAK"
 ]
 if (!perms) {
   return message.lineReplyNoMention(`**Please Choose a Permission!\nCommand Example: ${prefix}cr ADMINISTRATOR #000001 Server Admin**`)
 }
 if (perms === 'SEND_MESSAGES') {
   return message.lineReplyNoMention(`**You Can't Choose SEND_MESSAGES As The Permission!**`)
 }
 if (!color) {
   return message.lineReplyNoMention(`**Please Choose a Color!\nCommand Example: ${prefix}cr ADMINISTRATOR #000001 Server Admin**`)
 }
 if (!color.startsWith('#')) {
    return message.lineReplyNoMention(`**Please Choose a Hex Code as The Color!\nCommand Example: ${prefix}cr ADMINISTRATOR #000001 Server Admin**`)
 }
 if (!rolename) {
   return message.lineReplyNoMention(`**Please Choose a Role Name!\nCommand Example: ${prefix}cr ADMINISTRATOR #000001 Server Admin**`)
 }
 if(!permss.includes(perms)) return message.lineReplyNoMention(`**Please Choose a Valid Permission!**`)
 message.guild.roles.create({ data: { name: rolename, permissions: [perms, 'SEND_MESSAGES'], color: color } }).then(role => {
   message.lineReplyNoMention(`**Role Name: \`${role.name}\`\nRole ID: \`${role.id}\`\nRole Perms: \`${perms} & SEND_MESSAGES\`\nRole Color: ${color}**`)
 })
 }}
