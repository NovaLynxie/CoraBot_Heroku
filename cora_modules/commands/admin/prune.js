const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const getLocalTime = require('../../functions/localtime')
module.exports = class PruneCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'prune',
			group: 'admin',
            memberName: 'prune',
			aliases: ['clear','purge','delete'],
			description: 'Deletes up to 100 messages in channel history.',
			details: `Deletes up to a total of 100 message(s) in the chat the command is run in.
			Here is a list of filters that can be specified to only clear certain types of messages:
			__invites:__ Messages containing an invite url to a discord
			__user @user:__ Messages sent by @user mentioned
			__bots:__ Messages sent by any bots in the server
			__you:__ Messages sent by Commando itself
			__uploads:__ Messages that contains an attachement
			__links:__ Messages which contains any links`,
			examples: ['prune <limit> [filter] [member]'],
			clientPermissions: ['MANAGE_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},
			args: [
				{
					key: 'limit',
					prompt: 'specify how many messages to delete.\n',
					type: 'integer',
					max: 100
				},
				{
					key: 'filter',
					prompt: 'specify which filters to be applied.\n',
					type: 'string',
					default: '',
					parse: str => str.toLowerCase()
				},
				{
					key: 'member',
					prompt: 'whose messages would you like to delete?\n',
					type: 'member',
					default: ''
				}
			]
		});
		
    }
    async run(message, { limit, filter, member }) {
		var channel = message.guild.channels.cache.find(ch => ch.name === 'moderation-log')
		let messageFilter;
		console.log("[Cora] Initializing message removal protocols...")
		try {
			if (!channel) {
                message.say(stripIndents`
                Whoops! 🙀
                I'm missing a moderations log channel or cannot find it, unable to log moderation actions.
                Please contact my owner or higher ups immediately as as I cannot log mod actions without one!
                \`\`\`Error! Missing channel/permissions for channel #moderation-log\`\`\`
                `)
                console.log('[Error] Missing channel or permissions invalid! Unable to log suggestion!')
                console.log('[Warn] Moderation action has not been saved correctly, check error message.')
				return
			}
			if (filter) {
				if (filter === 'invite') {
					messageFilter = message => message.content.search(/(discord\.gg\/.+|discordapp\.com\/invite\/.+)/i)
					!== -1;
				} else if (filter === 'user') {
					if (member) {
						const { user } = member;
						messageFilter = message => message.author.id === user.id;
					} else {
						return message.say(`${message.author}, you have to mention someone.`);
					}
				} else if (filter === 'bots') {
					messageFilter = message => message.author.bot;
				} else if (filter === 'you') {
					messageFilter = message => message.author.id === this.client.user.id;
				} else if (filter === 'upload') {
					messageFilter = message => message.attachments.size !== 0;
				} else if (filter === 'links') {
					messageFilter = message => message.content.search(/https?:\/\/[^ \/\.]+\.[^ \/\.]+/) !== -1;
				} else {
					return message.say(`${message.author}, this is not a valid filter. Use \`help prune\` for all available filters.`)
				}
				const messages = await message.channel.messages.fetch({ limit }).catch(err => null);
				const msgs2del = messages.filter(messageFilter);
				message.channel.bulkDelete(msgs2del.array().reverse()).catch(err => null);
	
				return null;
			}
			const msgs2del = await message.channel.messages.fetch({ limit }).catch(err => null);
			message.channel.bulkDelete(msgs2del.array().reverse()).catch(err => null);
			console.log("[Cora] Messages have been removed successfully!")
			const member = 'None'
			const operator = message.author
			const logColor = 0xDC9934
            const date = getLocalTime(message)
            const logEmbed = new MessageEmbed()
                .setColor(logColor)
                .setTitle(`Message Cleaner Log`)
                .addFields(
                    {
                        name: `> Log Details`,
                        value: stripIndents`
								Cleared ${limit} messages.
								Run by ${operator.username}#${operator.discriminator}
								**Filters:** ${filter}
								**Members:** ${member}
                                **Log Date:** ${date}
                        `
					}
				)
				.setThumbnail(message.author.displayAvatarURL({format:'png'}))
                .setFooter(`Action logged by Cora`)
			channel.send(logEmbed);
			return console.log(`[Cora] Logged action to moderation-logs`)
		} catch (err) {
			console.log(`[Severe] Exception Error! An error has occured in the prune command!`)
			message.say(`An error occured while running this command, please try again.`)
            return console.error(err);
        }
    }
};