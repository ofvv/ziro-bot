const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
    name: 'button',
    category: 'Owner',
    ownerOnly: true,
    description: 'Button Test Command',
    aliases: ['buttontest'],
    usage: 'z!button <type>',
    run: async (client, message, args, prefix) => {
      let type = args[0]

      if (!type) {
        return message.channel.send(`choose a type`)
      }
      if (type === 'link') {
fetch(`https://discord.com/api/v8/channels/${message.channel.id}/messages`, {
            method: "POST",
            body: JSON.stringify({
                content: "**Website**",
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              label: "Website",
              url: "https://zirobot.xyz/",
            },
          ],
        },
      ],
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            }
            if (type === 'primary') {
fetch(`https://discord.com/api/v8/channels/${message.channel.id}/messages`, {
            method: "POST",
            body: JSON.stringify({
                content: "**Website**",
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 1,
              label: "Primary",
              custom_id: "1",
            },
          ],
        },
      ],
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json()).catch(e => console.log(e))
            }
if (type === 'all') {
fetch(`https://discord.com/api/v8/channels/${message.channel.id}/messages`, {
            method: "POST",
            body: JSON.stringify({
                content: "**Buttons**",
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 1,
              label: "Primary",
              custom_id: "1",
            },
            {
              type: 2,
              style: 2,
              label: "Secondary",
              custom_id: "2",
            },
            {
              type: 2,
              style: 3,
              label: "Success",
              custom_id: "3",
            },
            {
              type: 2,
              style: 4,
              label: "Destructive",
              custom_id: "4",
            },
            {
              type: 2,
              style: 5,
              label: "Link",
              url: "https://zirobot.xyz/",
            },
          ],
        },
      ],
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json()).catch(e => console.log(e))
            }
if (type === 'interact') {
fetch(`https://discord.com/api/v8/channels/${message.channel.id}/messages`, {
            method: "POST",
            body: JSON.stringify({
                content: "**Links**",
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 1,
              label: "Github",
              custom_id: "1",
            },
            {
              type: 2,
              style: 1,
              label: "YouTube",
              custom_id: "1",
            },
            {
              type: 2,
              style: 5,
              label: "Website",
              url: "https://zirobot.xyz/",
            },
          ],
        },
      ],
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json()).then(int => {
              client.ws.on('INTERACTION_CREATE', async interaction => {
                let user = client.users.cache.get(interaction.member.user.id)
                message.channel.send(`**<@${user.id}> Clicked a Button**`)
              })
            })
            }
 if (type === 'angtest') {

        message.buttons('**ziro qk li e?**', {
            buttons: [
                {
                    style: 'green',
                    label: 'Da',
                    id: 'da_qk_e'
                },
                {
                    style: 'green',
                    label: 'Ne',
                    id: 'ne_e_qk'
                }
            ],
        })
 }
}
}
/*
enum ButtonStyle {
  Primary = 1,
  Secondary = 2,
  Success = 3,
  Destructive = 4,
  Link = 5
}
*/