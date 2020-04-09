const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const getLocalTime = require('../../functions/localtime');

module.exports = class RegisterCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'register',
            aliases: ['signup'],
            group: 'utils',
            memberName: 'register',
            description: 'Registers user to gain access to certain content.',
            details: `Adds user to registered users which would allow access to restricted content hidden from the other users.`,
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 5
            },
            /*
            args: [
                {
                    key: 'answer1',
                    prompt: `What is your gender? (Male, Female, Genderfluid, Agender, Non-binary, Transgender or Prefer not to say)`,
                    type: 'string'
                }
            ]
            */
        });
    }
    async run(message) {
        const userID = message.author.id
        message.say(`I'm sorry but my register isn't set up yet. Please try again later.`)
        //const userDM = 
    }
};