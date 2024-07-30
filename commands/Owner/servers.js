const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js");
const sourcebin = require("sourcebin_js");

module.exports = {
  name: "servers",
  aliases: ["serverlist"],
  ownerOnly: true,
  description: "Servers Command",
  usage: "z!servers",
  category: "Owner",
  run: async (client, message, args, prefix) => {
/*
    const notowner = new MessageEmbed()
    .setDescription(`**An Error Has Occured | You Are Not The Bot Owner!**`)
    .setColor(`#000001`)

    const owner1 = client.users.cache.get("484701017015975936")
    const owner2 = client.users.cache.get("540520449852047391")

    let owners = ["484701017015975936", "540520449852047391"];

    if(!owners.includes(message.author.id)) return message.lineReplyNoMention(notowner)

   console.log(`${message.author.tag} Used "z!servers" in ${message.guild.name}`)

*/
    let choice = args[0];
    if (!choice) {
      return message.lineReplyNoMention(`**Please Choose a Method!**\n\`sourcebin\`\n\`file\`\n\`embed\``)
    }

    if (choice === 'embed') {
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

		const msg = await message.lineReplyNoMention(embed);

		await msg.react("⬅");
		await msg.react("➡");
		await msg.react("❌");

		const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

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

			await reaction.users.remove(message.author.id);

		});
    } else if (choice === 'sourcebin') {
      sourcebin.create([
            {
                name: 'Ziro-Bot',
                content: client.guilds.cache.map(guild => `Name: ${guild.name} | ID: ${guild.id} | Members: ${guild.memberCount} | Roles: ${guild.roles.cache.size} | Channels: ${guild.channels.cache.size} | Created at: ${guild.createdAt} |`).join('\n'),
                languageId: 'txt'
            }
        ]).then(src => {
            message.lineReplyNoMention(`**Here is The Link For The List Of Servers Im In => ${src.url}**`)
        }).catch(e => {
            let embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`An Error Has Occured\n${e}`);

            message.lineReplyNoMention(embed);
        });
    } else if (choice === 'file') {
      let content =  client.guilds.cache.map(guild => `N: ${guild.name} | ID: ${guild.id} | M: ${guild.memberCount} | R: ${guild.roles.cache.size} | C: ${guild.channels.cache.size} |`).join('\n')
  let attachment = Buffer.from(content);
  message.lineReplyNoMention({
  files: [
  {
  name: `${client.user.username}_servers.txt`,
  attachment: attachment
  }]})
    }
 }
}
