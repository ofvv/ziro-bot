const discord = require("discord.js");
const request = require('node-superfetch');

module.exports = {
    name: "gender",
    aliases: ["analyze_g"],
    category: "Utility",
    usage: "z!gender <name>",
    description: "Analyze Gender",
    run: async (client, message, args, prefix) => {
      let name = args.join(" ")
      if (!name) {
        return message.lineReplyNoMention(`**Please Choose a Name!**`)
      }
      try {
    const { body } = await request
      .get(`https://api.genderize.io/`)
      .query({ name });
    if (!body.gender) return message.lineReplyNoMention(`**No Info For The Name: ${body.name}**`);
    return message.lineReplyNoMention(`**There Are ${Math.round(body.probability * 100)}% That ${body.name} Is a ${body.gender} Name!**`);
  } catch (err) {
    return message.lineReplyNoMention(err);
  }
        }
}
