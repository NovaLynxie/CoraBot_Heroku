const { Command } = require('discord.js-commando');
module.exports = class KickCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'kick',
            aliases: ['boot'],
            group: 'moderation',
            memberName: 'kick',
            description: "Kicks the specified member out of the server or guild.",
            throttling: {
                usages: 5,
                duration: 5,
            },
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['KICK_MEMBERS'],
            guildOnly: true,
        })
    }
    run(message) {
        const member = message.mentions.members.first();

		if (!member) {
			return message.reply('You need to mention the member you want to kick');
		}

		if (!member.kickable) {
			return message.reply('I can\'t kick this user.');
		}

		return member
			.kick()
			.then(() => message.reply(`${member.user.tag} was kicked.`))
			.catch(error => message.reply('Sorry, an error occured.'));
	}
};