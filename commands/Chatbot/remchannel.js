const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink);

module.exports = {
    name: "disablechannel",
    aliases: ["removechatbot"],
    category: "Chatbot",
    usage: "z!removechatbot",
    description: "Ziro-ChatBot",
    run: async (client, message, args, prefix) => {

              if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: {
                  color: "#000001",
                  description: `**You Need Manage Guild/Administrator Permissions To Use This Command!**`
              }})
          try {
              let a = db.fetch(`chatbot_${message.guild.id}`)

              if (!a) {
                  return message.channel.send({embed: {
                  color: "#000001",
                  description:  `**No Channel To Disable!**`
              }})
              } else {
                  let channel = message.guild.channels.cache.get(a)
                  db.delete(`chatbot_${message.guild.id}`)

                  message.channel.send({embed: {
                  color: "#000001",
                  description: `**Success!**`
              }})
              }
              return;
          } catch (err) {
              return message.channel.send(`**${err}**`)
          }

    }}
