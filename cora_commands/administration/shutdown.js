const { Command } = require('discord.js-commando');
module.exports = class ExampleCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'shutdown',
            aliases: ['hibernate'],
            group: 'administration',
            memberName: 'shutdown',
            description: 'Stops the bot and disconnects it from discord.',
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