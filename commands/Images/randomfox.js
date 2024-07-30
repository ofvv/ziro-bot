const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
    name: "randomfox",
    aliases: ["fox"],
    category: "Images",
    usage: "z!randomfox",
    example: "fox/randomfox",
    description: `RandomFox Image Command`,
    run: async (client, message, args, prefix) => {

       try {


  fetch(`https://randomfox.ca/floof/${args.join('-')}`)
    .then(res => res.json()).then(body => {
      if(body.message) return message.lineReplyNoMention(`An Error Has Occured! The Api May Be Down The Command Will Be Working Again In 12-24 hours!`);
    let { image } = body;

            const embed = new MessageEmbed()
            .setAuthor(`Random Fox Image`)
            .setColor(`#000000`)
            .setImage(`${image}`)
            .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)

            message.lineReplyNoMention(embed)

    })

        } catch (error) {
            console.log(`An Error Has Occured`);
            return message.lineReplyNoMention(`An Error has Occured, Please Try Again Later!`)
        }
    }
};
