const discord = require('discord.js')

module.exports = {
  name: "sudo",
  ownerOnly: true,
  description: "Sudo Command",
  usage: "z!sudo",
  category: "Owner",
  run: async (client, message, args, prefix) => {
    let user = message.mentions.users.first();
    let sudocmd = args[1];
    let sudoargs = message.content.split(' ').slice(3)
    if (!user) return message.lineReplyNoMention(`**Please Choose a User!**`);
    if (!sudocmd) return message.lineReplyNoMention(`**Choose a Command!**`);
    let messagetoexec = message;
    messagetoexec.author = user;
    messagetoexec.member = message.guild.members.cache.get(user.id)
    let cmdtoexec = client.commands.get(sudocmd);
    if (!cmdtoexec) cmdtoexec = client.commands.get(client.aliases.get(sudocmd));
    if (cmdtoexec) cmdtoexec.run(client, messagetoexec, sudoargs, prefix); else return message.lineReplyNoMention(`**Invalid Command!**`)
  }
}
