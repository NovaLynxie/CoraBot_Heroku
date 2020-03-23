// Defines required constants for bot code.
const {CommandoClient} =  require('discord.js-commando');
const path = require('path');
// Defines parts to get from config file.
const {
  prefix, //Assigns the bot's prefix from config to execute commands.
  token,  //Assigns the bot's token from config to connect to discord.
  cloud,  //Sets the bot host mode from config file.
  debug,  //Sets debug mode on for more console verbose logging. (Not yet implemented)
} = require('./config.json')
const bot = new CommandoClient({
  commandPrefix: prefix,
  owner: process.env.ownerID,
  //invite: '',
})
// This sets up the bot.registry for types and groups for commands.
bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['administration', 'Admin commands, these are very powerful commands.'],
    ['development', 'Developer only commands. Use with caution!'],
    ['fun', 'Fun commands to play around with.'],
    ['moderation', 'Moderator commands for staff to help moderate your guild or community server.'],
    ['music', 'Music commands for when you want to play some music.'],
    ['utility', 'Utility commands for giving useful information amongst other things.',]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    ping: false
  })
  .registerCommandsIn(path.join(__dirname, 'cora_commands'));

bot.once('ready', () => {
  console.log(`[CoraBot] Connected to DISCORD as ${bot.user.tag} (${bot.user.id})`);
  bot.user.setActivity("the guild.", {type:"WATCHING"})
})
bot.on('error', console.error);

//Checks if bot is running in Cloud Host mode, if not reverts to Local Host Mode.
if(cloud === true) {
  console.log('[CoraBot] Running in Cloud Host Mode!')
  bot.login(process.env.token); //Use environment variable token to hide bot token.
}
if(cloud === false) {
  console.log('[CoraBot] Running in Local Host Mode!')
  bot.login(token); //Set bot token in the config.json file to be used with the bot.
}