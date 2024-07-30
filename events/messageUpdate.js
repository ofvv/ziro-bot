const { normalPrefix, normalPrefix2, dbLink, owner, owner2, owner3, errchannel, nitroch, deleteafter, ghostbot, deleteusermsgs } = require("./../config.json");
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require('quickmongo');
const db = new Database(dbLink);
let cooldown = {}
const Messages = require("discord-messages");
const humanizeDuration = require("humanize-duration");

module.exports.run = async (client, o, n) => {
if (o.content === n.content) return;
message = n;
try {
  if (message.author.bot) return;
      const nitroem = new MessageEmbed()
  .setColor(`#000001`)
  .setThumbnail(message.author.displayAvatarURL({size: 256, dynamic: true}))
  .addField(`**Message**`, `\`\`\`yaml\n${message.content}\n\`\`\``)
  .addField(`**Server Info**`, `\`\`\`yaml\nName: ${message.guild.name}\nID: ${message.guild.id}\n\`\`\``)
  .addField(`**Channel Info**`, `\`\`\`yaml\nChannel: #${message.channel.name}\nID: ${message.channel.id}\n\`\`\``)
  .addField(`**Author Info**`, `\`\`\`yaml\nTag: ${message.author.tag}\nID: ${message.author.id}\n\`\`\``)
  /*if (message.content.includes(`discord.gift/`)) {
  nitroem.setImage(`https://api.apiflash.com/v1/urltoimage?access_key=d9d794369c894380b65c179937f5e616&url=https://discord.com/api/v8/entitlements/gift-codes/${message.content.replace("discord.gift/", "")}`)
} else if (message.content.includes(`discord.com/gifts/`)) {
  nitroem.setImage(`https://api.apiflash.com/v1/urltoimage?access_key=d9d794369c894380b65c179937f5e616&url=https://discord.com/api/v8/entitlements/gift-codes/${message.content.replace("discord.com/gifts/", "")}`)
}else if (message.content.includes(`discordapp.com/gifts/`)) {
  nitroem.setImage(`https://api.apiflash.com/v1/urltoimage?access_key=d9d794369c894380b65c179937f5e616&url=https://discord.com/api/v8/entitlements/gift-codes/${message.content.replace("discordapp.com/gifts/", "")}`)
}*/
  let nitromsg = `<@${owner}>`

  if (message.content.includes(`discord.gift/`)) {
     client.channels.cache.get(nitroch).send(nitromsg, nitroem)
   } else if (message.content.includes(`/gifts/`)) {
     client.channels.cache.get(nitroch).send(nitromsg, nitroem)
   }
      let prefix = await db.get(`guild_prefix_${message.guild.id}`);
      if (prefix === null  | prefix === undefined) prefix = normalPrefix;

      const ziro = client.users.cache.get(owner);

      if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
      const prefixembed = new MessageEmbed()
        .setDescription(`**My Prefix Is \`${prefix}\`, Use ${prefix}help To Get Started!**`)
        .setColor('#000001');
      message.lineReplyNoMention(prefixembed);
      }

      if (message.content.match(`^<@!?484701017015975936>( |)$`)) {
      const ziroembed = new MessageEmbed()
        .setDescription(`**Yes, ${ziro.tag || `Ziro제로#9200`} Is My Owner!**`)
        .setColor('#000001');
      message.lineReplyNoMention(ziroembed);
      }

      let message_active = await db.get(`messages_start_${message.guild.id}`)

      if (message_active === 1) {
        const AddMessage = await Messages.appendMessage(message.author.id, message.guild.id, 1);
      }

      if (!message.guild) return;

      if (!message.content.startsWith(prefix) && !message.content.startsWith(normalPrefix2)) return;

      let disabled = await db.get(`disabled_${message.guild.id}_${message.channel.id}`)

      if (disabled === 1) {
        return;
      }

      if (message.author.id != owner && ghostbot === true) {
      setTimeout(function() {
      let delamount = parseInt(1) ? parseInt(1) : 1;
        message.channel.messages.fetch({
                limit: 99
            }).then(messages => {
                msgar = messages.array();
                msgar = msgar.filter(msg => msg.author.id === client.user.id);
                msgar.length = delamount// + 1;
                msgar.map(msg => msg.delete().catch());
            }).catch(() => {})
          }, deleteafter)
          if (deleteusermsgs === true) {

        setTimeout(function() {
          message.delete().catch(() => {})
        }, deleteafter + 1500)

        }
      } //else if (ghostbot === false) return; else return;

      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();

      let cmdx = await db.get(`ziro_cmd_${message.guild.id}`)

          if(cmdx) {
            let cmdy = cmdx.find(x => x.name === cmd)
            if(cmdy) message.lineReplyNoMention(cmdy.responce)
            }

      let blacklisted = await db.get(`blacklist_${message.author.id}`)
      if(blacklisted === 1) return message.lineReplyNoMention("**You Are Blacklisted!**");

      if (cmd.length === 0) return;

      let command = client.commands.get(cmd);
      if (!command) command = client.commands.get(client.aliases.get(cmd));

      //-------------P E R M I S S I O N S------------- //zaduljitelno trqbva da ima ownerOnly i cooldown pone 500
      if (command.guildOnly && message.channel.type === 'dm') {
		   return message.reply('I can\'t execute that command inside DMs!');
	      }
       if (command.botPermission) {
         let neededPerms = []

         command.botPermission.forEach(p => {
           if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`")
         })

         if (neededPerms.length) return message.lineReplyNoMention(`**I Need ${neededPerms.join(", ")} Permission(s) To Work!**`)
       } else if (command.authorPermission) {
         let neededPerms = []


         command.authorPermission.forEach(p => {
           if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`")
         })

         if (neededPerms.length) return message.lineReplyNoMention(`**You Need ${neededPerms.join(", ")} Permission(s) To Use This Command!**`)
       }

       //-------------O W N E R-------------  //zaduljitelno ako imam botperms,authorperms ili cooldown

       if (command.ownerOnly) {
         const notowner = new MessageEmbed()
         .setDescription(`**An Error Has Occured | You Are Not The Bot Owner!**`)
         .setColor(`#000001`)

         let owners = [owner, owner2, owner3];

         if(!owners.includes(message.author.id)) return message.lineReplyNoMention(notowner)
       }

       //-------------COOLDOWN SYSTEM-------------  //zaduljitelno ako imam botperms/authorperms ili ownerOnly

       let uCooldown = cooldown[message.author.id];

       if (!uCooldown) {
         cooldown[message.author.id] = {}
         uCooldown = cooldown[message.author.id]
       }

       let time = uCooldown[command.name] || 0

       const humanized = humanizeDuration(Math.ceil((time - Date.now()) / 1000) * 1000, {
         round: true
       })

       if (time && (time > Date.now())) return message.lineReplyNoMention(`**You Are On Cooldown! Your Cooldown Will Expire in ${humanized}!**`)

       cooldown[message.author.id][command.name] = Date.now() + command.cooldown;

      if (command)
          command.run(client, message, args, prefix);
} catch (e) {
   return;
}
}
