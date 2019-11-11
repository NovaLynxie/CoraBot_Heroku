const { Command } = require('discord.js-commando');
module.exports = class NowPlayingCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'nowplaying',
            aliases: ['songplaying','np'],
            group: 'music',
            memberName: 'nowplaying',
            description: 'Tells the user what song is currently playing.',
            throttling: {
                usages: 1,
                duration: 3,
            },
            guildOnly: true,
        })
    }
    run(message) {
      const serverQueue = message.client.queue.get(message.guild.id);
	    if (!serverQueue) return message.channel.send('There is nothing playing.');
	    return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
    }
};