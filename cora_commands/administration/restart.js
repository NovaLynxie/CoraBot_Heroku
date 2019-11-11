const { Command } = require('discord.js-commando');
module.exports = class ExampleCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'restart',
            aliases: ['reset'],
            group: 'administration',
            memberName: 'restart',
            description: 'Restarts the bot and resets all running processes.',
            ownerOnly: true,
            guildOnly: true,
        })
    }
    run(message, bot) {
        console.log("[CoraBot] RESTART command received! Restarting now!")
		message.channel.send("Restarting, I will be right back. :wink:")
		.then(bot.user.setStatus("dnd"))
		.then(bot.user.setActivity("rebooting..."))
		.then(_msg=>bot.destroy())
		.then(()=>bot.login(process.env.token));
    }
};