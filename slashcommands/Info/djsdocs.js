const discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "djsdocs",
    options: [
        {
          name: "version",
          description: "Discord.js Version/Framework",
          type: 3,
          required: true,
          choices: [
                {
                    "name": "Discord.js Stable",
                    "value": "stable"
                },
                {
                    "name": "Discord.js Master",
                    "value": "master"
                },
                {
                    "name": "Discord RPC",
                    "value": "rpc"
                },
                {
                    "name": "Discord.js Commando",
                    "value": "commando"
                },
                {
                    "name": "Discord.js Akairo",
                    "value": "akairo-master"
                }
            ]
        },
        {
          name: "query",
          description: "Search Discord.js.org Docs",
          type: 3,
          required: true,
        }
      ],
    description: "Search discord.js.org",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      let search;
      let version;

      if (args) {
        let choice = args.find(v => v.name)
        if (choice.value === 'stable' && choice.name === 'version') {
          version = 'stable'
        } else if (choice.value === 'master' && choice.name === 'version') {
          version = 'master'
        } else if (choice.value === 'rpc' && choice.name === 'version') {
          version = 'rpc'
        } else if (choice.value === 'commando' && choice.name === 'version') {
          version = 'commando'
        } else if (choice.value === 'akairo-master' && choice.name === 'version') {
          version = 'akairo-master'
        } else version = 'stable';
        search = args.find(u => u.name).value
      }

      fetch(`https://djsdocs.sorta.moe/v2/embed?src=${version}&q=${encodeURIComponent(search)}`)
          .then(res => res.json())
          .then(body => {
              if (body === null) return interaction.channel.send({
                  embed: {
                      "color": 0x00001,
                      "description": "**No Results Found.**"
                  }
              }).then(msg => msg.delete({timeout:5000}))
              body.color = 0x00001;
              interaction.sendembed({ embed: body });
          })
          .catch(e => {
              interaction.channel.send({
                  embed: { "color": 0x00001, "author": { "name": "Discord.js Docs", "url": "https://discord.js.org/#/docs/main/master", "icon_url": "https://discord.js.org/favicon.ico" }, "title": "Search results:", "description": "**No Results Found.**" }
              });
          });
    }
  }
