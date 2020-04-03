const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class BotInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'statsinfo',
            aliases: ['stats'],
            group: 'info',
            memberName: 'statsinfo',
            description: 'Displays some information about the bot.',
        });
    }
    run(message) {
        const embed = new MessageEmbed()
            .setTitle("Bot Statistics")
            .setColor(0x154360)
            .addField("Servers", "Connected to " + this.client.guilds.cache.size + " servers")
            .addField("Users", "Managing x users" )
            .setFooter("Built on Node.js using Discord.js with Commando.")
            .setThumbnail(this.client.user.displayAvatarURL({ formant: 'png'}))
        return message.embed(embed);
    }
};
