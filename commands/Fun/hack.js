const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "hack",
  category: "Fun",
  description: "Hack Command",
  usage: "z!hack <user>",
  run: async (client, message, args, prefix) => {

            let pass = Math.floor(Math.random() * 28);

            let commons = [
              "Bot",
              "Discord",
              "Lonely",
              "Hello",
              "Plsreply",
              "Hi",
              "Sup",
              "Ziro-Bot",
              "Ziro",
              "Bye",
              "gn",
              "gm",
              "Epic"
            ]

            let commonword = commons[Math.floor(Math.random() * commons.length)]

            let lastdms = [
              "Can You Please Reply :( Im Lonely",
              "Pls Reply Im Lonely :((",
              "Im Sad And Lonely :(",
              "How Do I Make a Hack Command Like Ziro-Bot?",
              "How To Make a Discord Bot?",
              "Plese Be My Girlfriend",
              "Give Me Nitro",
              "I Beg You Please Be My Girlfriend",
              "Send Me Money Pls",
              "Im Bad at Fortnite :(",
              "Im Bad at Minecraft :("
            ]

            let lastdm = lastdms[Math.floor(Math.random() * lastdms.length)]

            //let password = passwords1[Math.floor(Math.random() * passwords1.length)]

            let email = [
              "ziroservices.com",
              "ziromails.com",
              "zirodev.com",
              "ziro.com",
              "zirobotdev.com",
              "ziroiscool.com",
              "zirocore.com",
              "ziro2020.com",
              "ziromail.com",
              "yahoo.com",
              "gmail.com",
              "mail.com",
              "zirobot.tk",
              "engineer.com",
              "programmer.net",
              "web.dev",
              "bot.dev",
              "i.sell.boats"
            ]

            let emails = email[Math.floor(Math.random() * email.length)]

            let email1 = [
              "ziroservices.com",
              "ziromails.com",
              "zirodev.com",
              "ziro.com",
              "zirobotdev.com",
              "ziroiscool.com",
              "zirocore.com",
              "ziro2020.com",
              "ziromail.com",
              "yahoo.com",
              "gmail.com",
              "mail.com",
              "zirobot.tk",
              "engineer.com",
              "programmer.net",
              "web.dev",
              "bot.dev",
              "i.sell.boats"
            ]

            let emails1 = email1[Math.floor(Math.random() * email1.length)]

            let fortniters = [
              "epicfortniter",
              "epicgamer",
              "ninja",
              "bruhmomentgamer",
              "banana1",
              "fortnite",
              "fortniteL",
              "fortnitewinner",
              "fortniteloser",
              "fortniteplayer"
            ]

            let fortniter = fortniters[Math.floor(Math.random() * fortniters.length)]

            let passwords = Math.random()
              .toString(36)
              .toLowerCase()
              .substr(2, pass);

            let ips = [
              "192.168.0.1",
              "192.168.1.1",
              "192.168.1.0",
              "123.123.123.1",
              "456.457.458.1",
              "420.69.000.1",
              "69.420.111.1",
              "404.420.690.1"
            ]

            let ip = ips[Math.floor(Math.random() * ips.length)]

            let abcs = [
              "ab",
              "cd",
              "ef",
              "gh",
              "ij",
              "kl",
              "mn",
              "op",
              "qr",
              "st",
              "uv",
              "w",
              "xyz"
            ]

            let abc = abcs[Math.floor(Math.random() * abcs.length)]

            let numbers = [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "02",
              "13",
              "24",
              "37",
              "46",
              "59",
              "60",
              "72",
              "81",
              "93",
              "04"
            ]

            let nums = numbers[Math.floor(Math.random() * numbers.length)]

            let emojis = [
              "😅",
              "😳",
              "🤔",
              "😔",
              "😂",
              "😩",
              "😹",
              "😃",
              "😄"
            ]

            let emoji = emojis[Math.floor(Math.random() * emojis.length)]

            let minecrafss = [
              "minecraftispog",
              "minecraftepic",
              "iloveskywars",
              "ilovebedwars",
              "ilovebuildwars",
              "ilovenotch",
              "ilovemcegirls",
              "ilikejeb_"
            ]

            let mcpass = minecrafss[Math.floor(Math.random() * minecrafss.length)]

            let fortpasswords = [
              "fortniterforever1",
              "ninjaiscool123",
              "imagoodbuilder7",
              "fortnitedancerL!",
              "bestfortniter3",
              "imcringelol1",
              "fortniteisbad12",
              "forniteisgood1",
              "epiclol1",
              "imepic1",
              "bruh2020",
              "bruh2021",
              "bruh2019"
            ]

            let fortnitepass = fortpasswords[Math.floor(Math.random() * fortpasswords.length)]

            let Member =
              message.mentions.users.first() ||
              message.guild.member(args[0]) ||
              message.author;

            if (!Member)
              return message.lineReplyNoMention(
                `Please Mention A Member That You Want To Hack!`
              );

            if (Member.id === message.author.id)
              return message.lineReplyNoMention(`Please Mention a User To Hack!`);

        message.lineReplyNoMention({embed: {description: `**Starting (1%)**`, color: "#000001"}}).then(m => {
          const embed1 = new MessageEmbed()
          .setDescription(`**Getting Username (25%)**`)
          .setColor("#000001")
          setTimeout(function() {
          m.edit(embed1)
        }, 3000);
          //m.edit(embed1).catch(e => message.lineReplyNoMention(e)).then(m=> {
            const embed2 = new MessageEmbed()
            .setDescription(`**Getting Password (50%)**`)
            .setColor("#000001")
            setTimeout(function() {
            m.edit(embed2)
          }, 6000);

          const embedtr = new MessageEmbed()
          .setDescription(`**Injecting a Trojan (69%)**`)
          .setColor("#000001")
          setTimeout(function() {
          m.edit(embedtr)
        }, 7500);

          const embed3 = new MessageEmbed()
          .setDescription(`**Getting Email Username And Provider (75%)**`)
          .setColor("#000001")
          setTimeout(function() {
          m.edit(embed3)
        }, 9000);
          //  m.edit(embed2).catch(e => message.lineReplyNoMention(e)).then(m=> {
              const embed4 = new MessageEmbed()
              .setDescription(`**Getting Other Info (100%)**`)
              .setColor("#000001")
              setTimeout(function() {
              m.edit(embed4)
            }, 12000);
              //m.edit(embed3).catch(e => message.lineReplyNoMention(e)).then(m => {
                const hacked = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`**Hack Completed!**`)
                .addField(`Username:`, `${Member.username}`, true)
                .addField(`Email:`, `${Member.username}@${emails}`, true)
                .addField(`Password:`, `${nums}${passwords}${abc}`, true)
                //.addField(`Google Account:`, `${Member.username}@${emails}:${passwords}`, true)
                .addField(`Last DM:`, `${lastdm}`, true)
                .addField(`Most Common Word:`, `${commonword}`, true)
                .addField(`Epic Games Account:`, `${fortniter}@${emails1}:${fortnitepass}`, true)
                .addField(`Minecraft Account:`, `${Member.username}:${mcpass}`, true)
                .addField(`IP:`, `${ip}`, true)
                .addField(`Favorite Emoji:`, `${emoji}`, true)
                .setFooter(`${client.user.username} ${new Date().getFullYear()} © | ${Member.tag} Was Hacked By ${message.author.tag} | All Of The Info Is Not Real!`)
                setTimeout(function() {
                m.edit(hacked)
              }, 15000);
              const done = new MessageEmbed()
              .setColor("#000001")
              .setDescription(`**Hack Completed!**`)
              setTimeout(function() {
              m.edit(done)
            }, 30000);
            //    m.edit(hacked).catch(e => message.lineReplyNoMention(e))
              })
            //})
          //})
        //})
  }
};
