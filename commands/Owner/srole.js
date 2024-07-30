const { readFileSync } = require("fs");
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const sourcebin = require("sourcebin_js");
const { site, extension, inviteurl } = require("../../config.json")

module.exports = {
  name: "sr",
  aliases: ["selfrole", "srole"],
  ownerOnly: true,
  description: "SRole Command",
  usage: "z!srole",
  category: "Owner",
  run: async (client, message, args, prefix) => {
    if(!message.guild.me.hasPermission("MANAGE_ROLES") && !message.guild.me.hasPermission("ADMINISTRATOR")) {
   let embed = new discord.MessageEmbed()
   .setColor("#000001")
   .setDescripion(`**I Don't Have Enough Perms!**`);

   return message.lineReplyNoMention(embed);
 }

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.tag === args.join(" ")) || message.guild.members.cache.find(m => m.user.username === args.join(" "));
//let member = message.author;

 if(!member) {
   let embed = new discord.MessageEmbed()
   .setColor("#000001")
   .setDescription(`**Mention Somebody!**`);

   return message.lineReplyNoMention(embed);
 }

/* if(member.user.id === message.author.id) {
   let embed = new discord.MessageEmbed()
   .setColor("#000001")
   .setDescription(`${lang.no_self}${emojis.stupid}`);

   return message.lineReplyNoMention(embed);
 }*/

 let role = message.guild.roles.cache.find(r => r.name == args.slice(1).join(" ")) || message.guild.roles.cache.get(args.slice(1).join(" ")) || message.mentions.roles.first();

 if(!role) {
   let embed = new discord.MessageEmbed()
   .setColor("#000001")
   .setDescription(`**Choose a Role!**`);

   return message.lineReplyNoMention(embed);
 }

 let reason = args.slice(1).join(" ")
 if(!reason) reason = `**Role Has Been Given!**`;

 if(member.roles.cache.has(role.id)) {
   let embed = new discord.MessageEmbed()
   .setColor("#000001")
   .setDescription(`**You Already Have This Role!**`);

   return message.lineReplyNoMention(embed);
 }
/*
 if(!member.kickable) {
   let embed = new discord.MessageEmbed()
   .setColor("#000001")
   .setDescription(`**I Can't Add This Role!**`)

   return message.lineReplyNoMention(embed);
 } */

 let embed = new discord.MessageEmbed()
 .setColor("#000001")
 .setDescription(`**Done!**`);

 let m = await message.lineReplyNoMention(embed);

 member.roles.add(role.id).catch(e => {
   let emb = new discord.MessageEmbed()
   .setColor("#000001")
   .setDescription(`**An Error Has Occured**\n${e}`);

 if (m.editable) {
  m.edit('', emb)
 }

     })
 }}
