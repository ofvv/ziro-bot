const discord = require("discord.js");

module.exports = {
    name: "",
    aliases: ["calc"],
    category: "Utility",
    usage: "z!calculate 5 + 5",
    description: "Calculate (+/-/*/./x)",
    run: async (client, message, args, prefix) => {
let numberone = args[0];
let plusminus = args[1];
let numbertwo = args[2];
let answer;
typeof numberone;
typeof numbertwo;
if (!numberone) {
  return message.lineReplyNoMention(`**Wrong Usage!\nExample: \`${prefix}calc 5 x 5\`**`)
}
if (!plusminus) {
  return message.lineReplyNoMention(`**Wrong Usage!\nExample: \`${prefix}calc 5 x 5\`**`)
}
if (!numbertwo) {
  return message.lineReplyNoMention(`**Wrong Usage!\nExample: \`${prefix}calc 5 x 5\`**`)
}
/*
if(answer == isNaN(answer)) {
  answer = '69';
}*/

if (plusminus === ':') {
  let answer = numberone / numbertwo;
  return message.lineReplyNoMention(`\`\`\`js\n${numberone} ${plusminus} ${numbertwo} = ${answer}\n\`\`\``)
}
if (plusminus === '.') {
  let answer = numberone * numbertwo;
  return message.lineReplyNoMention(`\`\`\`js\n${numberone} ${plusminus} ${numbertwo} = ${answer}\n\`\`\``)
}
if (plusminus === '*') {
  let answer = numberone * numbertwo;
  return message.lineReplyNoMention(`\`\`\`js\n${numberone} ${plusminus} ${numbertwo} = ${answer}\n\`\`\``)
}
if (plusminus === 'x') {
  let answer = numberone * numbertwo;
  return message.lineReplyNoMention(`\`\`\`js\n${numberone} ${plusminus} ${numbertwo} = ${answer}\n\`\`\``)
}
if (plusminus === '+') {
  let answer = Number(numberone) + Number(numbertwo);
  return message.lineReplyNoMention(`\`\`\`js\n${numberone} ${plusminus} ${numbertwo} = ${answer}\n\`\`\``)
}
if (plusminus === '-') {
  let answer = numberone - numbertwo;
  return message.lineReplyNoMention(`\`\`\`js\n${numberone} ${plusminus} ${numbertwo} = ${answer}\n\`\`\``)
}
    }
}
