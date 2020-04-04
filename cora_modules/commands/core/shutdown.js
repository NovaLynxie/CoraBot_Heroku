const { Command } = require('discord.js-commando');

module.exports = class ShutdownCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shutdown',
            aliases: ['sleep', 'deactivate'],
            group: 'core',
            memberName: 'shutdown',
            description: 'Shuts down the bot and disconnects it from discord.',
            ownerOnly: true,
        });
    }
    run(message) {
        //console.log('[Bot] This is a placeholder, feature not yet implemented.')
        //message.say("I'm sorry, but this feature is not yet implemented. :(")
        message.say("Sleeping. Goodnight <:sleepycat:635163563878514688>")
            .then(console.log("[Cora] Hibernating..."))
            .then(_msg => this.client.user.setStatus('invisible'))
            .then(_msg => this.client.destroy())
            .then(_msg => process.exit());
    }
}