const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const moment = require("moment");

module.exports = {
    name: "yearprogress",
    aliases: ["year", "yearpercent"],
    category: "Info",
    usage: "z!year",
    description: `Year Completion Percentage`,
    run: async (client, message, args, prefix) => {
      const today = new Date();
      const start = new Date(today.getFullYear(), 0, 1);
      const end = new Date(today.getFullYear() + 1, 0, 1);
      const percent = Math.round((Math.abs(today - start) / Math.abs(end - start)) * 100);
      let year = moment(Date.now()).format('YYYY')
      return message.lineReplyNoMention(`**${year} Is ${percent}% Complete!**`);
    }
  }
