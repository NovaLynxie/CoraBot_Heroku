const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const { Structures } = require('discord.js');
const sqlite = require('sqlite');
const path = require('path');
console.log('[Init] Loading activity list providers...')
const { activitiesList } = require('./cora_modules/internal/activities.json');
console.log('[Init] Getting settings from cloud host enviroment variables.')
const { botToken, prefix, ownerID } = process.env;

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

const client = new CommandoClient({
    commandPrefix: prefix,
    owner: ownerID,
    invite: '',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['admin', 'Admin'],
        ['core', 'Core'],
        ['info', 'Information'],
        ['misc', 'Miscelaneous'],
        ['music', 'Music'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        //help: false,
    })
    .registerCommandsIn(
        path.join(__dirname, './cora_modules/commands')
    );

sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
    console.log('[SQLite] Loading settings database...')
    client.setProvider(new SQLiteProvider(db));
});

client.once('ready', () => {
    console.log(`[Cora] Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('with Commando');
});

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activitiesList.length - 1) + 1);
        if (index >= 0 && index <= 1) {
            var statusType = 1 // 1 - Playing
        };
        if (index >= 2 && index <= 3) {
            var statusType = 2 // 2 - Listening
        };
        if (index >= 4 && index <= 5) {
        var statusType = 3 // 3 - Watching
        };
        client.user.setActivity(activitiesList[index], {type: statusType});
    }, 300000);
})

process.on('unhandledRejection', error => {
    console.error('[NodeJS] Uncaught Promise Rejection!', error)
})

client.on('guildMemberUpdate', (oldMember, newMember) => {
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    if (removedRoles.size > 0) console.log(`[Cora] Role ${removedRoles.map(r=>r.name)} removed from ${oldMember.displayName}.`)
    const addedRoles = newMember.roles.cache.filter(role=>!oldMember.roles.cache.has(role.id));
    if (addedRoles.size > 0) console.log(`[Cora] Role ${addedRoles.map(r=>r.name)} added to ${oldMember.displayName}.`)
})

client.on('error', error => {
    console.error('[Cora]', error)
})

client.login(botToken);