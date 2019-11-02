const Discord = require("discord.js");
const bot = new Discord.Client();
module.exports = {
    name: 'ping',
    description: "Pings Cora and she returns your ping time",
    cooldown: 5,
    usage: 'ping',
    guildOnly: false,
    execute(message) {
        message.channel.send("Pong! `"+bot.ping+"ms`")
    }
};
