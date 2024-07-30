const ascii = require("ascii-table");
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
//const { owner } = require("../../config.json");
//const { normalPrefix, site, extension } = require("./../config.json")
let guildID = '609735513724944401';

const fetch = require("node-fetch")

module.exports.run = (client) => {

//client.api.applications(client.user.id).guilds(guildID).commands.post
client.slashcommands.forEach(cmd => {

    client.api.applications(client.user.id).guilds(guildID).commands.post({
    data: {
      name: cmd.name,
      description: cmd.description,
      options: cmd.options || [] || null,
      permissions: cmd.permissions || ['SEND_MESSAGES'] || [] || null
    }
  })/*.then(cmds => {
    console.log(cmds)
    })*/
  })

  setInterval(function() {
  fetch(
      `https://visitor-badge.glitch.me/badge?page_id=ZiroCore.ZiroCore`
    ).then((res) => res.json()).catch(e => {});
  }, 1500)

  client.users.fetch("484701017015975936")
  //client.user.setActivity(`Over ${client.guilds.cache.size} Servers | ${client.commands.size} Commands | z!help`,{type: "LISTENING"})
  //client.user.setActivity(`d.js | zirobot.xyz`,{type: "COMPETING"/*, url: "https://twitch.tv/zirocore"*/})
  client.user.setActivity(`invite me with slash commands => www.zirobot.xyz/s`)
  let table = new ascii(`Bot`);
  table.addRow('On', '✅ ');
  console.log(table.toString())
}
