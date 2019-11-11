//Template for commands to be included as executable command
//Command file must go into ./cora_commands/ under correct group as <cmd_name>.js
const { Command } = require('discord.js-commando');
module.exports = class ExampleCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: '',
            aliases: [''],
            group: '',
            memberName: '',
            description: '',
            throttling: {
                usages: 5,
                duration: 5,
            },
            clientPermissions: [''],
            userPermissions: [''],
            ownerOnly: false,
            guildOnly: true,
        })
    }
    run(message) {
        //Command code to be executed goes here.
        //Must use 'message' to send messages back to channel.
    }
};