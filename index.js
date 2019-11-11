const {CommandoClient} =  require('discord.js-commando');
const path = require('path');
const {
  prefix,
  token,
  cloud,
  debug,
}
const bot = new CommandoClient({
  commandPrefix: '>',
  commandPrefix: prefix,
  owner: [''],
  //owner: process.env.owners, (enable when hosting online)
  //invite: '',
})

bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['administration', '']
    ['development', '']
    ['moderation', '']
    ['music', '']
    ['utility', '']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'cora_commands'));

bot.once('ready', () => {
  console.log(`Connected to DISCORD as ${bot.user.tag} (${bot.user.id})`);
  bot.user.setActivity("the guild.", {type:"WATCHING"})
})
bot.on('error', console.error);

//Checks if bot is running in Cloud Host mode, if not reverts to Local Host Mode.
if(cloud === true) {
  console.log('[CoraBot] Running in Cloud Mode!')
  bot.login(process.env.token); //Use environment variable token to hide bot token.
}
if(cloud === false) {
  console.log('[CoraBot] Running in Local Mode!')
  bot.login(token); //Set bot token in the config.json file.
}