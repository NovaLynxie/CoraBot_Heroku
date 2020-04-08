const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class SuggestCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'suggest',
            aliases: ['request'],
            group: 'utils',
            memberName: 'suggest',
            description: 'Suggestions or feedback on improvements.',
            details: `Used to provide suggestions or feedback on improving the guild or anything that could be added to Cora's functions.`,
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [
                {
                    key: 'type',
                    prompt: `Please specify the type of suggestion you are requesting. (Valid options are 'Server' or 'Bot')`,
                    type: 'string'
                },
                {
                    key: 'input',
                    prompt: `What would you like to suggest? (Please make a reasonable request and no longer than 200 characters)`,
                    type: 'string'
                }
            ]
        });
    }

    run(message, { type, input }) {
        var channel = message.guild.channels.find(ch => ch.name === 'suggestions')
        try {
            if (!channel) {
                message.reply(`
                Whoops! I'm missing a suggestions channel or cannot find it, your suggestion has not been logged. \n
                Please contact my owner or higher ups immediately as this should not happen!
                `)
                console.log('[Error] Missing channel or permissions invalid! Unable to log suggestion!')
                console.log('[Error] Suggestion has not been saved, check above.')
                return
            }
        } catch (error) {
            console.log(`[Severe] Processing fault in channel read/write permissions!`)
            return console.error(error);
        }
        var suggestEmbed = new MessageEmbed()
            .setTitle("New suggestion logged!")
            .setColor("#F781F3")
            //.addFields()
            //.setFooter()
        channel.send(suggestEmbed).then(embedMessage => {
            embedMessage.react('👍')
            embedMessage.react('👎')
        })
        message.reply(` thank you for your suggestion. We will look into your request.`)
    }
};