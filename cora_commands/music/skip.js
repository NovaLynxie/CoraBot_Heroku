const { Command } = require('discord.js-commando');
module.exports = class SkipCommand extends Command {
  constructor(bot) {
      super(bot, {
          name: 'skip',
          aliases: [''],
          group: 'music',
          memberName: 'skip',
          description: 'Skips the currently playing song.',
          throttling: {
              usages: 5,
              duration: 5,
          },
          guildOnly: true,
      })
  }
  run(message) {
    if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
	  if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
	  serverQueue.connection.dispatcher.end('Skip command has been used!');
	  return undefined;
  }
};