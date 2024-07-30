const { MessageEmbed } = require("discord.js");
const answers = [
    "Yes.",
    "No.",
    "Most likely.",
    "I Don't Know!",
    //"Maybe sometime",
    //"Outlook good.",
    //"Signs point to yes.",
    "Definitely",
    "Absolutely",
    //"Nope.",
    //"No thanks, I won’t be able to make it.",
    "No Way!",
    //" It is certain.",
    //"It is decidedly so.",
    //"Without a doubt.",
    //"Yes - definitely.",
    //"You may rely on it.",
    "As I see it, yes."
]

module.exports = {
    name: "8ball",
    description: "8Ball Command",
    category: "Fun",
    run: (client, message, args, prefix) => {
        const question = args.join(" ");

        if (!question) return message.lineReplyNoMention("**Please Ask a Question!**");

        const answer = answers[Math.floor(Math.random() * answers.length)];

        const embed = new MessageEmbed()
            //.setDescription("8Ball")
            .addField("Your Question:", `\`\`\`yaml\n${question}\n\`\`\``, true)
            .addField("My Answer:", `\`\`\`yaml\n${answer}\n\`\`\``, true)
            .setColor("#000001")
            .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
            .setTimestamp();

        message.lineReplyNoMention(embed);
    }
};
