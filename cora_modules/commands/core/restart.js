const { Command } = require('discord.js-commando');

module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'restart',
            aliases: ['reboot', 'reset'],
            group: 'core',
            memberName: 'restart',
            description: 'Restarts the bot.',
            ownerOnly: true
        });
    }
    run(message) {
        console.log('[Bot] This is a placeholder, feature not yet implemented.')
        message.say("I'm sorry, but this feature is not yet implemented. :(")
    }
}