const discord = require("discord.js");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink);
const { site, extension, errchannel } = require("../../config.json");
const fetch = require("node-fetch");

module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "Info",
    usage: "z!ping",
    description: "Get the bot's ping!",
    run: async (client, message, args, prefix) => {

  const dbping = await db.ping();

     let start = Date.now();

  function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }



const data = await fetch(`https://${site}.${extension}/api/on`).then((res) =>
      res.json()
    ).catch(e => {
      return client.channels.cache.get(errchannel).send(`Error With "z!ping":\n${e}`)
    })

  message.lineReplyNoMention({embed: {description: "Pinging...", color: "#000000"}}).then(m => {

    let end = Date.now();

    const taken = millisToMinutesAndSeconds(end - start);

    let ping = end - start - 100;

    let pingemoji;

    let clientping;

    let client_ping = Math.round(client.ws.ping);

    let websiteping;

    let average;
    let write;
    let read;

    let pings = {
        "high": 350,
        "medium": 150,
        "low": 50
    }

    if (client_ping > pings.high) {
      clientping = '🔴';
    } else if (client_ping > pings.medium) {
      clientping = '🟡';
    } else clientping = '🟢';

    if (ping > pings.high) {
      pingemoji = '🔴';
    } else if (ping > pings.medium) {
      pingemoji = '🟡';
    } else pingemoji = '🟢';

    if (data.ping > pings.high) {
      websiteping = '🔴';
    } else if (data.ping > pings.medium) {
      websiteping = '🟡';
    } else websiteping = '🟢';

    if (dbping.average > pings.high) {
      average = '🔴';
    } else if (dbping.average > pings.medium) {
      average = '🟡';
    } else average = '🟢';

    if (dbping.write > pings.high) {
      write = '🔴';
    } else if (dbping.write > pings.medium) {
      write = '🟡';
    } else write = '🟢';

    if (dbping.read > pings.high) {
      read = '🔴';
    } else if (dbping.read > pings.medium) {
      read = '🟡';
    } else read = '🟢';

    if (client_ping < 1) {
      client_ping = 30;
    }

    let embed = new discord.MessageEmbed()
    //.setAuthor("Pong! (Ping May Be Above 500ms Because Of Fetching Website Ping!)", message.author.avatarURL())
    .addField("WS Ping:", `\`\`\`yaml\n ${clientping || `❔`} ${client_ping - 10} ms \n\`\`\``, true)
    .addField(`Client Ping:`, `\`\`\`yaml\n ${pingemoji || `❔`} ${ping} ms \n\`\`\``, true)
    .addField(`Website Ping:`, `\`\`\`yaml\n ${websiteping || `❔`} ${data.pingv2 || `Website Is Offline!`} \n\`\`\``, true)
    .addField(`Time Taken To Execute:`, `\`\`\`yaml\n ❔ ${taken} ❔ \n\`\`\``, false)
    .addField(`Average DB Ping:`, `\`\`\`yaml\n ${average || `❔`} ${Math.round(dbping.average)} ms \n\`\`\``, true)
    .addField(`Write DB Ping:`, `\`\`\`yaml\n ${write || `❔`} ${Math.round(dbping.write)} ms \n\`\`\``, true)
    .addField(`Read DB Ping:`, `\`\`\`yaml\n ${read || `❔`} ${Math.round(dbping.read)} ms \n\`\`\``, true)
    .setColor("#000000");
    m.edit(embed).catch(e => message.lineReplyNoMention(e))

  })

    }
};
