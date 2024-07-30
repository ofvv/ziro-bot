const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
    name: 'devtools',
    category: 'Owner',
    ownerOnly: true,
    description: 'DevTools Command',
    aliases: ['devtoolss'],
    usage: 'z!devtools',
    run: async (client, message, args, prefix) => {


const embed = new MessageEmbed()
.setDescription(`**Developer Tools That Can Be Used By ${client.users.cache.get("484701017015975936").tag}!**`)
.setColor("#000001")


message.buttonsReply('\u200b', {
            buttons: [
                {
                    style: 'green',
                    label: 'Servers',
                    id: 'showservers'
                },
                {
                    style: 'red',
                    label: 'Shutdown',
                    id: 'shutdownbot'
                },
                {
                    style: 'blupurple',
                    label: 'Server Invite',
                    id: 'serverinv'
                },
                {
                    style: 'grey',
                    label: 'Eval',
                    id: 'eval'
                },
                {
                    style: 'grey',
                    label: 'Execute',
                    id: 'exec'
                },
            ],
            embed: embed
        })

message.buttons('\u200b', {
            buttons: [
                {
                    style: 'grey',
                    label: 'Coming Soon!',
                    id: 'lol',
                    disabled: true
                },
                {
                    style: 'grey',
                    label: 'Edit Message',
                    id: 'editing',
                    disabled: false
                },
                {
                    style: 'grey',
                    label: 'Edit Button',
                    id: 'edit',
                    disabled: false
                },
            ],
          
        })

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