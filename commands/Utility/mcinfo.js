const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const req = require("request")

module.exports = {
    name: "mcinfo",
    aliases: ["playerinfo", "minecraftinfo"],
    category: "Utility",
    usage: "z!mcinfo <player>",
    description: "Minecraft User Search",
    run: async (client, message, args, prefix) => {
    let username = args[0];

    if (!username) return message.lineReplyNoMention('Please Provide a Minecraft Username!');



    let embed = new Discord.MessageEmbed()
        .setColor("#000001")
        .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Requested by ${message.author.tag}`)

    req(`https://api.mojang.com/users/profiles/minecraft/${username}`, async function(err, response, body) {

        if (err) {
            console.log(err);
           return message.lineReplyNoMention(`Cannot Fetch User!`);
            return;
        }

        if (!body) {
            return message.lineReplyNoMention("Please Provide a Valid Username!");
            return;
        }

        body = JSON.parse(body);

        embed.addField("Username", body.name);
        embed.addField("UUID", body.id);
        embed.addField("Skin", `
        View: [Here](https://minotar.net/skin/${username})
        Download: [Here](https://minotar.net/download/${username})
        `);

        embed.setImage(`https://crafatar.com/renders/body/${body.id}`)

        await message.lineReplyNoMention(embed);
        return;
    })
  }
}
