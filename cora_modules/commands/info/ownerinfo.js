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
        });
    }
    run(message) {
        const embed = new MessageEmbed()
            .setTitle('About my Owner')
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
        I don't have much info to give you right now...
        However if you would like to find out when they are available, here is their timetable.
        Link to Timetable: <https://tinyurl.com/rslblaw>
        `)
    }
}