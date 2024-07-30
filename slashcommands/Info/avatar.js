const discord = require("discord.js")

module.exports = {
    name: "avatar",
    options: [
        {
          name: "user",
          description: "User To Get Avatar",
          type: 6,
          required: false
        }
      ],
    description: "Get a User's Avatar",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      let userid;

      if (args) {
        userid = args.find(u => u.name).value
      } else userid = interaction.member.user.id

      let user = client.users.cache.get(userid) || client.users.cache.get(interaction.member.user.id)

      let avatar = user.displayAvatarURL({size: 4096, dynamic: true});
      let avatar1024 = user.displayAvatarURL({size: 1024, dynamic: true});
      let avatar512 = user.displayAvatarURL({size: 512, dynamic: true});
      let avatar256 = user.displayAvatarURL({size: 256, dynamic: true});
      let avatar128 = user.displayAvatarURL({size: 128, dynamic: true});

    let embed = new discord.MessageEmbed()
    .setDescription(`**${user.tag}'s Avatar**`)
    .addField(`Avatar`, `**[Link](${avatar})**`, true)
    .addField(`Sizes`, `**[1024x1024](${avatar1024})**`, `**[512x512](${avatar512})**`, `**[256x256](${avatar256})**`, `**[128x128](${avatar128})**`, true)
    .setColor("#000000")
    .setImage(avatar)

    interaction.sendembed(embed)
    }
  }
