/*const { normalPrefix, owner, normalPrefix2, site, extension, dbLink, joinchannel, serverschannel, userschannel, updatedon, channelschannel, errchannel, minch, evalchannel } = require("./../config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink);
const discord = require("discord.js");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports.run = async (client, button) => {
 button.clicker = await button.clicker;
if (button.id === 'da_qk_e') {
      button.message.channel.send(`**${button.clicker.user.tag} se suglasi che ziro e qk**`)
    }
    if (button.id === 'ne_e_qk') {
      button.message.channel.send(`**${button.clicker.user.tag} ne se suglasi che ziro e qk**`)
    }
    if (button.id === 'shutdownbot') {
      if (button.clicker.id != owner) {
        return button.message.channel.send(`**You Can't Use This Function! <@${button.clicker.id}>**`).then(msg => {
          setTimeout(function() {
            msg.delete().catch(() => {})
          }, 5000)
        })
      } else {
        try {
        await button.message.channel.send("**Shuttingdown The Bot...**")
        process.exit()
      } catch(e) {
        button.message.channel.send(`**An Error Has Occured!**`)
      }
      }
    }
    if (button.id === 'serverinv') {
      if (button.clicker.id != owner) {
        return button.message.channel.send(`**You Can't Use This Function! <@${button.clicker.id}>**`).then(msg => {
          setTimeout(function() {
            msg.delete().catch(() => {})
          }, 5000)
        })
      } else {
        let inviteguild = button.message.content;

      button.message.channel.send(`**Please Give Me a Guild ID!**`).then(() => {
    	let filter = m => m.author.id === button.clicker.id;

            let collector = new discord.MessageCollector(button.message.channel, filter, {
                max: 1,
                time: 1000 * 15
            })

       collector.on('collect', m => {
	     let guild = client.guilds.cache.get(m.content);
    	const channel = guild.channels.cache.filter(ch => ch.type === "text").first()
      channel.createInvite({unique: true}).then(invite => {
      button.message.channel.send(`**Invite:** https://discord.gg/${invite.code}`)
      })
      })
    })
      }
    }
    if (button.id === 'editing') {
      if (button.clicker.id != owner) {
        return button.message.channel.send(`**You Can't Use This Function! <@${button.clicker.id}>**`).then(msg => {
          setTimeout(function() {
            msg.delete().catch(() => {})
          }, 5000)
        })
      } else {
        let edit = button.message.content;

      button.message.channel.send(`**Choose a Message!**`).then(() => {
    	let filter = m => m.author.id === button.clicker.id;

            let collector = new discord.MessageCollector(button.message.channel, filter, {
                max: 1,
                time: 1000 * 15
            })

       collector.on('collect', m => {
	     let edited = m.content;
      button.message.edit(edited)
      })
    })
      }
    }
    if (button.id === 'edit') {
      if (button.clicker.id != owner) {
        return button.message.channel.send(`**You Can't Use This Function! <@${button.clicker.id}>**`).then(msg => {
          setTimeout(function() {
            msg.delete().catch(() => {})
          }, 5000)
        })
      } else {
        let edit = button.message.content;

      button.message.channel.send(`**Choose a Message For The Button!**`).then(() => {
    	let filter = m => m.author.id === button.clicker.id;

            let collector = new discord.MessageCollector(button.message.channel, filter, {
                max: 1,
                time: 1000 * 15
            })

       collector.on('collect', m => {
	     let edited = m.content;
      button.message.buttonsEdit('\u200b', {
      buttons: [
        {
                    style: 'grey',
                    label: 'Coming Soon!',
                    id: 'lol',
                    disabled: true
                },
                {
                    style: 'grey',
                    label: 'Edit Message',
                    id: 'editing',
                    disabled: false
                },
        {
          style: 'grey',
          label: edited,
          id: 'edit'
         }
       ]
    });
      })
    })
      }
    }
    if (button.id === 'purge99') {
      if (button.clicker.id != owner) {
        return button.message.channel.send(`**You Can't Use This Function! <@${button.clicker.id}>**`).then(msg => {
          setTimeout(function() {
            msg.delete().catch(() => {})
          }, 5000)
        })
      } else {
        await button.message.channel.messages.fetch({limit: 99}).then(messages => {
        button.message.channel.bulkDelete(messages);
        });
      }
    }

if (button.id === 'eval') {
      if (button.clicker.id != owner) {
        return button.message.channel.send(`**You Can't Use This Function! <@${button.clicker.id}>**`).then(msg => {
          setTimeout(function() {
            msg.delete().catch(() => {})
          }, 5000)
        })
      } else {
        const code = button.message.content;

  const ziro = client.users.cache.get("484701017015975936")

button.message.channel.send(`**Please Give Me Code To Eval!**`).then(() => {
    	let filter = m => m.author.id === button.clicker.id;

let collector = new discord.MessageCollector(button.message.channel, filter, {
                max: 1,
                time: 1000 * 25
            })

collector.on('collect', m => {
      const codetoeval = m.content;
    try {
      let evaled = eval(codetoeval);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        const evaledembed = new MessageEmbed()
        .addField(`Code:`, `\`\`\`js\n${code}\n\`\`\``, false)
        .addField(`Output:`, `\`\`\`js\n${evaled}\n\`\`\``, false)
        .addField(`Type:`, `\`\`\`js\n` + typeof(evaled) + `\n\`\`\``, false)
        .setColor(`#000000`)
        .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Success`)
        client.channels.cache.get(evalchannel).send(evaledembed)
    } catch (err) {
      const evaledembederr = new MessageEmbed()
      .addField(`Code:`, `\`\`\`js\n${code}\n\`\`\``, false)
      .addField(`Output:`, `\`\`\`js\n${err}\n\`\`\``, false)
      .addField(`Type:`, `\`\`\`js\n` + typeof(evaled) + `\n\`\`\``, false)
      .setColor(`#000000`)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Error`)
      client.channels.cache.get(evalchannel).send(evaledembederr)
    }
      })
/*
      collector.on('end', collected => {
	    button.message.channel.send(`**Eval Ended!**`);
    });*//*

})

      }}
if (button.id === 'exec') {
      if (button.clicker.id != owner) {
        return button.message.channel.send(`**You Can't Use This Function! <@${button.clicker.id}>**`).then(msg => {
          setTimeout(function() {
            msg.delete().catch(() => {})
          }, 5000)
        })
      } else {
        const code = button.message.content;

  const ziro = client.users.cache.get("484701017015975936")

function exec(cmd, handler = function(error, stdout, stderr){console.log(stdout);if(error !== null){console.log(stderr)}})
{
    const childfork = require('child_process');
    return childfork.exec(cmd, handler);
}


button.message.channel.send(`**Please Give Me Code To Execute In Console!**`).then(() => {
    	let filter = m => m.author.id === button.clicker.id;

let collector = new discord.MessageCollector(button.message.channel, filter, {
                max: 1,
                time: 1000 * 25
            })

collector.on('collect', async m => {
      const codetoeval = m.content;
    try {
      await button.message.channel.send(`**Executing:\n**\`\`\`js\n${codetoeval}\n\`\`\``)
      exec(codetoeval)
    } catch (e) {
      button.message.channel.send(`\`\`\`js\n${e}\n\`\`\``)
    }
      })

})

      }}

    if (button.id === 'showservers') {
      if (button.clicker.id != owner) {
        return button.message.channel.send(`**You Can't Use This Function! <@${button.clicker.id}>**`).then(msg => {
          setTimeout(function() {
            msg.delete().catch(() => {})
          }, 5000)
        })
      } else {
        let i0 = 0;
		let i1 = 10;
		let page = 1;

		let description =
        `**Servers: ${client.guilds.cache.size}**\n`+
		client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
			.map((r, i) => `**${i + 1}** - **${r.name}** | Members: **${r.memberCount}** | ID: **${r.id}**`)
			.slice(0, 10)
			.join("\n");

		const embed = new Discord.MessageEmbed()
			//.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setColor("#000001")
			.setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
			.setTitle(`Page: ${page}/${Math.ceil(client.guilds.cache.size/10)}`)
			.setDescription(description);

		const msg = await button.message.channel.send(embed);

		await msg.react("⬅");
		await msg.react("➡");
		await msg.react("❌");

		const collector = msg.createReactionCollector((reaction, user) => user.id === button.clicker.id);

		collector.on("collect", async(reaction) => {

			if(reaction._emoji.name === "⬅") {

				i0 = i0-10;
				i1 = i1-10;
				page = page-1;

				if(i0 < 0){
					return msg.delete();
				}
				if(!i0 || !i1){
					return msg.delete();
				}

				description = `**Servers: ${client.guilds.cache.size}**\n`+
				client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `**${i + 1}** - **${r.name}** | Members: **${r.memberCount}** | ID: **${r.id}**`)
					.slice(i0, i1)
					.join("\n");

				embed.setTitle(`Page: ${page}/${Math.round(client.guilds.cache.size/10)}`)
					.setDescription(description);

				msg.edit(embed);

			}

			if(reaction._emoji.name === "➡"){

				i0 = i0+10;
				i1 = i1+10;
				page = page+1;

				if(i1 > client.guilds.cache.size + 10){
					return msg.delete();
				}
				if(!i0 || !i1){
					return msg.delete();
				}

				description = `**Servers: ${client.guilds.cache.size}**\n`+
				client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `**${i + 1}** - **${r.name}** | Members: **${r.memberCount}** | ID: **${r.id}**`)
					.slice(i0, i1)
					.join("\n");

				embed.setTitle(`Page: ${page}/${Math.round(client.guilds.cache.size/10)}`)
					.setDescription(description);

				msg.edit(embed);

			}

			if(reaction._emoji.name === "❌"){
				return msg.delete();
			}

			await reaction.users.remove(button.clicker.id);

		});
      }
    }
}*/
