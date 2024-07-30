const { normalPrefix, normalPrefix2, site, extension, dbLink, leavechannel, serverschannel, userschannel, updatedon, channelschannel, errchannel, minch } = require("./../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink);
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports.run = async (client, guild) => {
const leavedprefix = await db.get(`guild_prefix_${guild.id}`);
let channel = client.channels.cache.get(leavechannel);
await db.delete(`guild_prefix_${guild.id}`).catch(e => {
  channel.send(`I Left From: ${guild.name || `Can't Fetch`} But They Didn't Have a Custom Prefix!\nError: ${e}`)
});

if (!channel) {
 return;
};
var totalMembers = 0;
client.guilds.cache.forEach(guild => {
  var x = parseInt(guild.memberCount);
  totalMembers = totalMembers + x;
})

var totalChannels = 0;
client.guilds.cache.forEach(guild => {
  var x = parseInt(guild.channels.cache.size);
  totalChannels = totalChannels + x;
})

if(totalMembers == 'NaN'){
totalMembers = `Can't Fetch`;
}

if(totalMembers == 'null'){
totalMembers = `Can't Fetch`;
}

if(totalMembers == 'undefined'){
totalMembers = `Can't Fetch`;
}
    //client.user.setActivity(`Over ${client.guilds.cache.size} Servers | z!help`,{type: "LISTENING"})

    let embed = new MessageEmbed()
      .setColor("#000000")
      .setAuthor(`I Was Kicked From: ${guild.name || "Glitched"}`, client.user.avatarURL)
      .addField("Members", guild.memberCount || "Glitched", true)
  	  .addField("Roles", guild.roles.cache.size || "Glitched", true)
      .addField("ID", guild.id || "Glitched", true)
  	  .addField("Boosts", guild.premiumSubscriptionCount || '0', true)
      .addField("Created At", guild.createdAt || 'Cannot Fetch', true)
      .setTimestamp()
      .setFooter(`${client.guilds.cache.size} Servers`, client.user.avatarURL);
    //client.channels.cache.get(channel).send(embed)
  try {
        channel.send(embed);
    } catch (e) {
        if (e) {
            return 1 + 1;
        } else {
            return 1 + 1;
        };
    };
    const randomm = Math.random() * 10;
    let chseconds = [
      Math.floor(randomm) * 60 * 1000,
      Math.floor(randomm) * 60 * 1000
    ]
    let seconds = chseconds[Math.floor(Math.random() * chseconds.length)]
    const updatedonch = client.channels.cache.get(updatedon)
    updatedonch.join()
    setTimeout(function() {
    updatedonch.leave()
  }, seconds);
  let mins = seconds / 60 / 1000;
  //client.channels.cache.get(channel).send(embed)
  client.channels.cache.get(updatedon).setName(`Last Update: ${moment(Date.now()).format('LT')}`).catch(e => {
    client.channels.cache.get(errchannel).send(`**Error:**\n\`\`\`js\n${e}\n\`\`\``)
  })
  client.channels.cache.get(serverschannel).setName(`Total Servers: ${client.guilds.cache.size}`).catch(e => {
    client.channels.cache.get(errchannel).send(`**Error:**\n\`\`\`js\n${e}\n\`\`\``)
  })
  client.channels.cache.get(userschannel).setName(`Total Users: ${totalMembers || `Can't Fetch`}`).catch(e => {
    client.channels.cache.get(errchannel).send(`**Error:**\n\`\`\`js\n${e}\n\`\`\``)
  })
  client.channels.cache.get(channelschannel).setName(`Total Channels: ${totalChannels || `Can't Fetch`}`).catch(e => {
    client.channels.cache.get(errchannel).send(`**Error:**\n\`\`\`js\n${e}\n\`\`\``)
  })
  client.channels.cache.get(minch).setName(`Joined Voice For ${mins} Mins`).catch(e => {
    client.channels.cache.get(errchannel).send(`**Error:**\n\`\`\`js\n${e}\n\`\`\``)
  })
}
