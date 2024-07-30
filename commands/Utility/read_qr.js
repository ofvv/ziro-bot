const discord = require("discord.js");
const request = require('node-superfetch');

module.exports = {
    name: "read_qr",
    aliases: ["read_qr_code", "readqr"],
    category: "Utility",
    usage: "z!read_qr <imagelink>",
    description: "Read a QR Code",
    run: async (client, message, args, prefix) => {
      function shorten(text, maxLen = 2000) {
		  return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	    }
      let image = args.join(" ")
      if (!image) {
        return message.lineReplyNoMention(`**Please Give Me a QR-Code!\nExample: ${prefix}read_qr <imagelink>**`)
      }
      try {
      			const { body } = await request
      				.get('https://api.qrserver.com/v1/read-qr-code/')
      				.query({ fileurl: image });
      			const data = body[0].symbol[0];
      			if (!data.data) return message.lineReplyNoMention(`**I Don't Recognize This QR-Code!**\n\`${data.error}\``);
      			return message.lineReplyNoMention(shorten(data.data, 2000 - (message.author.toString().length + 2)));
      		} catch (err) {
      			return message.lineReplyNoMention(err);
      		}
        }
}
