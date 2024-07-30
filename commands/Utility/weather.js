const discord = require("discord.js");
const weather = require('weather-js');

module.exports = {
name: "weather",
  description: "Weather Command",
  category: "Utility",
  usage: "z!weather [city]",
  run: async (client, message, args, prefix) => {

    if (!args.join(" ")) {
        let embed = new discord.MessageEmbed()
        .setColor("#000000")
        .setDescription("**Please Provide a Valid Location!**")
        return message.lineReplyNoMention(embed);
    }

    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      try {

        let embed = new discord.MessageEmbed()
        .setTitle(`Weather - ${result[0].location.name}`)
        .setColor("#000000")
        //.setDescription("**Real Time Weather**")
        .addField("Temperature", `${result[0].current.temperature} Celcius`, true)
        .addField("Sky Text", result[0].current.skytext, true)
        .addField("Humidity", result[0].current.humidity, true)
        .addField("Wind Speed", result[0].current.windspeed, true)
        .addField("Observation Time", result[0].current.observationtime, true)
        .addField("Wind Display", result[0].current.winddisplay, true)
        .setThumbnail(result[0].current.imageUrl);
           message.lineReplyNoMention(embed)
        } catch (err) {
        let errem = new discord.MessageEmbed()
        .setColor("#000000")
        .setDescription("**Please Provide a Valid Location!**")
        return message.lineReplyNoMention(errem);
            }
    });
  }
}
