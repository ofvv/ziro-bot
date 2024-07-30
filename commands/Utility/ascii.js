const discord = require("discord.js");
const figlet = require("figlet");

module.exports = {
    name: "ascii",
    aliases: ["asciiart"],
    category: "Utility",
    usage: "z!ascii <text>",
    description: "ascii",
    run: async (client, message, args, prefix) => {

   let text = args.join(" ");
   if(!text) {
return message.lineReplyNoMention(`**Please Provide an Text to Convert To Ascii!**`)
}
   let maxlen = 18
if(text.length > 18) {
return message.lineReplyNoMention(`**Please Provide a Text Under 18 Characters!**`)
}

figlet(text, function(err, data) {
message.lineReplyNoMention(data, {
code: 'AsciiArt'
});
})

    }
};
