const fetch = require("node-fetch");

module.exports = {
        name: "docs",
        aliases: ["discordjs", "doc"],
        category: "Utility",
        description: "Discord.js Docs",
    run: async (client, message, args, prefix) => {
    const search = args[0];
        if (!search) return message.lineReplyNoMention({
            embed: {
                "color": 0x00001,
                "description": "**Please Specify What Do You Want To Search!**"

            }
        });
        //let version = args[1];
        //if (!version) version = `stable`;

        fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(search)}`)
            .then(res => res.json())
            .then(body => {
                if (body === null) return message.lineReplyNoMention({
                    embed: {
                        "color": 0x00001,
                      /*  "author": {
                            "name": "Discord.js Docs"
                            //"url": "https://discord.js.org/#/docs/main/master",
                            //"icon_url": "https://discord.js.org/favicon.ico"
                        },*/
                        //"title": "Search Results:",
                        "description": "**No Results Found.**"
                    }
                });
                body.color = 0x00001;
                message.lineReplyNoMention({ embed: body });
            })
            .catch(e => {
                message.lineReplyNoMention({
                    embed: { "color": 0x00001, "author": { "name": "Discord.js Docs", "url": "https://discord.js.org/#/docs/main/master", "icon_url": "https://discord.js.org/favicon.ico" }, "title": "Search results:", "description": "**No Results Found.**" }
                });
            });
    }
}
