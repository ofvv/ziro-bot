const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
    name: "cardano",
    aliases: ["ada"],
    category: "Crypto",
    usage: "z!cardano",
    description: `Cardano Price`,
    run: async (client, message, args, prefix) => {

      const data = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ADA&tsyms=USD,EUR,BGN").then((res) =>
        res.json()
      );

            const embed = new MessageEmbed()
            .setAuthor(`Cardano Price`)
            .setColor(`#000000`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/800688178221940736/803609495603118110/all_0012_Layer-22.png`)
            .addField(`USD`, `\`\`\`yaml\n${data.USD}$\n\`\`\``)
            .addField(`EUR`, `\`\`\`yaml\n${data.EUR}€\n\`\`\``)
            .addField(`BGN`, `\`\`\`yaml\n${data.BGN}BGN\n\`\`\``)
            .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)

            message.lineReplyNoMention(embed)

        }
    }
