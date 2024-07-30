const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { normalPrefix, dbLink } = require("../../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const fetch = require("node-fetch")
'use strict';

module.exports = {
    name: 'activity',
    category: 'Utility',
    ownerOnly: false,
    description: 'Activities Command',
    aliases: ['activities'],
    usage: 'z!activity youtube',
    run: async (client, message, args, prefix) => {

      let activity = args[0];
      if (!activity) {
        return message.lineReplyNoMention("**Please Choose an Activity!**\n\`youtube\`\n\`fishington.io\`\n\`betrayal.io\`")
      }

      if (activity === 'youtube') {
      const channel = message.member.voice.channel
        if (!channel || channel.type !== "voice") return message.lineReplyNoMention("**Please Join a Voice Channel!**");
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.lineReplyNoMention("**Missing Perms!**");

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913", // youtube together
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (!invite.code) return message.lineReplyNoMention("**I Can't Start This Activity!**");
                message.lineReplyNoMention(`**Channel:** \`${channel.name}\`\n**<https://discord.gg/${invite.code}>**`);
            })
            .catch(e => {
                message.lineReplyNoMention("**An Error Has Occured**");
            })
            } else if (activity === 'fishington.io') {
      const channel = message.member.voice.channel
        if (!channel || channel.type !== "voice") return message.lineReplyNoMention("**Please Join a Voice Channel!**");
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.lineReplyNoMention("**Missing Perms!**");

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "814288819477020702", // fishington.io
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (!invite.code) return message.lineReplyNoMention("**I Can't Start This Activity!**");
                message.lineReplyNoMention(`**Channel:** \`${channel.name}\`\n**<https://discord.gg/${invite.code}>**`);
            })
            .catch(e => {
                message.lineReplyNoMention("**An Error Has Occured**");
            })
            } else if (activity === 'betrayal.io') {
      const channel = message.member.voice.channel
        if (!channel || channel.type !== "voice") return message.lineReplyNoMention("**Please Join a Voice Channel!**");
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.lineReplyNoMention("**Missing Perms!**");

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "773336526917861400", // betrayal.io
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (!invite.code) return message.lineReplyNoMention("**I Can't Start This Activity!**");
                message.lineReplyNoMention(`**Channel:** \`${channel.name}\`\n**<https://discord.gg/${invite.code}>**`);
            })
            .catch(e => {
                message.lineReplyNoMention("**An Error Has Occured**");
            })
            } else return message.lineReplyNoMention(`**I Don't Recognize This Activity!**`)
    }
    }
