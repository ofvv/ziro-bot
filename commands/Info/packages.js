/*
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const ascii = require("ascii-table");
const axios = require("axios");
const dblapi = require("dblapi.js");
const figlet = require("figlet");
const fs = require("fs");
const moment = require("moment");
const ms = require("ms");
const request = require("request");
const fetch = require("node-fetch");
const quickmongo = require("quickmongo");
const sourcebin_js = require("sourcebin_js");
const twemoji = require("twemoji-parser");
const weather = require("weather-js");
const os = require("os");
const pidusage = require("pidusage");

module.exports = {
    name: "packages",
    aliases: ["packagesinfo", "packageinfo"],
    category: "Info",
    usage: "z!packages",
    exmaple: "z!packages",
    description: `Ziro-Bot Uses These Packages`,
    run: async (client, message, args, prefix) => {
      const embed = new MessageEmbed()
      .setColor('#000001')
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`${client.user.username} Uses These Packages:`)
      .addField('ascii-table:', `\`\`\`yaml\nv${require("ascii-table").version.toString()}\n\`\`\``, true)
      .addField('axios:', `\`\`\`yaml\nv${require("axios").version.toString()}\n\`\`\``, true)
      .addField('dblapi.js:', `\`\`\`yaml\nv${require("dblapi.js").version.toString()}\n\`\`\``, true)
      .addField('discord.js:', `\`\`\`yaml\n v${require("discord.js").version.toString()}\n\`\`\``, true)
      .addField('figlet:', `\`\`\`yaml\nv${require("figlet").version.toString()}\n\`\`\``, true)
      .addField('fs:', `\`\`\`yaml\n v${require("fs").version.toString()}\n\`\`\``, true)
      .addField('moment:', `\`\`\`yaml\n v${require("moment").version.toString()}\n\`\`\``, true)
      .addField('ms:', `\`\`\`yaml\n v${require("ms").version.toString()}\n\`\`\``, true)
      .addField('request:', `\`\`\`yaml\n v${require("request").version.toString()}\n\`\`\``, true)
      .addField('node-fetch:', `\`\`\`yaml\n v${require("node-fetch").version.toString()}\n\`\`\``, true)
      .addField('quickmongo:', `\`\`\`yaml\n v${require("quickmongo").version.toString()}\n\`\`\``, true)
      .addField('sourcebin_js:', `\`\`\`yaml\n v${require("sourcebin_js").version.toString()}\n\`\`\``, true)
      .addField('twemoji-parser:', `\`\`\`yaml\n v${require("twemoji-parser").version.toString()}\n\`\`\``, true)
      .addField('weather-js:', `\`\`\`yaml\n v${require("weather-js").version.toString()}\n\`\`\``, true)
      .addField('os:', `\`\`\`yaml\n v${require("os").version.toString()}\n\`\`\``, true)
      .addField('pidusage:', `\`\`\`yaml\n v${require("pidusage").version.toString()}\n\`\`\``, true)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
    }
  }
*/
