const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class TimetableNovaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ownerinfo',
            aliases: ['about-owner'],
            group: 'info',
            memberName: 'ownerinfo',
            description: `Adds`

        })
    }
    run(message) {

        var embed = new MessageEmbed()
            .addTitle('About my Owner')
            .addField('')
        message.embed(embed);

        message.say(`
        I don't have much info to give you right now...\n
        However if you want to find out if they are available here is their timetable: \n
        <https://tinyurl.com/rslblaw>`)
    }
}