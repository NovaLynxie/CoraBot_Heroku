const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const getLocalTime = require('../../functions/localtime')
module.exports = class WarnCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            group: 'admin',
            memberName: 'warn',
            aliases: ['tell'],
            description: 'Warns guild member in this server.',
            details: `Warns the mentioned guild member`,
            examples: ['warn <@user> <reason>'],
            clientPermissions : ['MANAGE_ROLES'],
            userPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
            guildOnly: true,
        })
    }
    run(message, { user, reason="No reason given"}) {
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
            var warnColor = 0xDC9934
            var nick = message.guild.members.fetch(user.id)
            var date = getLocalTime()
            var warnEmbed = new MessageEmbed()
                .setColor(warnColor)
                .setTitle('Warning Logged!')
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
                        name: `> Reason for Warn`,
                        value: stripIndents`
                                ${reason}
                        `
                    }
                )
                .setThumbnail(message.author.displayAvatarURL({format:'png'}))
                .setFooter(`Moderation logged by Cora`)
            return channel.send(warnEmbed);
        } catch (err) {
            console.log(`[Severe] Exception Error! Process fault in channel read/write permissions!`)
            return console.error(error);
        }
        
    }
};