const { Command } = require('discord.js-commando');

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

        return member
            .ban('You have been banned by an administrator.')
            .then(() => message.reply(`${member.user.tag} was banned.`))
            .catch(error => {
                console.error(error);
                message.reply('An error occured, please try again.')
            });
    }
}