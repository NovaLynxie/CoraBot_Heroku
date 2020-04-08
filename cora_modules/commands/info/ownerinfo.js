const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class OwnerInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ownerinfo',
            aliases: ['about-owner'],
            group: 'info',
            memberName: 'ownerinfo',
            description: `Adds`,

        })
    }
    run(message) {
        var embed = new MessageEmbed()
            .addTitle('About my Owner')
            .addFields(
                {
                    name: 'About Nova',
                    value: stripIndents`
                            This is a work in progress currently.
                    `
                }
            )
        message.embed(embed);

        message.say(`
        I don't have much info to give you right now...\n
        However if you want to find out if they are available here is their timetable: \n
        <https://tinyurl.com/rslblaw>`)
    }
}