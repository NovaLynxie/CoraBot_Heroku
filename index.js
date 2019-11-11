const {CommandoClient} =  require('discord.js-commando');
const path = require('path');
const {
  prefix,
  debug,
}
const bot = new CommandoClient({
  commandPrefix: '>',
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

bot.login(process.env.token); //Use environment variable token to hide bot token.