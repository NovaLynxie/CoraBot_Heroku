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
        console.log("[Cora] Restart command received!")
        console.log("[Warn] Status may be out of sync for a few minutes.")
        //message.channel.send("Good night... <:sleepycat:635163563878514688>")
        message.say("Will be right back.")
            .then(console.log("[Cora] Restarting my systems..."))
            .then(_msg => this.client.destroy())
            .then(_msg => this.client.login(process.env.botToken))
            .then(console.log("[Cora] Restart completed successfully!"))
            .then(_msg => this.client.user.setActivity('with Commando'));
    }
}