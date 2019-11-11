const { Command } = require('discord.js-commando');
module.exports = class BanCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ban',
            aliases: ['exile'],
            group: 'moderation',
            memberName: 'ban',
            description: "Bans the specified member out of the server or guild.",
            throttling: {
                usages: 5,
                duration: 5,
            },
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['BAN_MEMBERS'],
            guildOnly: true,
        })
    }
    run(message) {
        const member = message.mentions.members.first();

		if (!member) {
			return message.reply('You need to mention the member you want to ban them!');
		}

		if (!member.banable) {
			return message.reply('I can\'t ban this user.');
		}

		return member
			.ban()
			.then(() => message.reply(`${member.user.tag} was banned.`))
			.catch(error => message.reply('Sorry, an error occured.'));
    }
};
module.exports.help = {
	name: "ban",
  	description: "Bans the specified member out of the server or guild.",
  	aliases: ["exile", "boot"],
  	usage: "ban <@user>",
  	category: "moderation",
	guildOnly: true
};
