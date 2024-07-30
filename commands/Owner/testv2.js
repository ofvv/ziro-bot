const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js");
const { evalchannel } = require("../../config.json");
const { dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)

module.exports = {
  name: "test2",
  ownerOnly: true,
  aliases: ["twst"],
  description: "Add a Bot Command",
  usage: "z!add",
  category: "Owner",
  run: async (client, message, args, prefix) => {
    let badges = []
    message.guild.members.cache.forEach(async m => {
      let user = client.users.cache.get(m.id)
      const flags = user.flags || await user.fetchFlags();
      const early = flags.toArray().includes("EARLY_SUPPORTER");
      const botdev = flags.toArray().includes("VERIFIED_DEVELOPER");
      const partner = flags.toArray().includes("PARTNERED_SERVER_OWNER");
      const events = flags.toArray().includes("HYPESQUAD_EVENTS");
      if (early) badges.push(`${user.tag} (${user.id}) => Early Supporter`)
      if (botdev) badges.push(`${user.tag} (${user.id}) => Early Bot Dev`)
      if (partner) badges.push(`${user.tag} (${user.id}) => Partner`)
      if (events) badges.push(`${user.tag} (${user.id}) => HypeSquad Events`)
    }).then(async () => {
    setTimeout(async function() {console.log(badges.join('\n') || "Not Found")}, 1000)
    })
  }
}
