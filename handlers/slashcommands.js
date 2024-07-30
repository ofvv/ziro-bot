const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Slash Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
    readdirSync("./slashcommands/").forEach(dir => {
        const commands = readdirSync(`./slashcommands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../slashcommands/${dir}/${file}`);

            if (pull.name) {
                client.slashcommands.set(pull.name, pull);
                table.addRow(file, '✅ Loaded');
            } else {
                table.addRow(file, `❌ Not Loaded`);
                continue;
            }

            //if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
}
