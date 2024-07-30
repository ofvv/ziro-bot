const discord = require("discord.js")
const { owner, evalchannel } = require("../../config.json")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "eval",
    options: [
        {
          name: "code",
          description: "Code To Eval",
          type: 3,
          required: true
        }
      ],
    description: "Eval Command (Owner Only)",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      let code;
      if (args) {
      code = args.find(a => a.name.toLowerCase() === "code").value;
    }

      if (interaction.author.id != owner) return;

        try {

          let evaled = eval(code);
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
            const evaledembed = new MessageEmbed()
            .addField(`Code:`, `\`\`\`js\n${code}\n\`\`\``, false)
            .addField(`Output:`, `\`\`\`js\n${evaled}\n\`\`\``, false)
            .addField(`Type:`, `\`\`\`js\n` + typeof(evaled) + `\n\`\`\``, false)
            .setColor(`#000000`)
            .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Success`)
            client.channels.cache.get(evalchannel).send(evaledembed)
            interaction.sendmsg(evaledembed)
        } catch (err) {
          const evaledembederr = new MessageEmbed()
          .addField(`Code:`, `\`\`\`js\n${code}\n\`\`\``, false)
          .addField(`Output:`, `\`\`\`js\n${err}\n\`\`\``, false)
          .addField(`Type:`, `\`\`\`js\n` + typeof(evaled) + `\n\`\`\``, false)
          .setColor(`#000000`)
          .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Error`)
          client.channels.cache.get(evalchannel).send(evaledembederr)
          interaction.channel.send(evaledembederr).then(msg => msg.delete({timeout:10000}))
        }
    }
  }
