const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const ffmpeg = require('ffmpeg-static');
const opus = require('node-opus');

module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stream',
      aliases: ['play-stream'],
      memberName: 'stream',
      group: 'music',
      description: 'Plays any valid stream urls.',
      details: `Plays any valid stream urls via the bot in a voice channel.`,
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      throttling: {
        usages: 2,
        duration: 5
      },
      args: [
        {
          key: 'query',
          prompt: 'Which stream would you like to listen to?',
          type: 'string',
          //validate: query => query.length > 0 && query.length < 200
        }
      ]
    });
  }

  async run(message, { query }) {
    if (query.length === 0) return message.reply("you haven't provided a stream URL for me to play!")
    const streamURL = query
    var voiceChannel = message.member.voice.channel
    if (voiceChannel) {
        voiceChannel.join()
            .then(connection => {
                const dispatcher = connection;
                message.say('Loading stream, please wait.');
                console.log(`[Proto] Loading stream, please wait.`)
                    .play(`${streamURL}`)
                    .on('start', () => {
                        message.guild.radioData.radioDispatcher = dispatcher;
                        dispatcher.setVolume(message.guild.radioData.volume);
                        const radioEmbed = new MessageEmbed()
                            .setColor('#5E2071')
                            .addField('Now Playing:', streamURL)
                        message.say(radioEmbed);
                        return
                    })
                    .on('error', e => {
                        message.say('Unable to play stream');
                        console.error(e);
                        message.guild.radioData.isPlaying = false;
                        message.guild.radioData.nowPlaying = null;
                        return message.guild.me.voice.channel.leave();
                    })

            })
            .catch(err => {
                console.log('[Error] Failed to play stream! Unrecognised URL or invalid input!')
                console.log(err)
            })
    } else {
        message.reply(stripIndents`
        you are not in a voice channel!
        Please join one and try again.`)
    }
  }
};
