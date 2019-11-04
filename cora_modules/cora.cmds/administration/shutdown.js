module.exports.run = (bot, message) => {
	console.log("[CoraBot] SHUTDOWN command received! Shutting down now!")
	message.channel.send("Shutting down. Good night... <:sleepycat:635163563878514688>")
	.then(bot.user.setStatus("dnd"))
	.then(bot.user.setActivity("shutting down..."))
	.then(_msg=>bot.destroy());
};

module.exports.help = {
	name: "shutdown",
  	description: "Stops the bot and disconnects it from discord.",
	aliases: ["terminate", "sleeptime"],
	usage: "shutdown",
  	category: "administration",
	guildOnly: false,
};
