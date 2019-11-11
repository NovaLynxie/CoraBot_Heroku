const { Command } = require('discord.js-commando');
module.exports = class QueueCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'queue',
            aliases: ['songs','q'],
            group: 'music',
            memberName: 'queue',
            description: 'Lists all songs currently in the bots play queue.',
            throttling: {
                usages: 5,
                duration: 5,
            },
            guildOnly: true,
        })
    }
    run(message) {
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        return message.channel.send(`
        __**Song queue:**__
        ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
        **Now playing:** ${serverQueue.songs[0].title}`);
    }
};
