const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');

const humanLevels = {
    0: 'None',
    1: 'Low',
    2: 'Medium',
    3: 'High', //'(╯°□°）╯︵ ┻━┻',
    4: 'Maxmimum' //'┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

module.exports = class ServerInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            aliases: ['server','whereami'],
            group: 'info',
            memberName: 'serverinfo',
            description: 'Get info on the server.',
            details: `Get detailed information on the server.`,
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 3
            }
        });
    }
    run(message) {
        //Debug console log parts, uncomment when needed.
        //console.log(message.guild);
        //console.log(message.guild.channels);
        //console.log(message.guild.channels.cache.size);
        //message.say(message.guild.channels.cache.size);
        //console.log(message.guild.roles.cache.size);
        //message.say(message.guild.roles.cache.size);
        //message.say('Printing information');
        const verifGetLvl = message.guild.verificationLevel;
        try {
            if (verifGetLvl === 'NONE') {
                var verifLevel = 0;
            } else if (verifGetLvl === 'LOW') {
                var verifLevel = 1;
            } else if (verifGetLvl === 'MEDIUM') {
                var verifLevel = 2;
            } else if (verifGetLvl === 'HIGH') {
                var verifLevel = 3;
            } else if (verifGetLvl === 'VERY_HIGH') {
                var verifLevel = 4;
            } //return verifLevel
        } catch (err) {

        }
        
        const serverinfo = new MessageEmbed()
            .setTitle("Server Information")
            .setColor(0x154360)
            .setDescription('Provides detailed information about any discord server/guild.')
            .addFields(
                {
                    name: '> Channels',
                    value: stripIndents`
                            - Text: ${message.guild.channels.cache.filter(ch => ch.type === 'text').size} Channels
                            - Voice: ${message.guild.channels.cache.filter(ch => ch.type === 'voice').size} Channels
                            - AFK Ch.: ${message.guild.afkChannelID ? `<#${message.guild.afkChannelID}> after ${message.guild.afkTimeout / 60}min` : 'None'}
                    `
                },
                {
                    name: '> Members',
                    value: stripIndents`
                            - Owner: ${message.guild.owner.user.tag}
                            (OwnerID: ${message.guild.ownerID})
                            - Members: ${message.guild.memberCount} members  
                    `
                },
                {
                    name: '> Extra Info',
                    value: stripIndents`
                            - Roles: ${message.guild.roles.cache.size}
                            - Region: ${message.guild.region}
                            - Created: ${moment.utc(message.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss Z')}
                            - Verif. Lvl: ${humanLevels[verifLevel]}
                    `
                }
            )
            .setThumbnail(message.guild.iconURL({ format: 'png' }));
        return message.embed(serverinfo);
    }
};
