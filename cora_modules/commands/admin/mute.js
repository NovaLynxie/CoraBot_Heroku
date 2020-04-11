const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
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
        });
    }
    async run(message, {user, reason="No reasons given."}) {
        if (user.hasPermission("ADMINISTRATOR")) {
            message.say(stripIndents`
            I'm sorry but I cannot to mute this user as they have \`ADMINISTRATOR\` permissions.
            Users with \`ADMINISTRATOR\` permission overrides all channel and role specific permissions.`)
        }
        if (user.hasPermission("MANAGE_MESSAGES")) {
            message.say(stripIndents`
            I'm sorry but I cannot to mute this user as they have \`MANAGE_MESSAGES\` permissions.
            Users with \`MANAGE_MESSAGES\` permission bypasses channel and role permissions.`)
        }
        let muterole = message.guild.roles.cache.find(muterole => muterole.name === "Muted")
        if (!muterole) {
            try {
                console.log(`[Warn] Role 'Muted' not found! Generating one now.`)
                muterole = await message.guild.createRole({
                    name: "Muted",
                    color: 0x000000,
                    permissions:[]
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (err) {
                console.log(`[Error] Unable to create a new role named 'Muted'! Possibly missing permissions`)
                console.log(err.stack);
                console.log(`[Warn] Cannot mute properly without a mute role in the server.`)
            }
        }
        var channel = message.guild.channels.cache.find(ch => ch.name === 'moderation-log')
        try {
            if (!channel) {
                message.say(stripIndents`
                Whoops! 🙀
                I'm missing a moderations log channel or cannot find it, unable to log moderation actions.
                Please contact my owner or higher ups immediately as as I cannot log mod actions without one!
                `)
                console.log('[Error] Missing channel or permissions invalid! Unable to log suggestion!')
                console.log('[Warn] Moderation action has not been saved correctly, check error message.')
                return
            }
            var muteColor = 0xDC9934 // Black embeds for testing.
            var moderator = message.author
            var nick = message.guild.members.fetch(user.id)
            var date = getLocalTime(message)
            var muteEmbed = new MessageEmbed()
                .setColor(muteColor)
                .setTitle('Mute Logged!')
                .setAuthor(moderator.username+'#'+moderator.discriminator, moderator.avatarURL)
                .addFields(
                    {
                        name: `> User Info`,
                        value: stripIndents`
                                **Username:** ${user}
                                **Nickname:** ${nick}
                                **Log Date:** ${date}
                        `
                    },
                    {
                        name: `> Reason for Mute`,
                        value: stripIndents`
                                ${reason}
                        `
                    }
                )
                .setThumbnail(user.displayAvatarURL({format:'png'}))
                .setFooter(`Moderation logged by Cora`)
            return channel.send(muteEmbed);
        } catch (err) {
            console.log(`[Severe] Exception Error! Process fault in channel read/write permissions!`)
            return console.error(error);
        }
    }
};