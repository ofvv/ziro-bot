const {
  Client,
  Collection
} = require("discord.js");
const {
  normalPrefix,
  token,
  dbLink,
  normalPrefix2,
  owner,
  evalchannel
} = require("./config.json");
const discord = require("discord.js");
const Discord = require("discord.js")
discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android"
const moment = require("moment");
const sourcebin = require('sourcebin_js');
const ms = require("ms")
const ascii = require("ascii-table");
const {
  MessageEmbed
} = require("discord.js");
const Messages = require("discord-messages");
Messages.setURL(dbLink)
const fetch = require("node-fetch")

require('discord-reply');

const {
  Database
} = require('quickmongo');
const db = new Database(dbLink)

const jsonDatabase = require("easy-json-database");
const jsondb = new jsonDatabase("./jsondb.json", {
  snapshots: {
    enabled: false,
    interval: 24 * 60 * 60 * 1000,
    folder: './jsondbbackups/'
  }
});

/*
const replDatabase = require("@replit/database")
const repldb = new replDatabase()
*/

const client = new discord.Client({
  disableMentions: 'everyone'
})
//require('discord-buttons')(client);


//<------Custom Client------>
//require("./customclient/buttons.js")(client);
//require("./customclient/reply.js")
//<------Custom Client------>


client.commands = new Collection();
client.aliases = new Collection();
client.slashcommands = new Collection();
client.sleep = async function(ms) {
  if (!ms) ms = 1;
  return new Promise(async resolve => setTimeout(resolve, ms));
};
client.randomHex = Math.floor(Math.random() * 16777215).toString(16);
client.codeblock = async function(code, language) {
  if (!language) language = 'yaml';
  if (!code) return `No Code Provided!`;
  return `\`\`\`${language}\n${code}\n\`\`\``;
};
client.formatms = async function(ms) {
  const sec = Math.floor((ms / 1000) % 60).toString();
  const min = Math.floor((ms / (1000 * 60)) % 60).toString();
  const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
  const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
  return `${days.padStart(1, "0")}d ${hrs.padStart(2, "0")}h ${min.padStart(2, "0")}m ${sec.padStart(2, "0")}s`;
};
client.randomArray = async function(array) {
  if (!array) array = [];
  return array[Math.floor(Math.random() * array.length)];
};
client.trimArray = async function(arr, maxlen) {
  if (!arr) arr = [];
  if (!maxlen) maxlen = 20;
  if (arr.length > maxlen) {
    const len = arr.length - maxlen;
    arr = arr.slice(0, maxlen);
    arr.push(`And ${len} More...`);
  }
  return arr;
};


["command", "events", "slashcommands"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


db.on("ready", () => {
  let table = new ascii(`DB`);
  table.addRow('On', '✅ ');
  console.log(table.toString())
})

client.on("message", async message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  const chatbot = await db.get(`chatbot_${message.guild.id}`)
  if (message.channel.id === chatbot) {
    fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`).then(response => response.json()).then(data => {
      const embed = new MessageEmbed()
        .setDescription(`**${data.response || "Can't Fetch"}**`)
        .setColor(`#000001`)
      message.lineReplyNoMention(embed)
    }).catch(e => {})
  }
})

//<-----------------UNUSED----------------->
client.login("").catch(e => {
  let table = new ascii(`/`);
  table.addRow('Token', '❌ ');
  console.log(table.toString())
});
