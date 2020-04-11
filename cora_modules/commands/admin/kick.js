const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const getLocalTime = require('../../functions/localtime')
module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'admin',
            memberName: 'kick',
            aliases: ['boot'],
            description: 'Kicks the mentioned guild member out of this server.',
            examples: ['kick <@user>'],
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            guildOnly: true,
        })
    }
    run(message) {
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Mention the member you wish to kick.');
        }
        if (!member.kickable) {
            return message.reply('I\'m sorry but I am unable to kick this member.');
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
                .setTitle('They were kicked out.')
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
                        name: `> Details on Kick`,
                        value: stripIndents`
                                Kicked by ${operator.username}#${operator.discriminator}
                                ${reason}.
                        `
                    }
                )
                .setThumbnail(user.displayAvatarURL({format:'png'}))
                .setFooter(`Moderation logged by Cora`)
            channel.send(logEmbed);
            return member
            .kick('You have been kicked by operator.')
            .then(() => message.reply(`${member.user.tag} has been kicked from the server.`))
            .catch(error => {
                console.error(error);
                message.reply('An error occured, please try again.')
            });
        } catch (err) {
            console.log(`[Severe] Exception Error! An error has occured in the kick command!`)
            message.say(`An error occured while running this command, please try again.`)
            return console.error(err);
        }
    }
};