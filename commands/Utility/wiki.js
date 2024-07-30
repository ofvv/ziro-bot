const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: "wiki",
    aliases: ["wikipedia"],
    category: "Utility",
    usage: "z!wiki <wikipage>",
    description: "Wikipedia Search",
    run: async (client, message, args, prefix) => {
      
        const body = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`,
          ).then(res => res.json().catch(() => {}));

        if (!body) return message.channel.sendmessage.channel.send({embed: {
                      description: "**This Page Was Not Found.**"
                  }})
          if (body.title && body.title === "Not found.") return message.lineReplyNoMention({embed: {
                      description: "**This Page Was Not Found.**"
                  }});

        const embed = new Discord.MessageEmbed()
        .setTitle(`${body.title} `)
        .addField("Wikipedia Link:",`**[Here](${body.content_urls.desktop.page})**`, true)
        .setDescription(`** ${body.extract}**`)
        .setColor("#000001")
        .setTimestamp()
	      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`);

         if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
        message.lineReplyNoMention(embed);

    }
}
