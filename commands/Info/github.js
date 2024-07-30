const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch")

module.exports = {
    name: "github",
    aliases: ["git", "hub"],
    category: "Info",
    usage: "z!github <Name>",
    exmaple: "z!Github ZiroWasTaken420",
    description: `Github User Account Information!`,
    run: async (client, message, args, prefix) => {

       try {

  if (!args[0]) return message.lineReplyNoMention(`Please Give Me A Github User!`)

  fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
      if(body.message) return message.lineReplyNoMention(`User Not Found | Please Give Me A Valid Github User!`);
    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio, site_admin, type } = body;

            const embed = new MessageEmbed()
            .setAuthor(`${login} Information`, avatar_url)
            .setColor(`#000000`)
            .setThumbnail(`${avatar_url}`) //`\`\`\`yaml\n\n\`\`\``
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

            message.lineReplyNoMention(embed)

    })

        } catch (error) {
            console.log(`[Commands] [github] Getting Error In github Command :\n`, error);
            return message.lineReplyNoMention(`An Error has Occured, Please Try Again Later!`)
        }
    }
};
