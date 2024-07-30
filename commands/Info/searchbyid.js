const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "searchbyuserid",
    aliases: ["userid", "id"],
    category: "Info",
    usage: "z!searchbyuserid <id>",
    description: "Get User Info By ID",
    run: async (client, message, args, prefix) => {
      let userid = args[0] || message.author.id;
      if(!userid) {
        return message.lineReplyNoMention(`**Please Provide an ID!**`)
      }
      client.api.users[userid].get().then(data => {
        const embed = new MessageEmbed()
        .setColor("#000001")
        .setThumbnail(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.gif`)
        .addField(`Username`, `\`\`\`yaml\n${data.username}\n\`\`\``)
        .addField(`Discriminator`, `\`\`\`yaml\n${data.discriminator}\n\`\`\``)
        .addField(`Tag`, `\`\`\`yaml\n${data.username + "#" + data.discriminator}\n\`\`\``)
        .addField(`ID`, `\`\`\`yaml\n${data.id}\n\`\`\``)
        .addField(`Public Flags`, `\`\`\`yaml\n${data.public_flags || 0}\n\`\`\``)
        .addField(`Public Flags Meaning`, `\`\`\`yaml\n        Discord_Employee = 1;
        Partnered_Server_Owner = 2;
        HypeSquad_Events = 4;
        Bug_Hunter_Level_1 = 8;
        House_Bravery = 64;
        House_Brilliance = 128;
        House_Balance = 256;
        Early_Supporter = 512;
        Bug_Hunter_Level_2 = 16384;
        Early_Verified_Bot_Developer = 131072;\n\`\`\``)
        message.lineReplyNoMention(embed)
      }).catch(e => message.lineReplyNoMention(`**Invalid ID!**`))
    }
  }
