module.exports = {
	name: 'nowplaying',
	description: 'Gets the song that is currently playing.',
	aliases: ['songplaying','sp','np'],
	cooldown: 5,
	usage: 'nowplaying',
	guildOnly: true,
	execute(message){
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`Now playing: ${serverQueue.songs[0].title}`);
	},
};

module.exports.run = async (bot, message, args) => {
	const serverQueue = message.client.queue.get(message.guild.id);
	if (!serverQueue) return message.channel.send('There is nothing playing.');
	return message.channel.send(`Now playing: ${serverQueue.songs[0].title}`);
};

// Help Object
module.exports.help = {
  name: "nowplaying",
  description: "Gets the song that is currently playing.",
  usage: "nowplaying",
  category: "music",
  aliases: ["songplaying", "songname", "sp", "np"]
	cooldown: 3,
	guildOnly: true
};
