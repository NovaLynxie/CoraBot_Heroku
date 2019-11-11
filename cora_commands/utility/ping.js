const Discord = 'discord.js'
const bot = new Discord.Client()
const { Command } = require('discord.js-commando');
module.exports = class ExampleCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ping',
            aliases: ['p'],
            group: 'utility',
            memberName: 'ping',
            description: "Pings Cora and she responds with your ping time.",
            throttling: {
                usages: 1,
                duration: 1,
            },
            guildOnly: false,
        })
    }
    run(message) {
        message.channel.send("I am here.`"+bot.ping+"ms`")
    }
};