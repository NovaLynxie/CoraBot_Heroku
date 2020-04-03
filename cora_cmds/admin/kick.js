const { Command } = require('discord.js-commando');

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

        return member
            .kick('You have been kicked by operator.')
            .then(() => message.reply(`${member.user.tag} has been kicked from the server.`))
            .catch(error => {
                console.error(error);
                message.reply('An error occured, please try again.')
            });
    }
};