const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch")
const discord = require("discord.js")

module.exports = {
    name: "github",
    options: [
        {
          name: "user",
          description: "Github User",
          type: 3,
          required: true
        }
      ],
    description: "Get a Github User Info",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {

      let content = args.find(a => a.name.toLowerCase() === "user").value;

      const data = await fetch(
        `https://api.github.com/users/${content}`
      ).then((res) => res.json()).catch(e => {
    });

    const channel = client.channels.cache.get(interaction.channel_id)

    let user = client.users.cache.get(interaction.member.user.id)

    if(data.message) return channel.send(`**Invalid Github User! ${user.tag}**`).then(msg => msg.delete({ timeout: 5000 }));

   let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio, site_admin, type } = data;

           const embed = new MessageEmbed()
           .setAuthor(`${login} Information`, avatar_url)
           .setColor(`#000000`)
           .setThumbnail(`${avatar_url}`)
           .addField(`Username`, `\`\`\`yaml\n${login}\n\`\`\``)
           .addField(`ID`, `\`\`\`yaml\n${id}\n\`\`\``)
           .addField(`Bio`, `\`\`\`yaml\n${bio || "No Bio"}\n\`\`\``)
           .addField(`Site Admin`, `\`\`\`yaml\n${site_admin || "Yes", "No" }\n\`\`\``, true)
           .addField(`Type Of Account`, `\`\`\`yaml\n${type}\n\`\`\``, true)
           .addField(`Repositories`, `\`\`\`yaml\n${public_repos || "None"}\n\`\`\``, true)
           .addField(`Followers`, `\`\`\`yaml\n${followers}\n\`\`\``, true)
           .addField(`Following`, `\`\`\`yaml\n${following}\n\`\`\``, true)
           .addField(`Location`, `\`\`\`yaml\n${location || "No Location"}\n\`\`\``)
           .addField(`Account Created`, `\`\`\`yaml\n` + moment.utc(created_at).format("dddd, MMMM, Do YYYY") + `\n\`\`\``)
           .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)

           sendembed(embed)
    }
  }
