const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const path = require('path');

const prefix = process.env.prefix
const botToken = process.env.token

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
        eval: false,
        //help: false,
    })
    .registerCommandsIn(path.join(__dirname, 'cora_cmds'));

bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.tag}! (${bot.user.id})`);
    bot.user.setActivity('with Commando');
});

bot.on('error', console.error);

bot.login(botToken);