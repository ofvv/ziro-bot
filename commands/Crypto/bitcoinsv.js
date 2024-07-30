const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
    name: "bitcoinsv",
    aliases: ["bsv"],
    category: "Crypto",
    usage: "z!bitcoinsv",
    description: `Bitcoin SV Price`,
    run: async (client, message, args, prefix) => {

      const data = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BSV&tsyms=USD,EUR,BGN").then((res) =>
        res.json()
      );

            const embed = new MessageEmbed()
            .setAuthor(`Bitcoin SV Price`)
            .setColor(`#000000`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/800688178221940736/803609458328076328/all_0004_Layer-9.png`)
            .addField(`USD`, `\`\`\`yaml\n${data.USD}$\n\`\`\``)
            .addField(`EUR`, `\`\`\`yaml\n${data.EUR}€\n\`\`\``)
            .addField(`BGN`, `\`\`\`yaml\n${data.BGN}BGN\n\`\`\``)
            .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)

            message.lineReplyNoMention(embed)

        }
    }
