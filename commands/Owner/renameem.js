module.exports = {
  name: "renameemoji",
  aliases: [],
  ownerOnly: true,
  description: "Rename Emoji Command",
  usage: "z!renameemoji",
  category: "Owner",
  run: async (client, message, args, prefix) => {
    message.guild.emojis.cache.forEach(async emoji => {
      if (!emoji.startsWith('ziro_')) {
      emoji.edit({name: `ziro_${emoji.name}`}).then(a => console.log(emoji.name + ` => ` + a.name || 'idk')).catch(e => console.log(e))
      }
    })
  }
}
