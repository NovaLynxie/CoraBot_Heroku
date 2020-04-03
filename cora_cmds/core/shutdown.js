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
        message.reply("Goodbye")
        this.client.user.setActivity('Hibernating...')
        this.client.user.setStatus('invisible')
        console.log("[ZEON] Shutdown command received! Terminating...")
        //client.destroy(); //not working correctly as not defined.
        process.exit();
    }
}