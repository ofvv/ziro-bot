const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
    name: "monero",
    aliases: ["xmr"],
    category: "Crypto",
    usage: "z!monero",
    description: `Monero Price`,
    run: async (client, message, args, prefix) => {

      const data = await fetch("https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=USD,EUR,BGN").then((res) =>
        res.json()
      );

            const embed = new MessageEmbed()
            .setAuthor(`Monero Price`)
            .setColor(`#000000`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/728503987866828876/800109882426654720/70836-cryptocurrency-mines-t-shirt-ethereum-logo-monero.png`)
            .addField(`USD`, `\`\`\`yaml\n${data.USD}$\n\`\`\``)
            .addField(`EUR`, `\`\`\`yaml\n${data.EUR}€\n\`\`\``)
            .addField(`BGN`, `\`\`\`yaml\n${data.BGN}BGN\n\`\`\``)
            .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)

            message.lineReplyNoMention(embed)

        }
    }
