const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");

const langs = ["afrikaans", "albanian", "amharic", "arabic", "armenian", "azerbaijani", "bangla", "basque", "belarusian", "bengali", "bosnian", "bulgarian", "burmese", "catalan", "cebuano", "chichewa", "corsican", "croatian", "czech", "danish", "dutch", "english", "esperanto", "estonian", "filipino", "finnish", "french", "frisian", "galician", "georgian", "german", "greek", "gujarati", "haitian creole", "hausa", "hawaiian", "hebrew", "hindi", "hmong", "hungarian", "icelandic", "igbo", "indonesian", "irish", "italian", "japanese", "javanese", "kannada", "kazakh", "khmer", "korean", "kurdish (kurmanji)", "kyrgyz", "lao", "latin", "latvian", "lithuanian", "luxembourgish", "macedonian", "malagasy", "malay", "malayalam", "maltese", "maori", "marathi", "mongolian", "myanmar (burmese)", "nepali", "norwegian", "nyanja", "pashto", "persian", "polish", "portugese", "punjabi", "romanian", "russian", "samoan", "scottish gaelic", "serbian", "sesotho", "shona", "sindhi", "sinhala", "slovak", "slovenian", "somali", "spanish", "sundanese", "swahili", "swedish", "tajik", "tamil", "telugu", "thai", "turkish", "ukrainian", "urdu", "uzbek", "vietnamese", "welsh", "xhosa", "yiddish", "yoruba", "zulu"];

module.exports = {
  name: "translate",
  description: "Translate Command",
  usage: "z!translate",
  category: "Utility",
  run: async (client, message, args, prefix) => {

if(args[0] === "languages"){
 const langsList = "```Css\n"+(langs.map((l, i) => `#${i+1} - ${l}`).join("\n"))+"```";
 const dmembed = new MessageEmbed()
 .setColor("#000001")
 .setTitle(`Here Are The Available Languages To Translate!`)
 .setDescription(langsList)
 .setFooter(`Requested By ${message.author.tag} (ID: ${message.author.id}) | (That's You!)`)
 message.lineReplyNoMention(dmembed).then(() => {
   //message.lineReplyNoMention("**Check Your DM!**");
 }).catch(() => {
   message.lineReplyNoMention(`**An Error Has Occured!**`)
   //client.channels.cache.get(errchannel).send(`**An Error Has Occured While DM-ing ${message.author.tag} (ID: ${message.author.id}) The Languages**`)
 });
 return;
}
/*
if(args[0] === "languages"){
 const langsList = "```Css\n"+(langs.map((l, i) => `#${i+1} - ${l}`).join("\n"))+"```";
 const dmembed = new MessageEmbed()
 .setColor("#000001")
 .setTitle(`Here Are The Available Languages`)
 .setDescription(langsList)
 .setFooter(`Requested By ${message.author.tag} (ID: ${message.author.id}) | (That's You!)`)
 message.author.send(dmembed).then(() => {
   message.lineReplyNoMention("**Check Your DM!**");
 }).catch(() => {
   message.lineReplyNoMention(`**I Can't DM You!**`)
   client.channels.cache.get(errchannel).send(`**An Error Has Occured While DM-ing ${message.author.tag} (ID: ${message.author.id}) The Languages**`)
 });
 return;
}*/

if(args[0] === "langs"){
  const langsList = "```Css\n"+(langs.map((l, i) => `#${i+1} - ${l}`).join("\n"))+"```";
  const dmembed = new MessageEmbed()
  .setColor("#000001")
  .setTitle(`Here Are The Available Languages To Translate!`)
  .setDescription(langsList)
  .setFooter(`Requested By ${message.author.tag} (ID: ${message.author.id}) | (That's You!)`)
  message.lineReplyNoMention(dmembed).then(() => {
    //message.lineReplyNoMention("**Check Your DM!**");
  }).catch(() => {
    message.lineReplyNoMention(`**An Error Has Occured!**`)
    //client.channels.cache.get(errchannel).send(`**An Error Has Occured While DM-ing ${message.author.tag} (ID: ${message.author.id}) The Languages**`)
  });
  return;
}

//const pWait = await console.log("translated", null, {
// prefixEmoji: "loading"
//});

if(!args[0]){
  const choose = new MessageEmbed()
  .setColor("#000001")
  .setDescription(`**Please Choose a Language!**`)
 return message.lineReplyNoMention("**Please Choose a Language!**", {
   prefix: prefix
 }, {
   edit: true
 });
}

if(!args[1]){
  const choose1 = new MessageEmbed()
  .setColor("#000001")
  .setDescription(`**Please Specify What Do You Want To Translate!**`)
 return message.lineReplyNoMention("**Please Specify What Do You Want To Translate!**", null, {
   edit: true
 });
}

const language = args[0].toLowerCase();
const toTranslate = args.slice(1).join(" ");

if(!langs.includes(language)){
  const choose2 = new MessageEmbed()
  .setColor("#000001")
  .setDescription(`**I Don't Recognize This Language!**`)
 return message.lineReplyNoMention("**I Don't Recognize This Language!**", {
   prefix: prefix,
   search: language
 }, {
   edit: true
 });
}

const translated = await translate(toTranslate, { to: language });

const resEmbed = new Discord.MessageEmbed()
 //.setAuthor("Translator", client.user.displayAvatarURL)
 .addField(translated.from.language.iso.charAt(0).toUpperCase() + translated.from.language.iso.slice(1), "\`\`\`yaml\n" + toTranslate + "\n\`\`\`") //translated.from.language.iso
 .addField(language.charAt(0).toUpperCase() + language.slice(1), "\`\`\`yaml\n" + translated.text + "\n\`\`\`")
 .setColor("#000001")
 .setFooter(`${client.user.username} ${new Date().getFullYear()} © | Requested By: ${message.author.tag} (ID: ${message.author.id}) | Translated With Google Translate!`);

return message.lineReplyNoMention(resEmbed);

}

}
