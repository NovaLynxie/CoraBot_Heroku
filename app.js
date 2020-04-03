const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const path = require('path');

const {
    prefix,
    botToken
} = require('./config.json')

Structures.extend('Guild', Guild => {
    class MusicGuild extends Guild {
        constructor(bot, data){
            super(bot, data);
            this.musicData = {
                queue: [],
                isPlaying: false,
                nowPlaying: null,
                songDispatcher: null,
                volume: 1
            };
            // Music Trivia Excluded
            // No trivia commands implemented.
        }
    }
    return MusicGuild;
});

const bot = new CommandoClient({
    commandPrefix: prefix,
    owner: '234356998836191232',
    invite: '',
});

bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['admin', 'Admin'],
        ['core', 'Core'],
        ['dev', 'Developer'],
        ['info', 'Information'],
        ['misc', 'Random'],
        ['music', 'Music'],
        ['utils', 'Utility'],

    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        //help: false,
    })
    .registerCommandsIn(path.join(__dirname, 'proto_cmds'));

bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.tag}! (${bot.user.id})`);
    bot.user.setActivity('with Commando');
});

bot.on('error', console.error);

//Checks if bot is running in Cloud Host mode, if not reverts to Local Host Mode.
if(cloud === true) {
    console.log('[System] Running in Cloud Host Mode!')
    console.log('[System] Detecting settings from environment variables...')
    bot.login(process.env.token); //Use environment variable token to hide bot token.
  }
  if(cloud === false) {
    console.log('[System] Running in Local Host Mode!')
    console.log('[System] Loading config.json file in bot\'s root directory...')
    bot.login(botToken); //Set bot token in the config.json file to be used with the bot.
  }