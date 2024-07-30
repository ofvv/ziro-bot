const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = {
    name: "reload",
    aliases: ["r"],
    ownerOnly: true,
    category: "Owner",
    usage: "z!reload <commmand>",
    description: "Reload Command",
    run: async (client, message, args, prefix) => {

      /*
      if(message.author.id != "484701017015975936") return message.lineReplyNoMention("An Error Has Occured | You Are Not The Bot Owner!")
      */

      /*
        const owner1 = client.users.cache.get("484701017015975936")
        const owner2 = client.users.cache.get("643009255372488704")

        let owners = ["484701017015975936", "643009255372488704"];

        if(!owners.includes(message.author.id)) return message.lineReplyNoMention(notowner)
     */
    /*
     const notowner = new MessageEmbed()
     .setDescription(`**An Error Has Occured | You Are Not The Bot Owner!**`)
     .setColor(`#000001`)

     const owner1 = client.users.cache.get("484701017015975936")
     const owner2 = client.users.cache.get("643009255372488704")

     let owners = ["484701017015975936", "643009255372488704"];

     if(!owners.includes(message.author.id)) return message.lineReplyNoMention(notowner)
*/
const plsselect = new MessageEmbed()
.setDescription(`**Please Select a Command To Reload!**`)
.setColor(`#000001`)

const notexist = new MessageEmbed()
.setDescription(`**That Command Doesn't Exist!**`)
.setColor(`#000001`)

if (!args[0]) return message.lineReplyNoMention(plsselect);

const commandName = args[0].toLowerCase();

const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

if (!command) return message.lineReplyNoMention(notexist);

	readdirSync(join(__dirname, "..")).forEach(f => {
		const files = readdirSync(join(__dirname, "..", f));
		if (files.includes(`${commandName}.js`)) {
			const file = `../${f}/${commandName}.js`;
			try {
				delete require.cache[require.resolve(file)];
				client.commands.delete(commandName);
				const pull = require(file);
				client.commands.set(commandName, pull);
        const success1 = new MessageEmbed()
        .setDescription(`**Successfully Reloaded:** \`${commandName}.js\`!`)
        .setColor(`#000001`)

				return message.lineReplyNoMention(success1);
			} catch (err) {
        const failed1 = new MessageEmbed()
        .setDescription(`**Could Not Reload:** \`${args[0].toUpperCase()}\`!`)
        .setColor(`#000001`)
				message.lineReplyNoMention(failed1);
				//return console.log(err.stack || err);
			}
		}
	})
 }
}
