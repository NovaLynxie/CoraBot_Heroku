module.exports.run = (bot, message, args, token) => {
	console.log("[CoraBot] RESTART command received! Restarting now!")
	message.channel.send("Restarting, I will be right back. :wink:")
	.then(bot.user.setStatus("dnd"))
	.then(bot.user.setActivity("rebooting..."))
	.then(_msg=>bot.destroy())
	.then(()=>bot.login(token));
};

module.exports.help = {
	name: "restart",
	description: "Restarts the bot and resets the running processes.",
	aliases: ["reset", "relog"],
  	usage: "restart",
	category: "administration",
	guildOnly: false,
};
