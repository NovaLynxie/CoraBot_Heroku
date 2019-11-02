module.exports.run = (bot, message, args) => {
	const serverQueue = message.client.queue.get(message.guild.id);
	if (!serverQueue) return message.channel.send('There is nothing playing.');
	return message.channel.send(`Now playing: ${serverQueue.songs[0].title}`);
};

module.exports.help = {
  name: "nowplaying",
  description: "Gets the song that is currently playing.",
  usage: "nowplaying",
  category: "music",
  aliases: ["songplaying", "songname", "sp", "np"],
	cooldown: 3,
	guildOnly: true
};
