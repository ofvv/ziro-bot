const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
    name: "eos",
    aliases: ["eos"],
    category: "Crypto",
    usage: "z!eos",
    description: `EOS Price`,
    run: async (client, message, args, prefix) => {

      const data = await fetch("https://min-api.cryptocompare.com/data/price?fsym=EOS&tsyms=USD,EUR,BGN").then((res) =>
        res.json()
      );

            const embed = new MessageEmbed()
            .setAuthor(`EOS Price`)
            .setColor(`#000000`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/800688178221940736/803611095699816448/all_0019_Layer-30.png`)
            .addField(`USD`, `\`\`\`yaml\n${data.USD}$\n\`\`\``)
            .addField(`EUR`, `\`\`\`yaml\n${data.EUR}€\n\`\`\``)
            .addField(`BGN`, `\`\`\`yaml\n${data.BGN}BGN\n\`\`\``)
            .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)

            message.lineReplyNoMention(embed)

        }
    }
