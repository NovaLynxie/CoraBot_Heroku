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
            }
        });
    }
    async run(message) {
        //Defines variables and constants to be used.
        var channel = message.guild.channels.cache.find(ch => ch.name === 'registrations')
        var logDate = getLocalTime(message);
        //var nickname = null;
        var dmsOpen = null;
        var age = null;
        var gender = null;
        var desc = null;
        var blockProcess = 0;
        try {
            // Message tells user to check their DMs to continue.           
            if (message.channel.type !== 'dm') {
                console.log(`[Cora] Opening private channel to ${message.author.username}#${message.author.discriminator}'s DM`)
                await message.author.createDM(); //Starts new DM channel if not already created.
                await message.author.send(stripIndents`
                Hi there! Lets start with some simple questions. Please answer to the best of your ability.`)
                await message.reply(stripIndents`
                I have sent you a DM with futher instructions. Please read the instructions very carefully.
                Any answers that are found to be incorrect or dishonest will result in your account being penalized and/or banned.`)
            }            
           // Start of Register in DMs.
            if (blockProcess === 0) {
                await message.author.send(`Are you ok with chatting openly in dm's to other members?`)
                await message.author.dmChannel.awaitMessages(resolve => {
                    if (!resolve.author.bot) {
                        dmsOpen = resolve.content;
                        return blockProcess = 1;
                    }
                }, { max: 1, time: 30000, errors: ['time'], })
                .catch(() => {
                    message.direct('Registration timed out, sorry. Please run the command again.')
                });
            }
            if (blockProcess === 1) {
                await message.author.send(stripIndents`
                What is your gender? 
                (Male/Female/Genderfluid/Agender/Non-binary/Transgender/Prefer not to say)`)
                await message.author.dmChannel.awaitMessages(resolve => {
                    if (!resolve.author.bot) {
                        gender = resolve.content;
                        return blockProcess = 2;
                    }
                }, { max: 1, time: 30000, errors: ['time'], })
                .catch(() => {
                    message.direct(`Registration timed out, sorry. Please run the command again.`)
                })
            }
            if (blockProcess === 2) {
                await message.author.send(stripIndents`
                How old are you? **This is required to verify access to restricted content!**
                Lying about your age will get your account **banned or penalized** if you are found to be underage!`)
                await message.author.dmChannel.awaitMessages(resolve => {
                    if (!resolve.author.bot) {
                        age = resolve.content;
                        return blockProcess = 3;
                    }
                }, { max: 1, time: 30000, errors: ['time'], })
                .catch(() => {
                    message.author.send(`Registration timed out, sorry. Please run the command again.`)
                })
            }
            if (blockProcess === 3) {
                await message.author.send(stripIndents`
                Tell us about yourself! Please keep it as brief as possible.`)
                await message.author.dmChannel.awaitMessages(resolve => {
                    if (!resolve.author.bot) {
                        desc = resolve.content;
                        return blockProcess = 4;
                    }
                }, { max: 1, time: 30000, errors: ['time'], })
                .catch(() => {
                    message.author.send(`Registration timed out, sorry. Please run the command again.`)
                })
            }
            if (blockProcess === 4) {
                console.log(`[Cora] Registration data collected, processing information.`)
                // Logs registration to channel and completes registration.
                if (!channel) {
                    message.say(stripIndents`
                    Whoops! 🙀
                    I'm missing a registrations channel or cannot find it, unable to save your registration!
                    Please contact my owner or higher ups immediately as I cannot log registrations without one!
                    `)
                    console.log('[Error] Missing channel or permissions invalid! Unable to log registration!')
                    console.log('[Error] Registration was not saved and has been discarded.')
                    return
                }
                const username = message.author.username+'#'+message.author.discriminator;
                const nickname = ''
                dmsOpen = dmsOpen.charAt(0).toUpperCase()+dmsOpen.slice(1);
                console.log(`[Cora] Generating Embed from information gathered from user...`)
                const registerEmbed = new MessageEmbed()
                    .setColor(0xEC9AED)
                    .setTitle('Registration Log')
                    .addFields(
                        {
                            name: `> Member's Information`,
                            value: stripIndents`
                                    - Name: ${username}
                                    - Nick: ${nickname}
                                    - Age: ${age}
                                    - Gender: ${gender}
                                    - DMs Open? ${dmsOpen}
                            `
                        },
                        {
                            name: `> Registration Details`,
                            value: stripIndents`
                            Registered on ${logDate}`
                        },
                        {
                            name: `> Describe yourself`,
                            value: stripIndents`
                                    ${desc}
                            `
                        }
                    )
                    .setThumbnail(message.author.displayAvatarURL({format:'png'}))
                    .setFooter(`Registration logged on ${logDate} by Cora`)
                channel.send(registerEmbed);
                await message.direct(`Thank you for registering with us. Have a great day!`)
            }
        } catch (error) {
            message.say(stripIndents`
            An error occured while I was processing your registration request.
            Check \`Allow direct messages from server members\` is enabled for this server and try again.
            If you are still receiving this error, contact my owner or higher ups immediately.
            `)
            console.log(`[Error] Error while accessing user's dms or processing information`)
            console.log(`[Warn] User may have disabled DMs for ${message.guild.name} server.`)
            console.error(error)
        }
        //return messages;
    }
};