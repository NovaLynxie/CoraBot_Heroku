const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
//const timezone = require('../../providers/timezone') //Disabled due to missing 'message' reference.
const moment = require('moment');
require('moment-timezone');

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
        var type = requestType.toLowerCase();
        if (!type) {
            message.reply(`Please specify the type of your suggestion request.`)
            console.log(`[Warn] Missing 'type' for request, cancelling suggestion request.`)
            return
        }
        if (type == 'server') {
            var requestType = 'Server';
            console.log(`[Cora] Request type marked as 'Server'.`)
        } else if (type == 'bot') {
            var requestType = 'Bot';
            console.log(`[Cora] Request type marked as 'Bot'.`)
        }
        try {
            if (!channel) {
                message.say(`
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
        var requestDesc = input
        var requestUser = message.author.username + '#' + message.author.discriminator
        var requestDate = moment.utc(message.createdTimestamp).tz('Europe/London').format('dddd, MMMM Do YYYY, HH:mm:ss Z')
        var suggestEmbed = new MessageEmbed()
            .setTitle("New suggestion logged!")
            .setColor("#F781F3")
            .addFields(
                {
                    name: '> Suggestion Request Information',
                    value: stripIndents`
                            **Type:** ${requestType}
                            __**Description of Request**__
                            ${requestDesc}
                            **Suggested by** ${requestUser}
                            **Suggested at** ${requestDate}`
                }
            )
            .setFooter(`Suggestion logged by Cora`)
        channel.send(suggestEmbed).then(embedMessage => {
            embedMessage.react('👍')
            embedMessage.react('👎')
        })
        message.reply(` thank you for your suggestion. We will look into your request.`)
    }
};