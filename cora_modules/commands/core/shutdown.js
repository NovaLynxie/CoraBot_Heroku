const { Command } = require('discord.js-commando');
const logger = require('../../providers/WinstonPlugin');

module.exports = class ShutdownCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shutdown',
            aliases: ['sleep', 'hibernate'],
            group: 'core',
            memberName: 'shutdown',
            description: 'Shuts down the bot instance.',
            ownerOnly: true,
        });
    }
    run(message) {
        message.say("Sleeping. Goodnight <:sleepycat:635163563878514688>")
            .then(logger.info("[Cora] Hibernating..."))
            .then(_msg => this.client.user.setStatus('invisible'))
            .then(_msg => this.client.destroy())
            .then(_msg => process.exit());
    }
}