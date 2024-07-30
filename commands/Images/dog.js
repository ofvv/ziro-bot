const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "randomdog",
    aliases: ["dog"],
    category: "Images",
    usage: "z!randomdog",
    description: "Random Dog Command",
    run: async (client, message, args, prefix) => {
        const url = "https://some-random-api.ml/img/dog";

        let image, response;
        try {
            response = await axios.get(url);
            image = response.data;


        } catch (e) {
            return message.lineReplyNoMention(`An Error Has Occured! The Api May Be Down The Command Will Be Working Again In 12-24 hours!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Random Dog Image`)
            .setColor(`#000000`)
            .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
            .setTimestamp()
            .setImage(image.link)

        await message.lineReplyNoMention(embed)
    }
}
