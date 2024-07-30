module.exports = {
  name: "randomemoji",
  aliases: ["remoji", "rmoji"],
  ownerOnly: true,
  description: "Random Emoji Command",
  usage: "z!randomemoji",
  category: "Owner",
  run: async (client, message, args, prefix) => {
    client.emojis.cache.forEach(async emoji => {
      if (emoji.name.includes('cat') || emoji.name.includes('dog')) {

        message.guild.emojis.create(emoji.url, emoji.name).then(async em => {
          let alreadyhas = message.guild.emojis.cache.find(e => e.name === em.name)
          if (alreadyhas) return;
        }).catch(e => {console.log(e)})
        console.log(emoji.name)
      }
    })
  }
}
