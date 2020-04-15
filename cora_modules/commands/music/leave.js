const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      aliases: ['end','dc'],
      group: 'music',
      memberName: 'leave',
      guildOnly: true,
      description: 'Leaves voice channel if in one'
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Join a channel and try again');
    /* //Disabled for now, bot must be disconnected from vc by admin (to be changed later)
    if (typeof message.guild.radioData.radioDispatcher == 'undefined' ||
      message.guild.radioData.radioDispatcher == null
    ) {
      message.say(`Not playing radio streams, checking for songs.`)
    }*/
    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('There is no song playing right now!');
    }
    if (!message.guild.musicData.queue)
      return message.say('There are no songs in queue');
    message.guild.musicData.songDispatcher.end();
    message.guild.musicData.queue.length = 0;
    return;
  }
};
