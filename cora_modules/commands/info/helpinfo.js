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
    run(message) {
        const embed = new MessageEmbed()
            .setTitle("Help Information")
            .setColor(0xE7A3F0)
            .setDescription("This command has not yet been fully implemented. Nothing to see here, yet. ")
            .setFooter("Built on Node.js using Discord.js with Commando.")
            .setThumbnail(this.client.user.displayAvatarURL({ formant: 'png'}))
        return message.embed(embed);
    }
}