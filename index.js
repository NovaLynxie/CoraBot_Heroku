const {CommandoClient} =  require('discord.js-commando');
const path = require('path');
const {
  prefix,
  debug,
}
const bot = new CommandoClient({
  commandPrefix: '>',
  owner: [''],
  //invite: '',
})
