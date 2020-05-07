const { CommandoClient, /*SQLiteProvider*/ } = require('discord.js-commando');
const { Structures } = require('discord.js');
//const sqlite = require('sqlite');
const path = require('path'); // Loads path library for code file to use file directories.
const logger = require('./cora_modules/providers/WinstonPlugin');
logger.info('Loading activity list providers...')
const { activitiesList } = require('./cora_modules/internal/activities.json');
console.info('Getting settings from cloud host enviroment variables.')
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
                radioDispatcher: null,
                volume: 1
            };
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
        ['support', 'Support'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        unknownCommand: false,
        help: false,
    })
    .registerCommandsIn(
        path.join(__dirname, './cora_modules/commands')
    );

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
    //console.log(`Uncaught Promise Rejection Detected! ${error}`)
    logger.log('error',`Uncaught Promise Rejection Detected! ${error}`)
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    if (removedRoles.size > 0) {
        //console.log(`[Cora] Role ${removedRoles.map(r=>r.name)} removed from ${oldMember.displayName}.`)
        logger.log('info',`Role ${removedRoles.map(r=>r.name)} removed from ${oldMember.displayName}.`)
    };
    const addedRoles = newMember.roles.cache.filter(role=>!oldMember.roles.cache.has(role.id));
    if (addedRoles.size > 0) {
        //console.log(`[Cora] Role ${addedRoles.map(r=>r.name)} added to ${oldMember.displayName}.`)
        logger.log('info', `Role ${addedRoles.map(r=>r.name)} added to ${oldMember.displayName}.`)
    };
});

client.on('error', error => {
    //console.error('[Error]', error)
    logger.log('error','Bot Error Exception!')
    logger.log('error', error)
});

logger.info(`Connecting to Discord...`);
client.login(botToken);