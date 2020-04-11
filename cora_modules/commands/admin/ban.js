const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const getLocalTime = require('../../functions/localtime')
module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'admin',
            memberName: 'ban',
            aliases: ['exile'],
            description: 'Bans guild member from this server.',
            examples: ['ban <@user>'],
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            guildOnly: true,
        })
    }
    run(message) {
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply('Mention the member you wish to ban.');
        }

        if (!member.banable) {
            return message.reply('I\'m sorry but I am unable to ban this member.');
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
            var muteColor = 0xDC9934
            var operator = message.author
            var nick = message.guild.members.fetch(user.id)
            var date = getLocalTime(message)
            var logEmbed = new MessageEmbed()
                .setColor(muteColor)
                .setTitle('The ban hammer has spoken')
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
                        name: `> Details for Ban`,
                        value: stripIndents`
                                Banned by ${operator.username}#${operator.discriminator}
                                For ${reason}
                        `
                    }
                )
                .setThumbnail(user.displayAvatarURL({format:'png'}))
                .setFooter(`Moderation logged by Cora`)
            channel.send(logEmbed);
            return member
                .ban('You have been banned by an administrator.')
                .then(() => message.reply(`${member.user.tag} was banned.`))
                .catch(error => {
                    message.reply('An error occured while attempting to ban user, please try again.')
                    console.error(error);
            });
        } catch (err) {
            console.log(`[Severe] Exception Error! An error has occured in the ban command!`)
            message.say(`An error occured while running this command, please try again.`)
            return console.error(err);
        }
        
    }
}