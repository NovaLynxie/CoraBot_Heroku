const { Command } = require('discord.js-commando');
module.exports = class StopCommand extends Command {
  constructor(bot) {
      super(bot, {
        name: 'stop',
        aliases: [''],
        group: 'music',
        memberName: 'stop',
        description: 'Stops the currently playing song and disconnects the bot from vc channel.',
        throttling: {
              usages: 5,
              duration: 5,
          },
          guildOnly: true,
      })
    }
    run(message) {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!message.member.voiceChannel) {
        console.log("[CoraBot] Music.Stop Error! UserNotFound_voicechat.channelNoUser")
        return message.channel.send('You have to be in a voice channel to stop the music!')};
      if (!serverQueue) {
        console.log("[CoraBot] Music.Stop Error! StopErr_voicechat.channelQueue.Stop")
        return message.channel.send("Nothing is playing. No songs in queue.");
      }
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end('Stop command has been used!');
      message.channel.send(":octagonal_sign: Music Stopped!")
		  return undefined;
    }
};