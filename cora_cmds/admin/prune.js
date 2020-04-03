const { Command } = require('discord.js-commando');

module.exports = class PruneCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'prune',
            aliases: ['clear','purge','delete'],
            group: 'admin',
            memberName: 'prune',
            guildOnly: true,
            description: 'Deletes the last message(s) in the chat the command is run in.',
        })
    }
    async run(message) {
        const args = message.content.split(' ');
		let deleteCount = 0;
		try {
			deleteCount = parseInt(args[1], 10);
		}catch(err) {
			return message.reply('Please provide the number of messages to delete. (max 100)')
		}
        
		if (!deleteCount || deleteCount < 2 || deleteCount > 100)
			return message.reply('Please provide a number between 2 and 100 for the number of messages to delete');

		const fetched = await message.channel.fetchMessages({
			limit: deleteCount,
		});
		console.log("[Bot] Purging "+fetched.deleteCount+" messages...")
		message.channel.bulkDelete(fetched)
			.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
		console.log("[Bot] Messages purged successfully!")
    }
}