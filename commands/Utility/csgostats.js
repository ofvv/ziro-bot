const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    name: "csgostats",
    aliases: ["csgo", "steam", "steamstats"],
    category: "Utility",
    usage: "z!csgostats <STEAMID64>",
    description: "CS:GO Stats Command",
    run: async (client, message, args, prefix) => {

function getStatData(location , $){
          var selector = $('.segment-stats .value').eq(location).text();
          var stat_array = $.parseHTML(selector);
          var stat = 0;

          if(stat_array == null || stat_array.lengh == 0){
              return -1;
          }else{
              stat = stat_array[0].data;
          }

          return stat;
}
var UR_L = "https://tracker.gg/csgo/profile/steam/" + args[0] + "/overview";

const validid = new MessageEmbed()
.setColor(`#000001`)
.setDescription(`**Please Enter a Valid STEAMID64! You Can Get One [Here](https://steamid.io/) or [Here](https://steamcommunity.com/id/me/edit/info)**`)

if(!args[0]){
    return message.lineReplyNoMention(validid);
}

request(UR_L, function(err, resp, body){
    $ = cheerio.load(body);

const validid1 = new MessageEmbed()
  .setColor(`#000001`)
  .setDescription("**Make Sure Your Profile Is Not Private And Your STEAMID64 Is Valid! You Can Get One [Here](https://steamid.io/) or [Here](https://steamcommunity.com/id/me/edit/info)**")

    var KD = getStatData(0, $);
    if(KD == -1){
        return message.lineReplyNoMention(validid1);
    }

    var KILLS = getStatData(1, $);
    var WIN = getStatData(2, $);
    var MVP = getStatData(3, $);
    var HS = getStatData(4, $);
    var DEATHS = getStatData(5, $);
    var SCORE = getStatData(8, $);
    var MONEY = getStatData(9, $);
    var BS = getStatData(12, $);
    var BD = getStatData(13, $);
    var HR = getStatData(14, $);

    var embed = new Discord.MessageEmbed()
        .setTitle("**CSGO Stats**")
        //.setURL(UR_L)
        //.setDescription(`**CS:GO Stats**`)
        .addField(`Total KD:`, `\`\`\`yaml\n${KD}\n\`\`\``, true)
        .addField(`Total Win%:`, `\`\`\`yaml\n${WIN}\n\`\`\``, true)
        .addField(`Total MVPs:`, `\`\`\`yaml\n${MVP}\n\`\`\``, true)
        .addField(`Total Score:`, `\`\`\`yaml\n${SCORE}\n\`\`\``, true)
        .addField(`Total Kills:`, `\`\`\`yaml\n${KILLS}\n\`\`\``, true)
        .addField(`Total Deaths:`, `\`\`\`yaml\n${DEATHS}\n\`\`\``, true)
        .addField(`Total Bombs Planted:`, `\`\`\`yaml\n${BS}\n\`\`\``, true)
        .addField(`Total Bombs Defused:`, `\`\`\`yaml\n${BD}\n\`\`\``, true)
        .addField(`Total Headshots:`, `\`\`\`yaml\n${HS}\n\`\`\``, true)
        .addField(`Total Money Earned:`, `\`\`\`yaml\n${MONEY}\n\`\`\``, true)
        .addField(`Total Hostages Rescued:`, `\`\`\`yaml\n${HR}\n\`\`\``, true)
        .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`)
        //.addField("Powered by:", `**[tracker.gg/csgo](http://tracker.gg/csgo)**`, false)
        .setTimestamp()
        .setColor("#000001");

    message.lineReplyNoMention(embed);
})
}
}
