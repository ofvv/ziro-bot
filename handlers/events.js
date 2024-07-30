const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Events");
table.setHeading("Event", "Load Status");

module.exports = async (client) => {

  const commands = readdirSync(`./events/`).filter(file => file.endsWith(".js"));

  for (let file of commands) {

    try {
    let pull = require(`../events/${file}`);

    if (pull.event && typeof pull.event !== "string") {
      table.addRow(file, `❌ Not a String`);
      continue;
    }

    pull.event = pull.event || file.replace(".js", "")

    client.on(pull.event, pull.run.bind(null, client))

    if (pull.event === 'INTERACTION_CREATE') {
      client.ws.on(pull.event, pull.run.bind(null, client))
    }

    table.addRow(file, '✅ Loaded');

    } catch(err) {

  console.log(`Events Error:\n${err}`)
  table.addRow(file, `❌ Not Loaded`);
    }
  }

   console.log(table.toString());
}
