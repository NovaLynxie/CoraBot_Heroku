const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class HelpInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help-custom',
            aliases: ['what'],
            group: 'info',
            memberName: 'help-custom',
            description: 'Shows help to the user.',
            guildOnly: false,
        })
    }
    run(message){
        message.say(`This is a placeholder as currently work in progress ;)`)
    }
}