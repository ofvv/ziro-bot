const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
    name: "bitcoincash",
    aliases: ["bch"],
    category: "Crypto",
    usage: "z!bitcoincash",
    description: `Bitcoin Cash Price`,
    run: async (client, message, args, prefix) => {

      const data = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=USD,EUR,BGN").then((res) =>
        res.json()
      );

            const embed = new MessageEmbed()
            .setAuthor(`Bitcoin Cash Price`)
            .setColor(`#000000`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/800688178221940736/803609465714376734/all_0006_Layer-7.png`)
            .addField(`USD`, `\`\`\`yaml\n${data.USD}$\n\`\`\``)
            .addField(`EUR`, `\`\`\`yaml\n${data.EUR}€\n\`\`\``)
            .addField(`BGN`, `\`\`\`yaml\n${data.BGN}BGN\n\`\`\``)
            .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)

            message.lineReplyNoMention(embed)

        }
    }
