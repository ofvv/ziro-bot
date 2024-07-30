const { MessageEmbed } = require("discord.js");
const { normalPrefix, dbLink, site, extension, inviteurl } = require("../../config.json")

module.exports = {
    name: "help",
    options: [
        {
          name: "command",
          description: "Search Command Info",
          type: 3,
          required: false
        }
      ],
    description: "Help Menu",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {

      if (args) {
        args = args.find(u => u.name).value
      }

    const { Database } = require('quickmongo');
    const db = new Database(dbLink)

    let prefix = await db.get(`guild_prefix_${interaction.guild.id}`);
    if (prefix === null  | prefix === undefined) prefix = normalPrefix;

    if (args) {
      const command = await client.commands.get(args) || client.commands.get(client.aliases.get(args)) || client.slashcommands.get(args);

      if (command === client.slashcommands.get(args)) prefix = '/'

      if (!command) {
        return interaction.sendmsg("**Unknown Command:** \`" + prefix + args + "\`");
      }

      let embed = new MessageEmbed()
        .addField("Description", `\`\`\`yaml\n${command.description || "Not Provided"}\n\`\`\``)
        .addField("Usage", `\`\`\`yaml\n${command.usage || "Not Provided"}\n\`\`\``)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("#000000")
        .setFooter(`Command: ${prefix}${command.name} | ${client.user.username} ${new Date().getFullYear()} ©`/*, client.user.displayAvatarURL()*/);
        if(command.aliases) embed.addField("Aliases", `\`\`\`yaml\n${command.aliases.map(a => prefix + a).join(", ")}\n\`\`\``, false);

      return interaction.sendembed(embed);
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setColor("#000000")
        .setFooter(`${client.user.username} ${new Date().getFullYear()} © [Total Commands: ${client.commands.size}]`, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL());

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + prefix + "" + value.join("`, `" + prefix + "") + "`";
        let emxcmds = `${category} [Total Commands: ${value.length}]`

        if (emxcmds.startsWith('Owner') && category === 'Owner') {
          emxcmds = 'Owner [Total Commands: ?]'
          desc = '`Hidden`'
        }

        emx.addField(emxcmds, desc)
      }

      let slashprefix = "/"

      let slashdesc = "`" + slashprefix + client.slashcommands.map(cmd => "" + cmd.name).join("`, `" + slashprefix + "") + "`"

      emx.addField(`Slash Commands [Total Commands: ${client.slashcommands.size}]`, slashdesc)

       emx.addField(`**Links [Total Links: 5]**`, `**[Invite](https://discord.com/api/oauth2/authorize?client_id=752242570532225064&permissions=8&scope=bot)** <┊> **[Website](https://${site}.${extension})** <┊> **[Support](https://discord.gg/yXjx596)** <┊> **[Vote](https://top.gg/bot/752242570532225064/vote)** <┊> **[Top.gg](https://top.gg/bot/752242570532225064)**`);

      return interaction.sendembed(emx);
    }
  }
};
