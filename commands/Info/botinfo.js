const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const os = require("os");
const { site, extension, errchannel } = require("../../config.json");
const ms = require("ms");
const moment = require("moment");
const pidusage = require("pidusage");
const { dbLink } = require("../../config.json");
const fetch = require("node-fetch");
const { Database } = require('quickmongo');
const db = new Database(dbLink);
const { readdirSync, readFileSync } = require("fs")
const path = require("path")

module.exports = {
    name: "botinfo",
    ownerOnly: false,
    aliases: ["Botinfo", "BotInfo", "info", "Bot", "bot"],
    category: "Info",
    usage: "z!botInfo",
    exmaple: "z!botinfo",
    description: `Information About The Bot`,
    run: async (client, message, args, prefix) => {

var totalMembers = 0;
client.guilds.cache.forEach(guild => {
    var x = parseInt(guild.memberCount);
    totalMembers = totalMembers + x;
})

var totalChannels = 0;
client.guilds.cache.forEach(guild => {
    var x = parseInt(guild.channels.cache.size);
    totalChannels = totalChannels + x;
})

if(totalMembers == 'NaN'){
  totalMembers = `Can't Fetch`;
}

if(totalMembers == 'null'){
  totalMembers = `Can't Fetch`;
}

if(totalMembers == 'undefined'){
  totalMembers = `Can't Fetch`;
}

const dbping = await db.ping();

const core = os.cpus()[0];

const arch = os.arch()

const type = os.type()

const osver = os.version()

const used = process.memoryUsage().heapUsed / 1024 / 1024;

const stats = await pidusage(process.pid);

  function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

	function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (1000 * 60)) % 60).toString();
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
      const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
      return `${days.padStart(1, "0")}d ${hrs.padStart(2, "0")}h ${min.padStart(2, "0")}m ${sec.padStart(2, "0")}s`;
    }

  function formatBytes(bytes) {
      if (bytes === 0) return "0 Bytes";
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))}`; //`${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
    }
    const data = await fetch(`https://${site}.${extension}/api/on`).then((res) =>
      res.json()
    ).catch(e => {
      return client.channels.cache.get(errchannel).send(`Error With "z!botinfo":\n${e}`)
    })

    const data2 = await fetch(`https://${site}.${extension}/endpoints`).then((res) =>
      res.json()
    ).catch(e => {
      return client.channels.cache.get(errchannel).send(`Error With "z!botinfo":\n${e}`)
    })

let length = 0;
readdirSync(path.join(__dirname, '../../', 'commands')).forEach(dir => {
    let commands = readdirSync(path.join(__dirname, '../../', 'commands', dir, '/')).filter(x => x.endsWith('.js')).forEach(file => {
      length = length + readFileSync(`./commands/${dir}/${file}`).toString().split("\n").length;
    });
  })

 message.lineReplyNoMention("**Fetching...**").then(async m => {
  client.users.fetch('484701017015975936')
  const ziro = client.users.cache.get("484701017015975936")
  let ping = m.createdTimestamp - message.createdTimestamp - 900
  const taken = millisToMinutesAndSeconds(ping);

   const embed = new MessageEmbed()
	.setColor('#000001')
	//.setTitle(`**${client.user.tag} Info**`)
	.setThumbnail(client.user.displayAvatarURL())
  //.setTitle(`Here Is All The Info About ${client.user.username}`)
	.addField('Developer/Owner:', `\`\`\`yaml\n${ziro ? ziro.tag : 'Ziro제로#9200'}\n\`\`\``) //${ziro.tag}
	.addField('WS Ping:', `\`\`\`yaml\n${Math.round(client.ws.ping)}ms\n\`\`\``, true)
  .addField("Client Ping:", `\`\`\`yaml\n${ping}ms\n\`\`\``, true)
  .addField('Library:', `\`\`\`yaml\nDiscord.js v${require("discord.js").version.toString()}\n\`\`\``, false)
  .addField(`Average DB Ping:`, `\`\`\`yaml\n${dbping.average}ms\n\`\`\``, true)
  .addField(`Read DB Ping:`, `\`\`\`yaml\n${dbping.read}ms\n\`\`\``, true)
  .addField(`Write DB Ping:`, `\`\`\`yaml\n${dbping.write}ms\n\`\`\``, true)
  .addField(`Total Servers:`, `\`\`\`yaml\n${client.guilds.cache.size}\n\`\`\``, true) //`\`\`\`yaml\n\n\`\`\``
  .addField(`Total Users:`, `\`\`\`yaml\n${totalMembers || `Can't Fetch`}\n\`\`\``, true)
  .addField(`Total Channels:`, `\`\`\`yaml\n${totalChannels}\n\`\`\``, true)
  .addField(`Total Commands:`, `\`\`\`yaml\n${client.commands.size}\n\`\`\``, true)
  .addField(`Total Lines:`, `\`\`\`yaml\n${length}\n\`\`\``, true)
  .addField(`Total Shards:`, `\`\`\`yaml\n${client.ws.totalShards}\n\`\`\``, true)
	.addField(`Bot Uptime:`, `\`\`\`yaml\n${duration(client.uptime)}\n\`\`\``, true)
  .addField(`Total Ram:`, `\`\`\`yaml\n${Math.floor(os.totalmem()/10000000)/100} GB\n\`\`\``, true)
  .addField(`Used Ram:`, `\`\`\`yaml\n${Math.floor(os.freemem()/10000000)/100} GB\n\`\`\``, true)
  .addField(`Processor:`, `\`\`\`yaml\n${core.model}\n\`\`\``)
  .addField(`Processor Cores:`, `\`\`\`yaml\n${os.cpus().length}\n\`\`\``, true)
  .addField(`Processor Usage:`, `\`\`\`yaml\n${Math.floor(stats.cpu*100)/100}%\n\`\`\``, true)
  .addField(`Processor Speed:`, `\`\`\`yaml\n${core.speed}MHz\n\`\`\``, true)
  .addField(`Runtime:`, `\`\`\`yaml\nNode.js ${process.version} | Used Ram: ${Math.round(used * 100) / 100} MB\n\`\`\``, false)
  //.addField(`Total Storage:`, `\`\`\`yaml\n${formatBytes(process.memoryUsage().heapTotal)}\n\`\`\``, true)
  .addField(`Storage:`, `\`\`\`yaml\n${formatBytes(process.memoryUsage().heapUsed)}/${formatBytes(process.memoryUsage().heapTotal)}MB\n\`\`\``, true)
  .addField(`Platform:`, `\`\`\`yaml\n${process.platform}.${arch}\n\`\`\``, true)
  .addField(`Platform Uptime:`, `\`\`\`yaml\n${ms(os.uptime() * 1000, { long: true })}\n\`\`\``, true)
  //.addField(`Website:`, `[Online](https://zirobot.tk/)`, true)
  .addField(`More Info:`, `\`\`\`autohotkey\nWebsite: ${data.website || `Offline`} | Website Uptime: ${data.uptime || `Offline`}\nWebsite Ping: ${data.ping || `The Site Is Offline!`}\nOS Verison: ${osver}\n\`\`\``, false)
  //.setImage(`https://raw.githubusercontent.com/ZiroCore/ZiroCore/main/Images/ziro_banner_by_yurei.gif`)
	.setFooter(`${client.user.username} ${new Date().getFullYear()} © | Created At: ${moment(client.user.createdTimestamp).format('LT')} ${moment(client.user.createdTimestamp).format('LL')} | Time Taken To Execute: ${taken}`); /*(${moment(client.user.createdTimestamp).fromNow()})*/

  //message.lineReplyNoMention(embed);
  m.edit(`\`\`\`yaml\nInfo About: ${client.user.username} (Ping May Be Above 500ms Because Of Fetching Website Info!)\n\`\`\``, embed)
  const embed2 = new MessageEmbed()
  .setColor('#000001')
  .setDescription(`**[API Endpoints](https://${site}.${extension}/endpoints)**`)
	.addField(`Endpoints:`, `\`\`\`yaml\n${site + "." + extension + data2.endpoints.join(`\n${site}.${extension}`)}\n\`\`\``)
  await m.react("⬅");
  await m.react("❌");
  await m.react("➡");
  const filter = (reaction, user) => ['⬅', '❌', '➡'].includes(reaction.emoji.name) && (message.author.id === user.id);
                 const collector = m.createReactionCollector(filter);

                 collector.on('collect', async (reaction, user) => {
                     try {
                         if (reaction.emoji.name === '➡') {
                             m.edit(embed2);
                         } else if (reaction.emoji.name === '⬅') {
                             m.edit(embed);
                         } else {
                             collector.stop();
                             m.delete().catch(() => {})
                             message.delete().catch(() => {})
                         }
                         await reaction.users.remove(message.author.id);
                     } catch {
                         const mssg = await m.lineReplyNoMention("**I Need - `ADD_REACTIONS`, `MANAGE_MESSAGES` To Work!**");
                         setTimeout(() => mssg.delete(), 5000)
                     }
                 })
 });

 }
 }

/*
const embed = new MessageEmbed()
.setColor('#000001')
//.setTitle(`**${client.user.tag} Info**`)
.setThumbnail(client.user.displayAvatarURL())
.addField('Developer/Owner:', `\`\`\`yaml\n${ziro.tag}\n\`\`\``)
.addField('API Ping:', `\`\`\`yaml\n${Math.round(client.ws.ping)}ms\n\`\`\``, true)
.addField("Client Ping:", `\`\`\`yaml\n${ping}ms\n\`\`\``, true)
.addField('Library:', `\`\`\`yaml\nDiscord.js v${require("discord.js").version.toString()}\n\`\`\``, true)
.addField(`Total Servers:`, `\`\`\`yaml\n${client.guilds.cache.size}\n\`\`\``, true) //`\`\`\`yaml\n\n\`\`\``
.addField(`Total Users:`, `\`\`\`yaml\n${totalMembers}\n\`\`\``, true)
.addField(`Total Channels:`, `\`\`\`yaml\n${totalChannels}\n\`\`\``, true)
.addField(`Total Commands:`, `\`\`\`yaml\n${client.commands.size}\n\`\`\``, true)
.addField(`Total Shards:`, `\`\`\`yaml\n${client.ws.totalShards}\n\`\`\``, true)
.addField(`Total Prefixes:`, `\`\`\`yaml\n2\n\`\`\``, true)
.addField(`Bot Uptime:`, `\`\`\`yaml\n${duration(client.uptime)}\n\`\`\``, true)
.addField(`Total Ram:`, `\`\`\`yaml\n${Math.floor(os.totalmem()/10000000)/100} GB\n\`\`\``, true)
.addField(`Used Ram:`, `\`\`\`yaml\n${Math.floor(os.freemem()/10000000)/100} GB\n\`\`\``, true)
.addField(`Processor:`, `\`\`\`yaml\n${core.model}\n\`\`\``)
.addField(`Processor Cores:`, `\`\`\`yaml\n${os.cpus().length}\n\`\`\``, true)
.addField(`Processor Usage:`, `\`\`\`yaml\n${Math.floor(stats.cpu*100)/100}%\n\`\`\``, true)
.addField(`Processor Speed:`, `\`\`\`yaml\n${core.speed}MHz\n\`\`\``, true)
.addField(`Runtime:`, `\`\`\`yaml\nNode.js ${process.version}\n\`\`\``, true)
.addField(`Total Storage:`, `\`\`\`yaml\n${formatBytes(process.memoryUsage().heapTotal)}\n\`\`\``, true)
.addField(`Used Storage:`, `\`\`\`yaml\n${formatBytes(process.memoryUsage().heapUsed)}\n\`\`\``, true)
.addField(`Platform:`, `\`\`\`yaml\n${process.platform}\n\`\`\``, true)
.addField(`Platform Uptime:`, `\`\`\`yaml\n${ms(os.uptime() * 1000, { long: true })}\n\`\`\``, true)
.addField(`Website:`, `[Online](https://zirobot.tk/)`, true)
//.setTimestamp()
.setFooter(`${client.user.username} ${new Date().getFullYear()} © | Created At: ${moment(client.user.createdTimestamp).format('LT')} ${moment(client.user.createdTimestamp).format('LL')} (${moment(client.user.createdTimestamp).fromNow()})`);
*/

/*
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const os = require("os");
const ms = require("ms");
const pidusage = require("pidusage");

module.exports = {
    name: "botinfo",
    aliases: ["Botinfo", "BotInfo", "info", "Bot", "bot"],
    category: "Info",
    usage: "z!botInfo",
    exmaple: "z!botinfo",
    description: `Information About The Bot`,
    run: async (client, message, args, prefix) => {

var totalMembers = 0;
client.guilds.cache.forEach(guild => {
    var x = parseInt(guild.memberCount);
    totalMembers = totalMembers + x;
})

var totalChannels = 0;
client.guilds.cache.forEach(guild => {
    var x = parseInt(guild.channels.cache.size);
    totalChannels = totalChannels + x;
})

const core = os.cpus()[0];

const stats = await pidusage(process.pid);

	function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (1000 * 60)) % 60).toString();
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
      const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
      return `\`${days.padStart(1, "0")}d\` \`${hrs.padStart(2, "0")}h\` \`${min.padStart(2, "0")}m\` \`${sec.padStart(2, "0")}s\``;
    }
 message.lineReplyNoMention("Fetching...").then(m => {
  const ziro = client.users.cache.get("484701017015975936")
  let ping = m.createdTimestamp - message.createdTimestamp

   const embed = new MessageEmbed()
	.setColor('#000001')
	//.setTitle(`**${client.user.tag} Info**`)
	.setThumbnail(client.user.displayAvatarURL())
	.addField('Developer/Owner:', `${ziro.tag}`)
	.addField('API Ping:', Math.round(client.ws.ping) + "ms", true)
  .addField("Client Ping:", `${ping}ms`, true)
	.addField('Library:', `Discord.js v${require("discord.js").version.toString()}`, true)
  .addField(`Total Servers:`, `${client.guilds.cache.size}`, true)
  .addField(`Total Users:`, `${totalMembers}`, true)
  .addField(`Total Channels:`, `${totalChannels}`, true)
  .addField(`Total Commands:`, `${client.commands.size}`, true)
  .addField(`Total Shards:`, `${client.ws.totalShards}`, true)
  .addField(`Total Prefixes:`, `2`, true)
	.addField(`Uptime:`, `${duration(client.uptime)}`, true)
  .addField(`Total Ram:`, `${Math.floor(os.totalmem()/10000000)/100} GB`, true)
  .addField(`Used Ram:`, `${Math.floor(os.freemem()/10000000)/100} GB`, true)
  .addField(`Processor:`, `${core.model}`, true)
  .addField(`Usage:`, `${Math.floor(stats.cpu*100)/100}%`, true)
  .addField(`Website:`, `[Online](https://zirobot.tk/)`, true)
	.setTimestamp()
	.setFooter(`${client.user.username} ${new Date().getFullYear()} ©`);

  //message.lineReplyNoMention(embed);
  m.edit('', embed)
 });

 }
 }
*/

/*
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const os = require("os");
const ms = require("ms");
const pidusage = require("pidusage");

module.exports = {
    name: "botinfo",
    aliases: ["Botinfo", "BotInfo", "info", "Bot", "bot"],
    category: "Info",
    usage: "z!botInfo",
    exmaple: "z!botinfo",
    description: `Information About The Bot`,
    run: async (client, message, args, prefix) => {

var totalMembers = 0;
client.guilds.cache.forEach(guild => {
    var x = parseInt(guild.memberCount);
    totalMembers = totalMembers + x;
})

var totalChannels = 0;
client.guilds.cache.forEach(guild => {
    var x = parseInt(guild.channels.cache.size);
    totalChannels = totalChannels + x;
})

const core = os.cpus()[0];

const stats = await pidusage(process.pid);

	function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (1000 * 60)) % 60).toString();
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
      const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
      return `${days.padStart(1, "0")}d ${hrs.padStart(2, "0")}h ${min.padStart(2, "0")}m ${sec.padStart(2, "0")}s`;
    }
 message.lineReplyNoMention("Fetching...").then(m => {
  const ziro = client.users.cache.get("484701017015975936")
  let ping = m.createdTimestamp - message.createdTimestamp

   const embed = new MessageEmbed()
	.setColor('#000001')
	//.setTitle(`**${client.user.tag} Info**`)
	.setThumbnail(client.user.displayAvatarURL())
	.addField('Developer/Owner:', "```" + ziro.tag + "```")
	.addField('API Ping:', "```" + Math.round(client.ws.ping) + "ms```", true)
  .addField("Client Ping:", "```" + ping + "ms```", true)
	.addField('Library:', "```Discord.js v" + require("discord.js").version.toString() + "```", true)
  .addField(`Total Servers:`, "```" + client.guilds.cache.size + "```", true)
  .addField(`Total Users:`, "```" + totalMembers + "```", true)
  .addField(`Total Channels:`, "```" + totalChannels + "```", true)
  .addField(`Total Commands:`, "```" + client.commands.size + "```", true)
  .addField(`Total Shards:`, "```" + client.ws.totalShards + "```", true)
  .addField(`Total Prefixes:`, "```2```", true)
	.addField(`Uptime:`, "```" + duration(client.uptime) + "```", true)
  .addField(`Total Ram:`, "```" + Math.floor(os.totalmem()/10000000)/100 + "GB```", true)
  .addField(`Used Ram:`, "```" + Math.floor(os.freemem()/10000000)/100 + "GB```", true)
  .addField(`Processor:`, "```" + core.model + "```", true)
  .addField(`Usage:`, "```" + Math.floor(stats.cpu*100)/100 + "%```", true)
  .addField(`Website:`, `[Online](https://zirobot.tk/)`, true)
	.setTimestamp()
	.setFooter(`${client.user.username} ${new Date().getFullYear()} ©`);

  //message.lineReplyNoMention(embed);
  m.edit('', embed)
 });

 }
 }
 */
