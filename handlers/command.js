const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅ Loaded');
            } else {
                table.addRow(file, `❌ Not Loaded`);
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
}

/**
 * Old layout:
 * module.exports = {
 *  name: "Command name",
 *  aliases: ["array", "of", "aliases"]
 *  category: "Category name",
 *  description: "Command description"
 *  usage: "[args input]",
 *  run: (client, message, args, prefix) => {
 *      The code in here to execute
 *  }
 * }
 */

/*
New layout:
module.exports = {
    name: '',
    category: '',
    ownerOnly: false, // tva e zaduljitelno btw (ako imam cooldown ili bot/authorperms)
    cooldown: 5000, // kat cqlo she e dobre vsichko da se addva
    authorPermission: ["BAN_MEMBERS"],
    botPermission: ["BAN_MEMBERS"],
    description: '',
    aliases: [''],
    usage: '',
    run: async (client, message, args, prefix) => {
  message.channel.send(`lol`)
  }}

*/
