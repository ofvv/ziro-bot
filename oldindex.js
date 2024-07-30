const { Client, Collection } = require("discord.js");
const {normalPrefix, token, dbLink, normalPrefix2 } = require("./config.json");
const discord = require("discord.js");
/*discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android" */
const moment = require("moment");
const sourcebin = require('sourcebin_js');
const ms = require("ms")
const ascii = require("ascii-table");
const { MessageEmbed } = require("discord.js");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
//const DBL = require("dblapi.js");

const client = new discord.Client({
  disableMentions: 'everyone'
  /*partials: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING', 'GUILD_MESSAGE_TYPING'],
  ws: { intents: discord.Intents.ALL } */
})


client.commands = new Collection();
client.aliases = new Collection();



["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.on("ready", () => {
  //console.log(`${client.user.tag} is now Online!`) //${client.user.tag} //${client.users.cache.size}
  client.user.setActivity(`Over ${client.guilds.cache.size} Servers | z!help`,{type: "LISTENING"})
  let table = new ascii(`Bot`);
  //table.setHeading(`Online ✔`)
  table.addRow('On', '✅ ');
  console.log(table.toString())
  //client.channels.cache.get('').send("Ziro-Bot Is Now Online After a Restart!")
}) /*(`To Over ${client.guilds.cache.size} Servers | z!help`,{type: "STREAMING",url:"https://www.twitch.tv/ziro22_"})
,{type: "LISTENING"} */

/*
dbl.on('posted', () => {
  console.log(`${client.user.tag}'s Top.gg Server Count Has Been Updated!`);
})

dbl.on('error', e => {
 console.log(`${e}`);
})
*/
/*setInterval(() => {
client.user.setActivity(`Over ${client.guilds.cache.size} Servers | z!help`,{type: "LISTENING"}) }, 3600000); */
/*
 client.on("message", async message => {


    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args, prefix);
}); */

client.on("message", async message => {

    let prefix = await db.get(`guild_prefix_${message.guild.id}`);
    if (prefix === null  | prefix === undefined) prefix = normalPrefix;

    if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
    const prefixembed = new MessageEmbed()
      .setDescription(`**My Prefix Is \`${prefix}\`, Use ${prefix}help To Get Started!**`)
      .setColor('#000001');
    message.lineReply(prefixembed);
    }

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix) && !message.content.startsWith(normalPrefix2)) return; //if (!message.content.startsWith(prefix) && !message.content.startsWith('ZT!')) return;

  //const blacklisted = db.get(`blacklist_${message.guild.id}`);
/*
	if (blacklisted === 'true') {
		message.guild.leave();
	} else {*/

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let cmdx = await db.get(`ziro_cmd_${message.guild.id}`)

        if(cmdx) {
          let cmdy = cmdx.find(x => x.name === cmd)
          if(cmdy) message.lineReply(cmdy.responce)
          }

    let blacklisted = await db.get(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.lineReply("You Are Blacklisted!");

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args, prefix);

/*		const commandembed = new MessageEmbed()
			.setColor('#000001')
			.addField('User:', `\`\`\`fix\n${message.author.tag}\n\`\`\``)
			.addField('User ID:', `\`\`\`fix\n${message.author.id}\n\`\`\``)
			.addField('Command:', `\`\`\`fix\n${prefix}${cmd}\n\`\`\``)
      .addField(`Channel:`, `\`\`\`fix\n#${message.channel.name}\n\`\`\``)
      .addField(`Channel ID:`, `\`\`\`fix\n${message.channel.id}\n\`\`\``)
			.addField('Server Name:', `\`\`\`fix\n${message.guild.name}\n\`\`\``)
			.addField('Server ID:', `\`\`\`fix\n${message.guild.id}\n\`\`\``)
      .addField('Server Members:', `\`\`\`fix\n${message.guild.memberCount}\n\`\`\``)
      .addField('Server Roles:', `\`\`\`fix\n${message.guild.roles.cache.size}\n\`\`\``)
      .addField('Server Channels:', `\`\`\`fix\n${message.guild.channels.cache.size}\n\`\`\``)
      .setTimestamp()
      .setFooter(`${client.user.username} 2021 ©`, client.user.avatarURL);
		client.channels.cache.get('808825774520926248').send(commandembed);*/
});

client.on("guildCreate", guild => {

  client.user.setActivity(`Over ${client.guilds.cache.size} Servers | z!help`,{type: "LISTENING"})

  let embed = new MessageEmbed()
    .setColor("#000000")
    .setAuthor(`I Was Invited To: ${guild.name || "Glitched"}`, client.user.avatarURL)
    .addField("Members", guild.memberCount || "Glitched", true)
	  .addField("Roles", guild.roles.cache.size || "Glitched", true)
    .addField("ID", guild.id || "Glitched", true)
	  .addField("Boosts", guild.premiumSubscriptionCount || '0', true)
    .addField("Created At", guild.createdAt || 'Cannot Fetch', true)
    .setTimestamp()
    .setFooter(`${client.guilds.cache.size} Servers`, client.user.avatarURL);
  client.channels.cache.get('776074856348909578').send(embed)
});

client.on("guildDelete", guild => {

  client.user.setActivity(`Over ${client.guilds.cache.size} Servers | z!help`,{type: "LISTENING"})

  let embed = new MessageEmbed()
    .setColor("#000000")
    .setAuthor(`I Was Kicked From: ${guild.name || "Glictched"}`, client.user.avatarURL)
    .addField("Members", guild.memberCount || "Glitched", true)
	  .addField("Roles", guild.roles.cache.size || "Glitched", true)
    .addField("ID", guild.id || "Glitched", true)
	  .addField("Boosts", guild.premiumSubscriptionCount || '0', true)
    .addField("Created At", guild.createdAt || 'Cannot Fetch', true)
    .setTimestamp()
    .setFooter(`${client.guilds.cache.size} Servers`, client.user.avatarURL);
  client.channels.cache.get('776074912309444608').send(embed)
});

/*
const express = require('express');
const app = express();
app.get("/", (req, res) => {
  res.status(200).send(`Ziro-Bot Is Online!`);
});
app.listen(process.env.PORT || 3000);


const fetch = require('node-fetch')
setInterval(async () => {
await fetch('https://ziro.zirowastaken.repl.co').then()
}, 1000) */
client.login(process.env.TOKEN);
