// Loads required modules into the code.
const Client = require(`./cora_modules/cora.runtime/client.js`);
// Links code to other required parts needed in code.
const fs = require('fs');
// Loads required variables into code.
const modules = ['administration','development','economy','moderation','music','utility'];
const token = process.env.token
const {
  prefix,
  debug,
} = require('./config.json');

// Variables for DiscordBot
const bot = new Client();
const dir = `./cora_modules/cora.cmds/`

modules.forEach(c => {
  fs.readdir(dir+`${c}/`, (err, files) => {
    if (err) throw err;
    console.log(`[CmdLogs] Loaded ${files.length} commands of module ${c}`)
    files.forEach(f => {
      const props = require(dir+`${c}/${f}`)
      bot.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, props.name)
      })
    })
  })
})

//const logDir = './cora_modules/cora.debug/'
//var sys = fs.createWriteStream(logDir+'/corabot.access.log')
//var err = fs.createWriteStream(logDir+'/corabot.error.log')

// Verbose console log debugger. To enable prompts, set debug in config.json to true.
if (debug === true) {
  console.log("[Debug] Dev Mode Active! Verbose logging enabled.");
  console.log("[Debug] Command Table Debug Test");
  console.log(bot.commands);//Debug console prompt to print all commands and function types to console.
}
console.log("[System] Commands table generated! Starting CoraBot...")

// Bot.on Runtime
bot.on('ready', () => {
  bot.user.setStatus('online')
  bot.user.setActivity("the guild OwO", {type:'Watching'});
  console.log("[CoraBot] Cora is Online!")
})
bot.once('reconnecting', () => {
  console.log('[WebSocket] L.O.S! Attempting to reconnect...')
})
bot.once('disconnect', () => {
  console.log('[WebSocket] Bot disconnected from Discord!')
})
// Process Error Handler - Catches any errors and attempt to prevent a bot crash.
process.on('unhandledRejection', error => console.error('[NodeJS] UncaughtPromiseRejection Error!', error));

// Bot Command Handler (Requires Command Files)
bot.on('message', async message => {
  // Simple help request if user does not know bot's prefix.
  if (message.content.startsWith(`Cora, I need help.`)) {
    var embed = new Discord.RichEmbed()
      .setTitle("You seem lost, need help?")
      .setColor(0x00FFFF)
      .setThumbnail(bot.user.avatarURL)
      .addField("Bot Prefix", "My commands prefix is `"+prefix+"`")
      .addField("Did you need to see my commands?","To view my commands help, run `>help`")
      .setFooter("Created by NovaLynxie#9765, coded in Discord.JS v11.5.1")
    message.channel.send(embed);
    return;
  }
  // If message is not a command, ignore the message.
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  // Parses args from command into args object.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmdName = args.shift().toLowerCase();
  const command = bot.commands.get(cmdName)
    || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
  console.log(command);
  // Checks if command is set as guildOnly command. (Disabled due to errors with guildOnly property)
  //if (command.guildOnly && message.channel.type !== 'text')
  //  return message.reply("I'm sorry, that command is not available in DM's.");

  // Checks if message is from the bot and ignores it.
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;

  // Checks for command cooldowns, if it has sets the cooldowns.
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // Try Catch Error Handler, catches unhandled errors in the command execute function.
  try {
    //command.execute(message, bot, token);
    command.run (bot, message, args, token);
  }
  catch (error) {
    console.error('[CoraBot] Handler Error!',error);
    message.reply('Handler Error!')
  }
});

bot.login(token);
//Required to get bot token to interact with discord bot account.
