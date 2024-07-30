const { normalPrefix, normalPrefix2, dbLink, owner, owner2, owner3, errchannel, nitroch, deleteafter, ghostbot, deleteusermsgs } = require("./../config.json");
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require('quickmongo');
const db = new Database(dbLink);
let cooldown = {}
const Messages = require("discord-messages");
const humanizeDuration = require("humanize-duration");

module.exports.run = async (client, message) => {
  try {
    //-------------SNIPING-------------
    let snipe = {}
    if (!message.guild) snipe.channel = {
      name: `DMs - ${client.user.username}`,
      id: client.user.id
    };
    else snipe.channel = message.channel;
    if (!message.guild) snipe.guild = {
      name: `DMs - ${client.user.username}`,
      id: client.user.id
    };
    else snipe.guild = message.guild;
    //-------------SNIPE EMBED-------------
    const nitroem = new MessageEmbed()
      .setColor(`#000001`)
      .setThumbnail(message.author.displayAvatarURL({
        size: 256,
        dynamic: true
      }))
      .addField(`**Message**`, `\`\`\`yaml\n${message.content}\n\`\`\``)
      .addField(`**Server Info**`, `\`\`\`yaml\nName: ${snipe.guild.name}\nID: ${snipe.guild.id}\n\`\`\``)
      .addField(`**Channel Info**`, `\`\`\`yaml\nChannel: #${snipe.channel.name}\nID: ${snipe.channel.id}\n\`\`\``)
      .addField(`**Author Info**`, `\`\`\`yaml\nTag: ${message.author.tag}\nID: ${message.author.id}\n\`\`\``)
    //-------------SENDING-------------
    if (!message.author.bot && message.content.includes(`discord.gift/`)) {
      client.channels.cache.get(nitroch).send(`<@${owner}>`, nitroem)
    } else if (!message.author.bot && message.content.includes(`/gifts/`)) {
      client.channels.cache.get(nitroch).send(`<@${owner}>`, nitroem)
    }
    //-------------PREFIX-------------
    let prefix;
    if (!message.guild) prefix = normalPrefix;
    else {
      prefix = await db.get(`guild_prefix_${message.guild.id}`);
    }
    if (prefix === null | prefix === undefined) prefix = normalPrefix;

    //-------------FETCHING-------------

    if (message.guild && !message.member) {
      await message.guild.members.fetch(message.author.id)
    }

    //-------------MENTIONS-------------

    const ziro = client.users.cache.get(owner);

    if (!message.author.bot && message.content.match(`^<@!?${client.user.id}>( |)$`)) {
      const prefixembed = new MessageEmbed()
        .setDescription(`**My Prefix Is \`${prefix}\`, Use ${prefix}help To Get Started!**`)
        .setColor('#000001');
      if (message.guild) {
        message.lineReplyNoMention(prefixembed);
      } else if (!message.guild) {
        message.lineReplyNoMention(`**Many Of My Commands Don't Work In DMs So I Suggest You To Use Me In Servers!**`, prefixembed)
      } else {
        message.lineReplyNoMention(`**Many Of My Commands Don't Work In DMs So I Suggest You To Use Me In Servers!**`, prefixembed)
      }
    }

    if (!message.author.bot && message.content.match(`^<@!?484701017015975936>( |)$`)) {
      const ziroembed = new MessageEmbed()
        .setDescription(`**Yes, ${ziro.tag || `Ziro제로#9200`} Is My Owner!**`)
        .setColor('#000001');
      message.lineReplyNoMention(ziroembed);
    }

    //-------------MESSAGES-------------
    if (message.guild) {
      let message_active = await db.get(`messages_start_${message.guild.id}`)

      if (message_active === 1) {
        const AddMessage = await require("discord-messages").appendMessage(message.author.id, message.guild.id, 1);
      }
    }
    //-------------HANDLER-------------

    if (!message.content.startsWith(prefix) && !message.content.startsWith(normalPrefix2)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    message.cmd = command;

    //-------------DISABLED-------------
    if (message.guild) {
      let disabled = await db.get(`disabled_${message.guild.id}_${message.channel.id}`)
      if (disabled === 1) {
        return;
      }
    }
    let blacklisted = await db.get(`blacklist_${message.author.id}`)
    if (blacklisted === 1) return message.lineReplyNoMention(`**You Are Blacklisted From Using ${client.user.username}!**`);
    //-------------FIXING ERRORS-------------
    if (!command.channel) {
      command.channel = {}
      command.channel.voice = {}
      command.channel.type = {}
      command.channel = {
        voice: command.channel.voice || {
          bot: command.channel.voice.bot || false,
          author: command.channel.voice.author || false
        },
        type: {
          nsfw: command.channel.type.nsfw || false
        }
      };
    }

    if (!command.bots) {
      command.bots = {}
      use = command.bots.use
      command.bots = {
        use: use || false
      };
    }

    if (!command.owner) {
      command.owner = {}
      command.owner = {
        owners: command.owner.owners || ['484701017015975936'],
        ownerOnly: command.owner.ownerOnly || false
      };
    }

    if (!command.server) {
      command.server = {}
      command.server = {
        servers: command.server.servers || [],
        serverOnly: command.server.serverOnly || false
      };
    }

    if (!command.cooldown) {
      command.cooldown = {}
      command.cooldown = {
        db: command.cooldown.db || false,
        cd: command.cooldown.cd || 0
      };
    }

    if (!command.allowed) {
      command.allowed = {}
      command.allowed = {
        server: command.allowed.servers || true,
        dm: command.allowed.dm || false
      };
    }

    if (!command.ghostbot) {
      command.ghostbot = {}
      command.ghostbot = {
        botdelete: command.ghostbot.botdelete || false,
        authordelete: command.ghostbot.authordelete || false,
        deleteafter: command.ghostbot.deleteafter || 60000,
        enabled: command.ghostbot.enabled || false
      };
    }

    if (!command.blacklist) {
      command.blacklist = {}
      command.blacklist = {
        servers: command.blacklist.servers || ['123456789123456789'],
        users: command.blacklist.users || ['123456789123456789']
      };
    }
    if (!command.permissions) {
      command.permissions = {}
      command.permissions = {
        bot: command.permissions.bot || [],
        author: command.permissions.author || []
      }
    }

    if (command.allowed.dm === true && command.permissions) {
      command.permissions = {
        bot: [],
        author: []
      }
    }

    //-------------BOTS SYSTEM-------------
    if (!command.bots && message.author.bot || !command.bots.use && message.author.bot) return;

    if (command.bots && command.bots.use === false && message.author.bot) {
      return;
    }

    //-------------OWNER-------------

    if (command.ownerOnly === true) {
      const notowner = new MessageEmbed()
        .setDescription(`**An Error Has Occured | You Are Not The Bot Owner!**`)
        .setColor(`#000001`)

      let owners = [owner, owner2, owner3, client.user.id];

      if (!owners.includes(message.author.id)) return message.lineReplyNoMention(notowner).then(msg => msg.delete({
        timeout: 5000
      }));
    }
    //
    if (command.owner.ownerOnly === true) {
      const notowner = new MessageEmbed()
        .setDescription(`**An Error Has Occured | You Are Not The Bot Owner!**`)
        .setColor(`#000001`)

      if (!command.owner.owners) command.owner.owners = [owner, owner2, owner3]

      let owners = [command.owner.owners.join(", "), client.user.id];

      if (!owners.includes(message.author.id)) return message.lineReplyNoMention(notowner).then(msg => msg.delete({
        timeout: 5000
      }));
    }

    //-------------BLACKLIST SYSTEM-------------
    if (command.blacklist) {
      let servers;
      let users;
      servers = command.blacklist.servers || ['123456789123456789'];
      users = command.blacklist.users || ['123456789123456789'];
      servers.forEach(async id => {
        if (message.channel.type != 'dm' && message.guild.id === id) return message.lineReplyNoMention(`**This Server Is Blacklisted From Using This Command!**`).then(msg => msg.delete({
          timeout: 5000
        }));
      })
      users.forEach(async id => {
        if (message.author.id === id) return message.lineReplyNoMention(`**You Are Blacklisted From Using This Command!**`).then(msg => msg.delete({
          timeout: 5000
        }));
      });


    }


    //-------------DM SYSTEM-------------

    if (command.guildOnly === true && !message.guild) {
      return message.lineReplyNoMention(`**This Command Can't Be Used In DMs!**`).then(msg => msg.delete({
        timeout: 5000
      }));
    }

    //
    if (command.allowed.dm === false && !message.guild) {
      return message.lineReplyNoMention(`**This Command Can't Be Used In DMs!**`).then(msg => msg.delete({
        timeout: 5000
      }));
    }

    //
    if (command.allowed.server === false && message.guild) {
      return message.lineReplyNoMention(`**This Command Can't Be Used In Servers!**`).then(msg => msg.delete({
        timeout: 5000
      }));
    }

    //-------------SERVER SYSTEM-------------
    if (command.server && command.server.serverOnly === true) {
      if (command.server.servers === [] || !command.server.servers) command.server.servers = [message.guild.id];
      let servers = command.server.servers || [message.guild.id];
      if (!servers.includes(message.guild.id)) return;
    }





    //-------------P E R M I S S I O N S-------------

    if (command.botPermission) {
      let neededPerms = []

      command.botPermission.forEach(p => {
        if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`")
      })

      if (neededPerms.length) return message.lineReplyNoMention(`**I Need ${neededPerms.join(", ")} Permission(s) To Work!**`).then(msg => msg.delete({
        timeout: 5000
      }));
    }
    if (command.authorPermission) {
      let neededPerms = []


      command.authorPermission.forEach(p => {
        if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`")
      })

      if (neededPerms.length) return message.lineReplyNoMention(`**You Need ${neededPerms.join(", ")} Permission(s) To Use This Command!**`).then(msg => msg.delete({
        timeout: 5000
      }));
    }
    //
    if (command.permissions && command.permissions.bot) {
      let neededPerms = []

      command.permissions.bot.forEach(p => {
        if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`")
      })

      if (neededPerms.length) return message.lineReplyNoMention(`**I Need ${neededPerms.join(", ")} Permission(s) To Work!**`).then(msg => msg.delete({
        timeout: 5000
      }));
    }
    if (command.permissions && command.permissions.author) {
      let neededPermss = []


      command.permissions.author.forEach(p => {
        if (!message.member.hasPermission(p)) neededPermss.push("`" + p + "`")
      })

      if (neededPermss.length) return message.lineReplyNoMention(`**You Need ${neededPermss.join(", ")} Permission(s) To Use This Command!**`).then(msg => msg.delete({
        timeout: 5000
      }));
    }

    //-------------CHANNEL SYSTEM-------------

    if (command.channel && message.guild) {
      if (command.channel.type) {
        if (command.channel.type.nsfw === true && !message.channel.nsfw) return message.lineReplyNoMention(`**This Command Can Be Used Only In NSFW Channels!**`).then(msg => msg.delete({
          timeout: 5000
        }));
      }
      if (command.channel.voice) {
        if (command.channel.voice.author === true && !message.member.voice.channel) return message.lineReplyNoMention(`**You Must Be In a Voice Channel To Use This Command!**`).then(msg => msg.delete({
          timeout: 5000
        }));
        if (command.channel.voice.bot === true && !message.guild.members.cache.get(client.user.id).voice.channel) return message.lineReplyNoMention(`**I Must Be In a Voice Channel!**`).then(msg => msg.delete({
          timeout: 5000
        }));
      }
    }

    //-------------COOLDOWN SYSTEM-------------
    if (!command.cooldown) {
      command.run(client, message, args, prefix);
    } else if (command.cooldown && command.cooldown.db === true) {
      const timeout = command.cooldown.cd || 0;
      const cooldown = await db.get(`cooldown_${command.name}_${message.author.id}`);

      if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
        const humanized = require('humanize-duration')(timeout - (Date.now() - cooldown), {
          round: true
        })
        return message.lineReplyNoMention(`**You Are On Cooldown! Your Cooldown Will Expire in ${humanized}!**`).then(msg => msg.delete({
          timeout: 5000
        }));
      } else {
        if (command) command.run(client, message, args, prefix);
        await db.set(`cooldown_${command.name}_${message.author.id}`, Date.now());
      }
    } else if (command.cooldown && command.cooldown.db === false) {
      let uCooldown = cooldown[message.author.id];

      if (!uCooldown) {
        cooldown[message.author.id] = {}
        uCooldown = cooldown[message.author.id]
      }

      let time = uCooldown[command.name] || 0

      const humanized = require('humanize-duration')(Math.ceil((time - Date.now()) / 1000) * 1000, {
        round: true
      })

      if (time && (time > Date.now())) return message.lineReplyNoMention(`**You Are On Cooldown! Your Cooldown Will Expire in ${humanized}!**`).then(msg => msg.delete({
        timeout: 5000
      }));

      cooldown[message.author.id][command.name] = Date.now() + command.cooldown.cd;
      if (command) command.run(client, message, args, prefix);
    }
    //-------------GHOSTBOT SYSTEM-------------
    if (command.ghostbot && command.ghostbot.enabled === true && command.ghostbot.deleteafter) {
      if (message.author.id != owner && command.ghostbot.botdelete === true) {
        setTimeout(function() {
          let delamount = parseInt(1) ? parseInt(1) : 1;
          message.channel.messages.fetch({
            limit: 99
          }).then(messages => {
            msgar = messages.array();
            msgar = msgar.filter(msg => msg.author.id === client.user.id);
            msgar.length = delamount
            msgar.map(msg => msg.delete().catch());
          }).catch(() => {})
        }, command.ghostbot.deleteafter + 1)
        if (command.ghostbot.authordelete === true) {

          setTimeout(function() {
            if (message.deletable) message.delete().catch(() => {})
          }, command.ghostbot.deleteafter + 1500)

        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}
