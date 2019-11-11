module.exports = {
    name: 'skip',
    description: "Skips the song playing in the channel.",
    aliases: ['next'],
    usage: 'skip',
    cooldown: 5,
    guildOnly: true,
    execute(message){
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!message.member.voiceChannel) {
        console.log("[CoraBot] Music.Skip Error! UserNotFound_voicechat.channelNoUser") 
        return message.channel.send('You have to be in a voice channel to skip the music!')
      }
      if (!serverQueue) {
        console.log("[CoraBot] Music.Skip Error! SkipErr_voicechat.channelQueue.Skip")
        return message.channel.send('There is no song that I could skip!');
      }
      serverQueue.connection.dispatcher.end();
      message.channel.send(":arrow_forward: Song Skipped!")
    }
};