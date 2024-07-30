const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const config = require('../../config.json');

const flags = {
      DISCORD_EMPLOYEE: '<:DiscordStaff:753998532922572911>',
      DISCORD_PARTNER: '<:PartneredServerOwner:753998458452574209>',
      BUGHUNTER_LEVEL_1: '<:BugHunter:753998213039783984>',
      BUGHUNTER_LEVEL_2: '<:CH_BadgeBugHunterGold:753999273410166914>',
      HYPESQUAD_EVENTS: '<:HypeSquadEvents:753998401582137395>',
      HOUSE_BRAVERY: '<:HypeSquadBravery:753998354228314272>',
      HOUSE_BRILLIANCE: '<:HypeSquadBrilliance:753998303166857248>',
      HOUSE_BALANCE: '<:HypeSquadBalance:753998256853483601>',
      EARLY_SUPPORTER: '<:EarlySupporter:753998119691354123>',
      TEAM_USER: 'Team User',
      SYSTEM: 'System',
      VERIFIED_BOT: '<:VerifiedBot1:759688234761715734><:VerifiedBot2:759688234904453161>',
      VERIFIED_DEVELOPER: '<:EarlyVerifiedBotDeveloper:753998037554167850>'
};


module.exports = {
        name: "userinfov2",
        description: "Userinfo Command",
        usage: `z!userinfo`,
        category: "Utility",
        aliases: ["whois2", "user-info2"],
    run: async (client, message, args, prefix) => {
      let user = message.mentions.users.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]) || message.author;
      let member = message.guild.members.cache.get(user.id)
      if (user.avatarURL === undefined || user.avatarURL == null) return message.lineReplyNoMention("An Error Has Occured")
      const userFlags = member.user.flags.toArray();

      var permissions = [];
      var acknowledgements = 'Server Member';

      if(message.member.hasPermission("KICK_MEMBERS")){
          permissions.push("Kick Members");
      }

      if(message.member.hasPermission("BAN_MEMBERS")){
          permissions.push("Ban Members");
          acknowledgements = 'Server Mod';
      }

      if(message.member.hasPermission("ADMINISTRATOR")){
          permissions.push("Administrator");
          acknowledgements = 'Server Admin';
      }

      if(message.member.hasPermission("MANAGE_MESSAGES")){
          permissions.push("Manage Messages");
      }

      if(message.member.hasPermission("MANAGE_CHANNELS")){
          permissions.push("Manage Channels");
      }

      if(message.member.hasPermission("MENTION_EVERYONE")){
          permissions.push("Mention Everyone");
      }

      if(message.member.hasPermission("MANAGE_NICKNAMES")){
          permissions.push("Manage Nicknames");
      }

      if(message.member.hasPermission("MANAGE_ROLES")){
          permissions.push("Manage Roles");
      }

      if(message.member.hasPermission("MANAGE_WEBHOOKS")){
          permissions.push("Manage Webhooks");
      }

      if(message.member.hasPermission("MANAGE_EMOJIS")){
          permissions.push("Manage Emojis");
      }

      if(permissions.length == 0){
          permissions.push("No Permissions Found");
      }

      if(member.user.id == message.guild.ownerID){
          acknowledgements = 'Server Owner';
      }

      if(member.user.bot){
          acknowledgements = 'Server Bot';
      }

      if(member.user.id == config.owner){
        acknowledgements = 'Bot Owner';
      }

      if(member.user.id == '752242570532225064'){
        acknowledgements = 'Ziro-Bot';
      }

      function trimArray(arr, maxlen = 20) {
      if (arr.length > maxlen) {
          const len = arr.length - maxlen;
          arr = arr.slice(0, maxlen);
          arr.push(`And ${len} More...`);
      }
      return arr;
  }

  let xxx = member.user.avatarURL({ dynamic: true });
  if(xxx.includes('gif') && !member.user.bot) nitro = `<:Nitro:753998173944414420>`; else nitro = '';

  let arrayroles = [];

  member.roles.cache.forEach(async role => {arrayroles.push(`@` + role.name)});

  let format;

  if (xxx.includes('gif')) format = 'gif'; else if (xxx.includes('png')) format = 'png'; else if (xxx.includes('jpg')) format = 'jpg'; else if (xxx.includes('jpeg')) format = 'jpg'; else if (xxx.includes('webp')) format = 'webp'; else format = 'webp'


  let embed = new MessageEmbed()
      .setColor("#000000")
      .setThumbnail(user.displayAvatarURL({size: 1024, dynamic: true}))
      .addField("**Username:**", `\`\`\`yaml\n${user.tag}\n\`\`\``, true)
      .addField("**Created At:**", `\`\`\`yaml\n${moment.utc(user.createdAt).format("LL LTS")}\n\`\`\``) //.addField("Joined At:", `${moment(user.joinedAt).format('LL LTS')}`, true)
      .addField("**Joined At:**", `\`\`\`yaml\n${moment(member.joinedAt).format('LL LTS')} (${moment(member.joinedAt).fromNow()})\n\`\`\``)
      .addField("**User ID:**", `\`\`\`yaml\n${user.id}\n\`\`\``, false)
      .addField(`**Acknowledgements:**`, `\`\`\`yaml\n${acknowledgements}\n\`\`\``, false)
      .addField(`**Permissions:**`, `\`\`\`yaml\n${permissions.join(', ')}\n\`\`\``, false)
      .addField(`**Total Roles [${arrayroles.length - 1}]**`, `\`\`\`yaml\n${trimArray(arrayroles).slice(0, -1).join(', ') || '@everyone'}\n\`\`\``)
      .addField(`**Boosting Since:**`, `\`\`\`yaml\n${user.premiumSince || "Not Boosting This Server"} (Not Exact)\n\`\`\``, false)
      .addField(`**Badges:**`, `**${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'} ${nitro} (Not Exact)**`, true)
      .addField(`**Avatar:**`, `**[Link](${user.displayAvatarURL({	dynamic: true, })})\n[Format: ${format}](${user.displayAvatarURL({	dynamic: true, })})**`, true)
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`);
      message.lineReplyNoMention(embed)
    }
  }
