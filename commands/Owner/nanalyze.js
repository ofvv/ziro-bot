const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
    name: "nitroanalyze",
    aliases: ["nanalyze"],
    ownerOnly: true,
    cooldown: 1000,
    category: "Owner",
    usage: "z!nitroanalyze <code>",
    description: "Analyze a Nitro Gift",
    run: async (client, message, args, prefix) => {
      const nitrocode = args[0];
      if (!nitrocode) {
        return message.lineReplyNoMention(`**Please Choose a Valid Nitro Code!\nExample: ${prefix}nitroanalyze <giftcode>**`)
      }
/*
      const data = await fetch(
        `https://discordapp.com/api/v8/entitlements/gift-codes/${nitrocode}`
      ).then((res) => res.json()).catch(e => {
      return message.lineReplyNoMention(`**${data.message}**`);
    });*/
    console.log(client.api)
    /*
    client.api.entitlements.gift_codes[nitrocode].get().then(data => {

        let redeemed = data.redeemed;

    if (data.uses > 0) {
      redeemed = 'Yes'
    } else redeemed = 'No';


    const embed = new MessageEmbed()
    .setColor("#000001")
    .setThumbnail(`https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.${"gif" || "png"}`)
    .addField(`Nitro Code`, `\`\`\`yaml\n${data.code}\n\`\`\``)
    .addField(`Uses`, `\`\`\`yaml\n${data.uses}\n\`\`\``)
    .addField(`Max Uses`, `\`\`\`yaml\n${data.max_uses}\n\`\`\``)
    .addField(`Expires At:`, `\`\`\`yaml\n${data.expires_at}\n\`\`\``)
    .addField(`Redeemed`, `\`\`\`yaml\n${redeemed} (Not 100% Accurate)\n\`\`\``)
    .addField(`${data.store_listing.sku.name} Gifter`, `\`\`\`yaml\n${data.user.username}#${data.user.discriminator} (ID: ${data.user.id})\n\`\`\``)
    .addField(`Nitro Type`, `\`\`\`yaml\n${data.store_listing.sku.name}\n\`\`\``)
    .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
    message.lineReplyNoMention(`**Nitro Analyzed**`, embed)
}).catch(e => message.lineReplyNoMention(`**${e || `Unknown Gift Code`}**`))*/
    }}
