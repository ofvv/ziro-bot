const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js");
const { evalchannel } = require("../../config.json");

module.exports = {
  name: "eval",
  ownerOnly: true,
  description: "Eval Command",
  usage: "z!eval",
  category: "Owner",
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

  const code = args.join(" ");

  const ziro = client.users.cache.get("484701017015975936")

 const no = new Discord.MessageEmbed()
    .setDescription("No Thanks!")
    .setColor("#000000");


if(message.content.includes(client.token || config.token || child.process || config)) {
  message.lineReplyNoMention(no);
}

if(code.length === 0) {
    const givecode = new Discord.MessageEmbed()
    .setDescription("**Please Give me Code to Eval!**")
    //.setFooter("Ziro-Bot 2021 ©")
    .setColor("#000000")
    return message.lineReplyNoMention(givecode);
}
    try {

      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        //ziro.send(evaled, { split: true, code: true }); //message.lineReplyNoMention(evaled, { split: true, code: true });
        const evaledembed = new MessageEmbed()
        .addField(`Code:`, `\`\`\`js\n${code}\n\`\`\``, false)
        .addField(`Output:`, `\`\`\`js\n${evaled}\n\`\`\``, false)
        .addField(`Type:`, `\`\`\`js\n` + typeof(evaled) + `\n\`\`\``, false)
        .setColor(`#000000`)
        .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Success`)
        //client.channels.cache.get('808019176257486938').send(`\`\`\`js\n${evaled}\n\`\`\``) //evaled, { split: true, code: true }
        //client.channels.cache.get('808019176257486938').send(`\`\`\`js\n` + typeof(evaled) + `\n\`\`\``)
        client.channels.cache.get(evalchannel).send(evaledembed)
    } catch (err) {
      //ziro.send(err, { split: true, code: true }); //message.lineReplyNoMention(evaled, { split: true, code: true });
      //client.channels.cache.get('808019176257486938').send(`\`\`\`js\n${err}\n\`\`\``) //err, { split: true, code: true }
      //client.channels.cache.get('808019176257486938').send(`\`\`\`js\n` + typeof(evaled) + `\n\`\`\``)
      const evaledembederr = new MessageEmbed()
      .addField(`Code:`, `\`\`\`js\n${code}\n\`\`\``, false)
      .addField(`Output:`, `\`\`\`js\n${err}\n\`\`\``, false)
      .addField(`Type:`, `\`\`\`js\n` + typeof(evaled) + `\n\`\`\``, false)
      .setColor(`#000000`)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Error`)
      //client.channels.cache.get('808019176257486938').send(`\`\`\`js\n${evaled}\n\`\`\``) //evaled, { split: true, code: true }
      //client.channels.cache.get('808019176257486938').send(`\`\`\`js\n` + typeof(evaled) + `\n\`\`\``)
      client.channels.cache.get(evalchannel).send(evaledembederr)
    }

}}
