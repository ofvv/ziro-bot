const discord = require("discord.js")
const moment = require("moment")

module.exports = {
    name: "year",
    description: "Year Percentage!",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {

      const today = new Date();
      const start = new Date(today.getFullYear(), 0, 1);
      const end = new Date(today.getFullYear() + 1, 0, 1);
      const percent = Math.round((Math.abs(today - start) / Math.abs(end - start)) * 100);
      let year = moment(Date.now()).format('YYYY')

      sendmsg(`**${year} Is ${percent}% Complete!**`)
    }
  }
