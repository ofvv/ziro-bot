const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "",
    options: [
        {
          name: "",
          description: "",
          type: 6,
          required: true
        }
      ],
    description: "Hack Someone",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      let userid;

      if (args) {
        userid = args.find(u => u.name).value
      } else userid = interaction.member.user.id

      let user = client.users.cache.get(userid) || client.users.cache.get(interaction.member.user.id)

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

          const hacked = new MessageEmbed()
          .setColor("#000001")
          .setDescription(`**Hack Completed!**`)
          .addField(`Username:`, `${user.username}`, true)
          .addField(`Email:`, `${user.username}@${emails}`, true)
          .addField(`Password:`, `${nums}${passwords}${abc}`, true)
          //.addField(`Google Account:`, `${Member.username}@${emails}:${passwords}`, true)
          .addField(`Last DM:`, `${lastdm}`, true)
          .addField(`Most Common Word:`, `${commonword}`, true)
          .addField(`Epic Games Account:`, `${fortniter}@${emails1}:${fortnitepass}`, true)
          .addField(`Minecraft Account:`, `${user.username}:${mcpass}`, true)
          .addField(`IP:`, `${ip}`, true)
          .addField(`Favorite Emoji:`, `${emoji}`, true)
          .setFooter(`${client.user.username} ${new Date().getFullYear()} © | ${user.tag} Was Hacked By ${client.users.cache.get(interaction.member.user.id).tag} | All Of The Info Is Not Real!`)


    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: await createAPIMessage(interaction, hacked)
      }
    });
    }
  }
