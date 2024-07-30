const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const discord = require("discord.js");

module.exports = {
  name: "mcserver",
  aliases: ["minsecraftserver", "mcserverinfo"],
  category: "Utility",
  description: "Minecraft Server Info Command",
  run: async (client, message, args, prefix) => {

    const ip = args[0];
    const noip = new MessageEmbed()
    .setDescription(`**Please Give a Minecraft Server IP!**`)
    .setColor(`#000001`)
    if (!ip) return message.lineReplyNoMention(noip);

    const response = await fetch(`https://api.mcsrvstat.us/2/${ip}`);
    const json = await response.json();

    const off = new MessageEmbed()
    .setDescription(`**Offline/Invalid Server/Cannot Fetch**`)
    .setColor(`#000001`)
    if (!json.online) return message.lineReplyNoMention(off);

    const embed = new MessageEmbed()
    .setColor("#000001")
    //.setTitle((json.hostname || ip) + " Information")
    .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${ip.toLowerCase()}`)
    .addField("IP:", `\`\`\`yaml\n${json.ip}\n\`\`\`` || `\`\`\`yaml\nCannot Fetch\n\`\`\``, true)
    .addField("Port:", `\`\`\`yaml\n${json.port}\n\`\`\`` || `\`\`\`yaml\n25565\n\`\`\``, true)
    .addField("Status:", `\`\`\`yaml\n${json.online}\n\`\`\`` ? `\`\`\`yaml\nOnline\n\`\`\`` : "Offline")
    .addField("Version:", `\`\`\`yaml\n${json.version}\n\`\`\`` || `\`\`\`yaml\nCannot Fetch\n\`\`\``)
    .addField("Players:", `\`\`\`yaml\n${json.players}\n\`\`\`` ? `\`\`\`yaml\n${json.players.online}\n\`\`\`` : `\`\`\`yaml\nCannot Fetch\n\`\`\``, true)
    .addField("Max Players:", `\`\`\`yaml\n${json.players}\n\`\`\`` ? `\`\`\`yaml\n${json.players.max}\n\`\`\`` : `\`\`\`yaml\nCannot Fetch\n\`\`\``, true)
    .setFooter(`${client.user.username} ${new Date().getFullYear()} © | ` + json.hostname + ``)
    .setTimestamp();

    let des = json.motd.clean.length > 100 ? json.motd.clean.slice(0, 100) : json.motd.clean

    if (json.motd && json.motd.clean && json.motd.clean.length > 1) embed.addField("Description:", `\`\`\`yaml\n${des}\n\`\`\``);

    return message.lineReplyNoMention(embed);
  }
};
