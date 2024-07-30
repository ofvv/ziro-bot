const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas')
const api = require("blueapi.js");
registerFont('BebasNeue-Regular.ttf', { family: 'BebasNeue-Regular' }) // arial

module.exports = {
    name: 'typerace',
    category: 'Fun',
    ownerOnly: false,
    description: 'Race Your Friends At Typing!',
    aliases: ['race', 'type'],
    usage: 'z!typerace',
    run: async (client, message, args, prefix) => {
      function millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
      let words = [
        "okdal",
        "asokl",
        "mklop",
        "ziroi",
        "levik",
        "psbhy",
        "ldtbj",
        "saqol",
        "jpysq",
        "lwesl",
        "ladko",
        "niki1",
        "jkadl",
        "lassd",
        "daksd",
        "dajsj",
        "ekdal",
        "djaio",
        "doaks",
        "djaio",
        "dasdk",
        "ajsoq",
        "dajss",
        "qkops",
        "oeqws",
        "adhus",
        "dashd",
        "aisod",
        "ajhds",
        "dahus",
        "adhos",
        "dio2e",
        "adsu1",
        "ads1m",
        "oiahd",
        "jidas",
        "adopn",
        "dabor",
        "adsio",
        "ao1sd",
        "o1h2m",
        "dioas",
        "asnio",
        "daosu",
        "mndkl",
        "lkmkj",
        "ohbpa",
        "bosad",
        "a21n3",
        "oi3bs",
        "bdouq",
        "an31o",
        "h12os",
        "o12bs",
        "nioq1",
        "nqbo1",
        "bo12s",
        "dabsu",
        "bosua",
        "banica",
        "saodo",
        "bsao1",
        "sao12",
        "idnsa",
        "asoid",
        "asob1",
        "anbo2",
        "hosid",
        "aduos",
        "p31pe",
        "0pesd",
        "djsap"
      ]
      let quotes = [
        "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
        "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
        "You only live once, but if you do it right, once is enough.",
        "In three words I can sum up everything I've learned about life: it goes on.",
        "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
        "If you tell the truth, you don't have to remember anything.",
        "A friend is someone who knows all about you and still loves you.",
        "Always forgive your enemies; nothing annoys them so much.",
        "To live is the rarest thing in the world. Most people exist, that is all.",
        "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        "Without music, life would be a mistake.",
        "It is better to be hated for what you are than to be loved for what you are not.",
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        "The way to get started is to quit talking and begin doing.",
        "If life were predictable it would cease to be life, and be without flavor.",
        "Life is what happens when you're busy making other plans.",
        "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
        "When you reach the end of your rope, tie a knot in it and hang on.",
        "Always remember that you are absolutely unique. Just like everyone else.",
        "Don't judge each day by the harvest you reap but by the seeds that you plant.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
        "It is during our darkest moments that we must focus to see the light.",
        "Whoever is happy will make others happy too.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
      ]
      let quote = quotes[Math.floor(Math.random() * quotes.length)]
      let word = words[Math.floor(Math.random() * words.length)]
      const option = args[0];
if (!option) {
  return message.lineReplyNoMention(`**Please Choose an Option! (${prefix}typerace quote(q) or ${prefix}typerace word(w))**`)
}
if (option === 'w') {
  let start = Date.now();
  const canvas = createCanvas(200, 70)
  const ctx = canvas.getContext('2d')
  ctx.font = "35px BebasNeue-Regular"
loadImage('https://cdn.discordapp.com/attachments/805837103464054815/820655307449172008/image.jpg').then((image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
       ctx.fillText(word, 70, 50)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'code.png')
        message.channel.send(`**You Have 5s To Type This Word!**`, attachment)
})
const filter = m => m.content.includes(word);
    message.channel.send(`**Started By ${message.author.tag} (ID: ${message.author.id})**`).then(() => {
    	message.channel.awaitMessages(filter, { max: 1, time: 5000 })
    		.then(collected => {
          let end = Date.now();
          let took = end - start
          const taken = millisToMinutesAndSeconds(took);
    			message.channel.send(`**<@${collected.first().author.id}> Typed \`${word}\` First! Time Taken: ${taken}**`); //**\`${word}\` Was Typed \`${collected.size}\` Time(s)!**\n
    		})
    		.catch(collected => {
    			message.channel.send(`**Nobody Typed \`${word}\`!**`);
    		});
    });
}
if (option === 'word') {
  let start = Date.now();
  const canvas = createCanvas(200, 70)
  const ctx = canvas.getContext('2d')
  ctx.font = "35px BebasNeue-Regular"
loadImage('https://cdn.discordapp.com/attachments/805837103464054815/820655307449172008/image.jpg').then((image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
       ctx.fillText(word, 70, 50)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'code.png')
        message.channel.send(`**You Have 5s To Type This Word!**`, attachment)
})
const filter = m => m.content.includes(word);
    message.channel.send(`**Started By ${message.author.tag} (ID: ${message.author.id})**`).then(() => {
    	message.channel.awaitMessages(filter, { max: 1, time: 5000 })
    		.then(collected => {
          let end = Date.now();
          let took = end - start
          const taken = millisToMinutesAndSeconds(took);
    			message.channel.send(`**<@${collected.first().author.id}> Typed \`${word}\` First! Time Taken: ${taken}**`); //**\`${word}\` Was Typed \`${collected.size}\` Time(s)!**\n
    		})
    		.catch(collected => {
    			message.channel.send(`**Nobody Typed \`${word}\`!**`);
    		});
    });
}

if (option === 'q') {
  let start = Date.now();
  const canvas = createCanvas(1400, 60)
  const ctx = canvas.getContext('2d')
  ctx.font = "28px BebasNeue-Regular"
loadImage('https://cdn.discordapp.com/attachments/805837103464054815/820655307449172008/image.jpg').then((image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
       ctx.fillText(quote, 15, 40)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'code.png')
        message.channel.send(`**You Have 60s To Type This Quote!**`, attachment)
        const filter = m => m.content.includes(quote);
            message.channel.send(`**Started By ${message.author.tag} (ID: ${message.author.id})**`).then(() => {
            	message.channel.awaitMessages(filter, { max: 1, time: 60000 })
            		.then(collected => {
                  let end = Date.now();
                  let took = end - start
                  const taken = millisToMinutesAndSeconds(took);
            			message.channel.send(`**<@${collected.first().author.id}> Typed The Quote First! Time Taken: ${taken}**`); //**\`${word}\` Was Typed \`${collected.size}\` Time(s)!**\n
            		})
            		.catch(collected => {
            			message.channel.send(`**Nobody Typed This Quote!**`);
            		});
            });
})
}
if (option === 'quote') {
  let start = Date.now();
  const canvas = createCanvas(1400, 60)
  const ctx = canvas.getContext('2d')
  ctx.font = "28px BebasNeue-Regular"
loadImage('https://cdn.discordapp.com/attachments/805837103464054815/820655307449172008/image.jpg').then((image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
       ctx.fillText(quote, 15, 40)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'code.png')
        message.channel.send(`**You Have 60s To Type This Quote!**`, attachment)
        const filter = m => m.content.includes(quote);
            message.channel.send(`**Started By ${message.author.tag} (ID: ${message.author.id})**`).then(() => {
            	message.channel.awaitMessages(filter, { max: 1, time: 60000 })
            		.then(collected => {
                  let end = Date.now();
                  let took = end - start
                  const taken = millisToMinutesAndSeconds(took);
             			message.channel.send(`**<@${collected.first().author.id}> Typed The Quote First! Time Taken: ${taken}**`); //**\`${word}\` Was Typed \`${collected.size}\` Time(s)!**\n
            		})
            		.catch(collected => {
            			message.channel.send(`**Nobody Typed This Quote!**`);
            		});
            });
})
}
}
}
/*const collector = message.channel.createMessageCollector(filter, { time: 10000 });

collector.on('collect', m => {
	//console.log(`Collected ${m.content}`);
  const em = new MessageEmbed()
  .setDescription(`**Collecting: ${m.content}**`)
  //message.channel.send(em)
});

  collector.on('end', collected => {
	message.channel.send(`**\`${word}\` Was Typed \`${collected.size}\` Time(s)!**\n**\`${collected.first().author.username}\` Typed \`${word}\` First!**`);
}).then(collected => console.log(collected.size)).catch(collected => {
			message.channel.send(`**Nobody Typed \`${word}\`**`);
		});*/
