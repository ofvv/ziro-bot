const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { createCanvas, loadImage } = require('canvas')
const api = require("blueapi.js");

module.exports = {
    name: "animecouple",
    options: [
        {
          name: "user",
          description: "User To Get Avatar",
          type: 6,
          required: true
        }
      ],
    description: "Anime Couple Image",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      let userid;

      if (args) {
        userid = args.find(u => u.name).value
      } else userid = interaction.member.user.id

      let user = client.users.cache.get(userid) || client.users.cache.get(interaction.member.user.id)

      let msguser = client.users.cache.get(interaction.member.user.id)

      const canvas = createCanvas(611, 344)
      const ctx = canvas.getContext('2d')
      ctx.font = '15px Impact'
      let pfp1 = await api.image.circle(msguser.displayAvatarURL({ format: "jpg" }));
      const userOne = await loadImage(pfp1)
      let url = user
      url = url ? url.displayAvatarURL({ format: "jpg" }) : msguser.displayAvatarURL({ format: "jpg" });
      let pfp2 = await api.image.circle(url);
      const userTwo = await loadImage(pfp2)

loadImage('https://cdn.discordapp.com/attachments/805837103464054815/815678646298869810/Ryuuji-Taiga-cute-anime-couples-in-love-1.jpg').then(async (image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(userOne, 125, 30, 160, 160);
        ctx.drawImage(userTwo, 280, 35, 160, 160);
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'animecouple.png')
        const embed = new MessageEmbed()
        .setDescription(`test`)
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: await createAPIMessage(interaction, '**Here Is Your Couple Image!**')
          }
        });
        const channel = client.channels.cache.get(interaction.channel_id)
        channel.send(attachment).then(msg => msg.delete({timeout:30000}))
})
    }
  }
