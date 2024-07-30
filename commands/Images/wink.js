const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "wink",
    aliases: ["winkme"],
    category: "Images",
    usage: "z!wink <@user>",
    description: "Wink at Another User Command",
    run: async (client, message, args) => {
        const url = "https://some-random-api.ml/animu/wink";

        let image, response;
        try {
            response = await axios.get(url);
            image = response.data;


        } catch (e) {
            return message.lineReplyNoMention(`An Error Has Occured!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`*Wink* *Wink*`)
            .setColor(`#000000`)
            .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
            .setTimestamp()
            .setImage(image.link);

        await message.lineReplyNoMention(embed)
    }
}
