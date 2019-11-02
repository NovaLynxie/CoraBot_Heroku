module.exports.run = async (bot, message) => {
	console.log("[CoraBot] SHUTDOWN command received! Shutting down now!")
	message.channel.send("Shutting down. Good night... <:sleepycat:635163563878514688>")
	.then(bot.user.setStatus("dnd"))
	.then(bot.user.setActivity("shutting down..."))
	.then(_msg=>bot.destroy());
};

module.exports.help = {
	name: "shutdown",
  description: "Stops the bot and disconnects it from discord.",
  usage: "shutdown",
  category: "core",
  aliases: ["terminate", "sleeptime"]
	guildOnly: false
};
