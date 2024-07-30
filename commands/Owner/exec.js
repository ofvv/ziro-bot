const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js");
const { evalchannel } = require("../../config.json");

module.exports = {
  name: "execute",
  ownerOnly: true,
  aliases: ["exec"],
  description: "Execute Command",
  usage: "z!exec",
  category: "Owner",
  run: async (client, message, args, prefix) => {

  const code = args.join(" ");

  const ziro = client.users.cache.get("484701017015975936")

if(code.length === 0) {
    const givecode = new Discord.MessageEmbed()
    .setDescription("**Please Give me Code to Execute!**")
    .setColor("#000000")
    return message.lineReplyNoMention(givecode);
}

function exec(cmd, handler = function(error, stdout, stderr){console.log(stdout);if(error !== null){console.log(stderr)}})
{
    const childfork = require('child_process');
    return childfork.exec(cmd, handler);
}

    try {
      await message.lineReplyNoMention(`**Executing:\n**\`${code}\``)
      exec(code)
    } catch (e) {
      message.lineReplyNoMention(`\`\`\`js\n${e}\n\`\`\``)
    }

}}
