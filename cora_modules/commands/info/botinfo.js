const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class BotInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            aliases: ['about'],
            group: 'info',
            memberName: 'botinfo',
            description: 'Displays some information about the bot.',
        });
    }
    run(message) {
        const embed = new MessageEmbed()
            .setTitle("About Me")
            .setColor(0x154360)
            .setDescription("My name is Zeon, I am a multi-purpose Discord bot built on Discord.JS with Commando.")
            .addField("Backstory", "A while back, Nova needed something to help manage some guilds and give something that felt personal, of which most bots couldn't really do. I was created to help manage guilds and provide some personality which most other bots lack. \nNow I run on the latest systems and have a fair few features of my own.")
            .addField("Functions", "Admin, Music and Fun.")
            .addField("Owner", "NovaLynxie#9752")
            .setFooter("Built on Node.js using Discord.js with Commando.")
            .setThumbnail(this.client.user.displayAvatarURL({ formant: 'png'}))
        return message.embed(embed);
    }
};
