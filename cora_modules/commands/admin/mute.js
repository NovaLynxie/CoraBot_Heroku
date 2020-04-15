const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const getLocalTime = require('../../functions/localtime')
module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'admin',
            memberName: 'mute',
            aliases: ['silence', 'shutup'],
            description: 'Mutes guild member in this server.',
            examples: ['mute <@user> [reason]'],
            clientPermissions : ['MUTE_MEMBERS', 'MANAGE_ROLES'],
            userPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3,
            },
            args: [
                {
                    key: 'user',
                    prompt: 'Tell me the user to mute.',
                    type: 'user',
                    default: ''
                },
                {
                    key: 'reason',
                    prompt: 'Any reasons for muting them?',
                    type: 'string',
                    default: ''
                },
                {
                    key: 'muteTime',
                    prompt: 'How long should I mute them for?',
                    type: 'string',
                    default: ''
                },
            ]
        });
    }
    async run(message, {user, reason, muteTime}) {
        var channel = message.guild.channels.cache.find(ch => ch.name === 'moderation-log')
        var member = message.guild.members.cache.find(n => n.id == user.id);
        try {
            if (!channel) {
                message.say(stripIndents`
                Whoops! 🙀
                I'm missing a moderations log channel or cannot find it, unable to log moderation actions.
                Please contact my owner or higher ups immediately as as I cannot log mod actions without one!
                \`\`\`Error! Missing channel/permissions for channel #moderation-log\`\`\`
                `)
                console.log('[Error] Missing channel or permissions invalid! Unable to log suggestion!')
                console.log('[Warn] Moderation action has not been saved correctly, check error message.')
                return
            }
            if (!member) {
                message.reply(stripIndents`
                you didn't mention anyone to mute! Please check your spelling and try again.
                `)
                console.log(`[Warn] Missing args! No user mentioned, aborting command.`)
                return
            }
            if (member.hasPermission('ADMINISTRATOR')) {
                message.say(stripIndents`
                I'm sorry but I cannot to mute this user as they have \`ADMINISTRATOR\` permissions.
                Users with \`ADMINISTRATOR\` permission overrides all channel and role specific permissions.`)
                return
            }
            let serverName = message.guild.name;
            let roleMute = message.guild.roles.cache.find(muterole => muterole.name === "Muted")
            if (!roleMute) {
                try {
                    console.log(`[Warn] Role 'Muted' not found in ${serverName}! Generating one now.`)
                    console.log(`[Info] Generating role in ${serverName}.`)
                    muterole = await message.guild.createRole({
                        name: "Muted",
                        color: 0x000000,
                        permissions:[]
                    })
                    console.log(`[Info] Setting channel perms for role "Muted" in ${serverName}.`)
                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                        console.log(`[Info] Settings applied to channels in ${serverName}.`)
                    });
                    console.log(`[Info] Role generation completed successfully!`)
                } catch (err) {
                    console.log(`[Error] Unable to create a new role named 'Muted'! Possibly missing permissions`)
                    console.log(err.stack);
                    console.log(`[Warn] Cannot mute properly without a mute role in the server.`)
                }
                // End of generate muted role
                let toMute = user; //Saves user data to toMute instead of calling directly.
                await(toMute.roles.add(roleMute.id)) //Assigns the mute role to user specified.
                if (muteTime) { //If timeout variable is defined, call this else skip this.
                    setTimeout( () => {
                        toMute.roles.add(roleMute, `Muted by ${message.author.tag} for ${time} minutes. Reason: ${reason}.`)
                    }, muteTime * 60000);
                }
                // End of assign muted role
            }
            var logColor = 0xDC9934
            var operator = message.author
            var member = message.guild.members.cache.find(n => n.id == user.id);
            var name = member.user.username+'(#'+member.user.discriminator+')';
            var nick = member.nickname;
            var date = getLocalTime(message)
            var logEmbed = new MessageEmbed()
                .setColor(logColor)
                .setTitle('Silence fool!')
                .addFields(
                    {
                        name: `> User Info`,
                        value: stripIndents`
                                **Username:** ${name}
                                **Nickname:** ${nick}
                                **Log Date:** ${date}
                        `
                    },
                    {
                        name: `> Details on Mute`,
                        value: stripIndents`
                                Muted by ${operator.username}#${operator.discriminator}
                                Reason: ${reason ? reason : "No reason given"}.
                                Expires in ${muteTime ? muteTime : "infinity"} minutes.
                        `
                    }
                )
                .setThumbnail(user.displayAvatarURL({format:'png'}))
                .setFooter(`Moderation logged by Cora`)
            return channel.send(logEmbed);
        } catch (err) {
            console.log(`[Severe] Exception Error! An error has occured in the mute command!`)
            message.say(`An error occured while running this command, please try again.`)
            return console.error(err);
        }
    }
};