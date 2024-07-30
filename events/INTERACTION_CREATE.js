const ascii = require("ascii-table");
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
let guildID = '609735513724944401';

const fetch = require("node-fetch")

module.exports.run = async (client, interaction) => {

    async function createAPIMessage(interaction, content) {
      const apiMessage = await discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();

      return { ...apiMessage.data, files: apiMessage.files };
    }

    let slashcmd = interaction.data.name.toLowerCase();
    let args = interaction.data.options;

    async function sendembed(embed) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: await createAPIMessage(interaction, embed || interaction)
        }
      }).catch(e => {})
      if (!embed) {
        console.error(`Send Embed Requires an Embed!`)
      }
    }

    async function sendinvinsibleembed(embed) {
    let x = await createAPIMessage(interaction, embed || interaction);
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          ...x,
          flags: 64
        }
      }
    }).catch(e => {})
    if (!embed) {
      console.error(`Send Invinsible Embed Requires an Embed!`)
    }
  }

    async function sendmsg(content) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: content
        }
      }
    }).catch(e => {})
    if (!content) {
      console.error(`Send Message Requires Content!`)
    } else if (content === '') {
      console.error(`Cannot Send an Empty Message!`)
    }
    }

    async function sendinvinsiblemsg(content) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: content,
          flags: 64
        }
      }
    }).catch(e => { })
    if (!content) {
      console.error(`Send Invinsible Message Requires Content!`)
    } else if (content === '') {
      console.error(`Cannot Send an Empty Message!`)
    }
  }

      interaction.author = await client.users.cache.get(interaction.member.user.id)

      interaction.channel = await client.channels.cache.get(interaction.channel_id)

      interaction.guild = await client.guilds.cache.get(interaction.guild_id)

      interaction.user;
      if (args) {
          interaction.user = await client.users.cache.get(args.find(u => u.name).value)
        } else interaction.user = interaction.author;

        interaction.sendmsg = async (msg) => await sendmsg(msg)

        interaction.sendinvinsiblemsg = async (msg) => await sendinvinsiblemsg(msg)

        interaction.sendinvinsibleembed = async (embed) => await sendinvinsibleembed(embed)

        interaction.sendembed = async (embed) => await sendembed(embed)

        interaction.sendInvinsibleMsg = async (msg) => await sendinvinsiblemsg(msg)

        interaction.sendInvinsibleEmbed = async (embed) => await sendinvinsibleembed(embed)

    client.slashcommands.forEach(command => {
      if (slashcmd === command.name) {
        command.run(client, createAPIMessage, args, interaction, command, sendmsg, sendembed);
      }
    })

}
