const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
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
            var logColor = 0xDC9934
            var operator = message.author
            var nick = message.guild.members.fetch(user.id)
            var date = getLocalTime(message)
            var logEmbed = new MessageEmbed()
                .setColor(logColor)
                .setTitle(`Warning Issued`)
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
                        name: `> Details for Warn`,
                        value: stripIndents`
                                Warned by ${operator.username}#${operator.discriminator}
                                ${reason}
                        `
                    }
                )
                .setThumbnail(message.author.displayAvatarURL({format:'png'}))
                .setFooter(`Moderation logged by Cora`)
            return channel.send(logEmbed);
        } catch (err) {
            console.log(`[Severe] Exception Error! An error has occured in the warn command!`)
            message.say(`An error occured while running this command, please try again.`)
            return console.error(err);
        }
        
    }
};