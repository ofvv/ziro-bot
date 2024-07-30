const discord = require("discord.js");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "shorturl",
    aliases: ["short"],
    category: "Utility",
    usage: "z!shorturl <url>",
    description: "short url command",
    run: async (client, message, args, prefix) => {


const url = args[0];
if(!url){
  return message.lineReplyNoMention("Please Provide a Valid Url");
}

const res = await fetch(`http://tinyurl.com/api-create.php?url=${encodeURI(url)}`); //https://is.gd/create.php?format=simple&url=${encodeURI(url)}
const body = await res.text();

if(body === "Please Provide a Valid Url"){
  return message.lineReplyNoMention("Please Provide a Valid Url");
}

const embed = new MessageEmbed()
  .setColor("#000000")
  .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
  .setTitle("Short Url:")
  .setDescription(body);
message.lineReplyNoMention(embed);

}}
