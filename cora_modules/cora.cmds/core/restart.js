module.exports = {
	name: 'restart',
    description: 'Restarts the bot and reconnects it back to discord.',
    aliases: ['reset','relog'],
    usage: 'restart',
    guildOnly: false,
    execute(message, bot, token){
        console.log("[CoraBot] RESTART command received! Restarting now!")
        message.channel.send("Restarting, I will be right back. :wink:")
        .then(bot.user.setStatus("dnd"))
        .then(bot.user.setActivity("rebooting..."))
        .then(_msg=>bot.destroy())
        .then(()=>bot.login(token));
    }
};

module.exports.run = async (bot, message, args, token) => {
	console.log("[CoraBot] RESTART command received! Restarting now!")
	message.channel.send("Restarting, I will be right back. :wink:")
	.then(bot.user.setStatus("dnd"))
	.then(bot.user.setActivity("rebooting..."))
	.then(_msg=>bot.destroy())
	.then(()=>bot.login(token));
};

module.exports.help = {
	description: 'Restarts the bot and reconnects it back to discord.',
	aliases: ['reset','relog'],
	usage: 'restart',
	guildOnly: false,
};
