const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const { stripIndents } = require('common-tags');
const { version } = require('../../package')
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
        const servers = this.client.guilds.cache.size
        const users = this.client.users.cache.filter(user => !user.bot).size
        const embed = new MessageEmbed()
            .setTitle("Bot Statistics")
            .setColor(0x154360)
            .addFields(
                
                {
                    name: '> Total Uptime',
                    value: moment.duration(this.client.uptime)
                            .format('d[ days], h[ hours], m[ minutes ]s[ seconds]'),
                    inline: true
                },
                {
                    name: '> Memory Usage',
                    value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`
                },
                {
                    name: '> General Stats',
                    value: stripIndents`
                    Guilds: ${this.client.guilds.cache.size} servers
                    Channels: ${this.client.channels.cache.size} channels
                    Users: ${this.client.users.cache.filter(user => !user.bot).size} users
                    `
                },
                {
                    name: '> Version',
                    value: `v${version}`,
                    inline: true
                }
            )
            .setThumbnail(this.client.user.displayAvatarURL({ formant: 'png'}))
        return message.embed(embed);
    }
};
