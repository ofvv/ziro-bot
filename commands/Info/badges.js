const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "",
    aliases: [""],
    ownerOnly: true,
    cooldown: 1000,
    category: "Info",
    usage: "z!badges",
    description: "Discord Badges!",
    run: async (client, message, args, prefix) => {
      const guild = await message.guild.fetch();
      const users = client.users.cache.array();

      let badge = message.content.split(" ").slice(1).join(" ");

      if (!badge) {
        return message.lineReplyNoMention(`**Please Choose a Badge! List of Badges:\nDiscord Partner\nDiscord Staff\nDiscord Bug Hunter\nDiscord Gold Bug Hunter\nVerified Bot Developer\nHypeSquads\nHypeSquad Events\nEarly Supporter**`)
      }

      if (badge === 'Verified Bot Developer') {
        const devs = [];
        for(let user of users){
            const flags = user.flags || await user.fetchFlags();
            const hasFlag = flags.toArray().includes("VERIFIED_DEVELOPER");
            if(hasFlag) devs.push(user);
        }
        const devem = new MessageEmbed()
        .setTitle(`${badge}s:`)
        .setDescription(`${devs.join('\n') || `**None**`}`)
        .setFooter(`Total ${badge}s: ${devs.length}`)
        return message.lineReplyNoMention(devem)
      }
      if (badge === 'Discord Partner') {
        const devs = [];
        for(let user of users){
            const flags = user.flags || await user.fetchFlags();
            const hasFlag = flags.toArray().includes("PARTNERED_SERVER_OWNER");
            if(hasFlag) devs.push(user);
        }
        const devem = new MessageEmbed()
        .setTitle(`${badge}s:`)
        .setDescription(`${devs.join('\n') || `**None**`}`)
        .setFooter(`Total ${badge}s: ${devs.length}`)
        return message.lineReplyNoMention(devem)
      }
      if (badge === 'Discord Staff') {
        const devs = [];
        for(let user of users){
            const flags = user.flags || await user.fetchFlags();
            const hasFlag = flags.toArray().includes("DISCORD_EMPLOYEE");
            if(hasFlag) devs.push(user);
        }
        const devem = new MessageEmbed()
        .setTitle(`${badge}s:`)
        .setDescription(`${devs.join('\n') || `**None**`}`)
        .setFooter(`Total ${badge}s: ${devs.length}`)
        return message.lineReplyNoMention(devem)
      }
      if (badge === 'HypeSquad Events') {
        const devs = [];
        for(let user of users){
            const flags = user.flags || await user.fetchFlags();
            const hasFlag = flags.toArray().includes("HYPESQUAD_EVENTS");
            if(hasFlag) devs.push(user);
        }
        const devem = new MessageEmbed()
        .setTitle(`${badge}s:`)
        .setDescription(`${devs.join('\n') || `**None**`}`)
        .setFooter(`Total ${badge}s: ${devs.length}`)
        return message.lineReplyNoMention(devem)
      }
      if (badge === 'Discord Bug Hunter') {
        const devs = [];
        for(let user of users){
            const flags = user.flags || await user.fetchFlags();
            const hasFlag = flags.toArray().includes("BUGHUNTER_LEVEL_1");
            if(hasFlag) devs.push(user);
        }
        const devem = new MessageEmbed()
        .setTitle(`${badge}s:`)
        .setDescription(`${devs.join('\n') || `**None**`}`)
        .setFooter(`Total ${badge}s: ${devs.length}`)
        return message.lineReplyNoMention(devem)
      }
      if (badge === 'Discord Gold Bug Hunter') {
        const devs = [];
        for(let user of users){
            const flags = user.flags || await user.fetchFlags();
            const hasFlag = flags.toArray().includes("BUGHUNTER_LEVEL_2");
            if(hasFlag) devs.push(user);
        }
        const devem = new MessageEmbed()
        .setTitle(`${badge}s:`)
        .setDescription(`${devs.join('\n') || `**None**`}`)
        .setFooter(`Total ${badge}s: ${devs.length}`)
        return message.lineReplyNoMention(devem)
      }
      if (badge === 'Early Supporter') {
        const devs = [];
        for(let user of users){
            const flags = user.flags || await user.fetchFlags();
            const hasFlag = flags.toArray().includes("EARLY_SUPPORTER");
            if(hasFlag) devs.push(user);
        }
        const devem = new MessageEmbed()
        .setTitle(`${badge}s:`)
        .setDescription(`${devs.join('\n') || `**None**`}`)
        .setFooter(`Total ${badge}s: ${devs.length}`)
        return message.lineReplyNoMention(devem)
      }
      if (badge === 'HypeSquads') {
        const balance = [];
        for(let user of users){
            const flags = user.flags || await user.fetchFlags();
            const hasFlag = flags.toArray().includes("HOUSE_BALANCE");
            if(hasFlag) balance.push(user);
        }
        const brilliance = [];
        for(let user of users){
            const flags = user.flags || await user.fetchFlags();
            const hasFlag = flags.toArray().includes("HOUSE_BRILLIANCE");
            if(hasFlag) brilliance.push(user);
        }
        const bravery = [];
        for(let user of users){
            const flags = user.flags || await user.fetchFlags();
            const hasFlag = flags.toArray().includes("HOUSE_BRAVERY");
            if(hasFlag) bravery.push(user);
        }
        typeof balance;
        typeof bravery;
        typeof brilliance;
        const devem = new MessageEmbed()
        .setTitle(`HypeSquaders:`)
        .setDescription(`**Balance:**\n${balance.join('\n') || `**None**`}\n**Brilliance:**\n${brilliance.join('\n') || `**None**`}\n**Bravery:**\n${bravery.join('\n') || `**None**`}`)
        .setFooter(`Total HypeSquaders: ${Number(balance.length) + Number(brilliance.length) + Number(bravery.length)}`)
        return message.lineReplyNoMention(devem)
      }
    }}
