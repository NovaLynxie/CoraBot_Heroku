const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class OwnerInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ownerinfo',
            aliases: ['aboutme'],
            group: 'info',
            memberName: 'ownerinfo',
            description: `Adds`,
        });
    }
    run(message) {
        var embed = new MessageEmbed()
            .setTitle('A little bit about My Owner')
            .addFields(
                {
                    name: 'About myself',
                    value: stripIndents`
                            Hi there! My name is Nova Lynxie, I am sometimes a bit shy meeting new people but can be quite friendly once you get to know me. Programming is one hobby I do enjoy, especially if it involves fixing problems and finding solutions. 
                            I love Minecraft, especially modded gameplay as this brings out my creative side in a way I probably would never have thought possible without it.
                            Sometimes I do draw a bit from time to time if I become burnt out on gaming, who knows, one day I may actually get good enough to draw Cora's persona profile picture.
                            Cora is one thing I find very enjoyable to create knowing its something I made myself with a few pieces of code here and there from sources across the web.
                            After all that I have learned from creating Cora, bringing her back to life and developing her to this stage, I am very glad that from one small test bot she has now evolved into something much bigger than that and can safely stand up to what most bots out there provide.
                            Come follow me on my social links if you'd like to find out a bit more about me there.
                    `
                },
                {
                    name: 'My Social Links',
                    value: stripIndents`
                            Twitter: https://www.twitter.com/novalynxie
                            Twitch: https://www.twitch.tv/novalynxie
                            Mixer: https://mixer.com/NovaLynxie
                    `
                }
            )
        message.embed(embed);
    }
}