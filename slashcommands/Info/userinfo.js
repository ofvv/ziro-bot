const discord = require("discord.js")
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
    name: "userinfo",
    options: [
        {
          name: "user",
          description: "userinfo",
          type: 6,
          required: false
        }
      ],
    description: "Get a User's Info",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      let userid;

      if (args) {
        userid = args.find(u => u.name).value
      } else userid = interaction.member.user.id

      let user = client.users.cache.get(userid) || client.users.cache.get(interaction.member.user.id)

      const guild = client.guilds.cache.get(interaction.guild_id)

      let member1 = guild.members.cache.find(m => m.user.id === userid)

      var permissions = [];
    var acknowledgements = 'Server Member';

    const userFlags = user.flags.toArray();

    const ziro = client.users.cache.get("484701017015975936")

    if(member1.hasPermission("KICK_MEMBERS")){
        permissions.push("Kick Members");
    }

    if(member1.hasPermission("BAN_MEMBERS")){
        permissions.push("Ban Members");
        acknowledgements = 'Server Mod';
    }

    if(member1.hasPermission("ADMINISTRATOR")){
        permissions.push("Administrator");
        acknowledgements = 'Server Admin';
    }

    if(member1.hasPermission("MANAGE_MESSAGES")){
        permissions.push("Manage Messages");
    }

    if(member1.hasPermission("MANAGE_CHANNELS")){
        permissions.push("Manage Channels");
    }

    if(member1.hasPermission("MENTION_EVERYONE")){
        permissions.push("Mention Everyone");
    }

    if(member1.hasPermission("MANAGE_NICKNAMES")){
        permissions.push("Manage Nicknames");
    }

    if(member1.hasPermission("MANAGE_ROLES")){
        permissions.push("Manage Roles");
    }

    if(member1.hasPermission("MANAGE_WEBHOOKS")){
        permissions.push("Manage Webhooks");
    }

    if(member1.hasPermission("MANAGE_EMOJIS")){
        permissions.push("Manage Emojis");
    }

    if(permissions.length == 0){
        permissions.push("No Permissions Found");
    }

    if(member1.id == guild.ownerID){
        acknowledgements = 'Server Owner';
    }

    if(user.id == config.owner){
      acknowledgements = 'Bot Owner';
    }

    if(user.id == client.user.id){
      acknowledgements = 'Ziro-Bot';
    }
    function trimArray(arr, maxlen = 20) {
  if (arr.length > maxlen) {
      const len = arr.length - maxlen;
      arr = arr.slice(0, maxlen);
      arr.push(` And ${len} More...`);
  }
  return arr;
}
let nitro = `<:Nitro:753998173944414420>`
let xxx = user.avatarURL({ dynamic: true });
        if(xxx.includes('gif') && !user.bot) nitro = `<:Nitro:753998173944414420>`; else nitro = '';

let rolesA = member1.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1)

    let embed = new discord.MessageEmbed()
      .setColor("#000000")
      .setThumbnail(user.displayAvatarURL({size: 1024, dynamic: true}))
      .addField("**Username:**", `\`\`\`yaml\n${user.tag}\n\`\`\``, true)
      .addField("**Created At:**", `\`\`\`yaml\n${moment.utc(user.createdAt).format("LL LTS")}\n\`\`\``)
      .addField("**Joined At:**", `\`\`\`yaml\n${moment(member1.joinedAt).format('LL LTS')}\n\`\`\``)
      .addField("**User ID:**", `\`\`\`yaml\n${user.id}\n\`\`\``, false)
      .addField(`**Acknowledgements:**`, `\`\`\`yaml\n${acknowledgements}\n\`\`\``, false)
      .addField(`**Permissions:**`, `\`\`\`yaml\n${permissions.join(', ')}\n\`\`\``, false)
      .addField(`**Boosting Since:**`, `\`\`\`yaml\n${user.premiumSince || "Not Boosting This Server"} (Not Exact)\n\`\`\``, false)
      .addField(`**Total Roles [${rolesA.length}]**`, `**${rolesA.length < 20 ? rolesA.join(' ') : rolesA.length > 20 ? trimArray(rolesA) : 'None'}**`)
      .addField(`**Badges:**`, `**${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'} ${nitro} (Not Exact)**`, true)
      .addField(`**Avatar:**`, `**[Link](${user.displayAvatarURL({	dynamic: true, })})**`, true)
      .setTimestamp()
      .setFooter(`${client.user.username} ${new Date().getFullYear()} ©`);
    if (user.bot) {

    sendembed(embed)
    interaction.channel.send("**User Is a Bot**").then(msg => msg.delete({timeout:5000}))
  } else sendembed(embed)
    }
  }
