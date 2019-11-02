// Loads required modules into the code.
const Discord = require("discord.js");
// Links code to other required parts.
const fs = require('fs');
/*
// Read information from files (core bot)
const Client = require('./cora_modules/cora.data/client.js');
*/
// Destructing methods used to define lines in code.
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { sep } = require("path");
const { success, error, warning } = require("log-symbols"); // npm i log-symbols or yarn add log-symbols
// Loads config to allow for usage.
const token = process.env.token
const {
  prefix,
  debug,
} = require('./config.json');

// Variables for DiscordBot
const bot = new Client(); //Custom discord client.js replaces Discord.Client()
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
//const logDir = './cora_modules/cora.debug/'
//var sys = fs.createWriteStream(logDir+'/corabot.access.log')
//var err = fs.createWriteStream(logDir+'/corabot.error.log')

// Command files handler to parse <cmd>.js files.
// Made by Anish Shobith, modified for use with CoraBot.
const loadCmds = (dir = "./cora_modules/cora.cmds/") => {

	readdirSync(dir).forEach(dirs => {
	// we read the commands directory for sub folders and filter the files with name with extension .js
		const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith(".js"));

		// we use for loop in order to get all the commands in sub directory
		for (const file of commands) {
		// We make a pull to that file so we can add it the bot.commands collection
			const pull = require(`${dir}/${dirs}/${file}`);
			// we check here if the command name or command category is a string or not or check if they exist
			if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category) === "string") {
				if (bot.commands.get(pull.help.name)) return console.warn(`${warning} Two or more commands have the same name ${pull.help.name}!`);
				// we add the the comamnd to the collection, Map.prototype.set() for more info
				bot.commands.set(pull.help.name, pull);
				// we log if the command was loaded.
				console.log(`${success} Loaded command ${pull.help.name}.`);
			}
			else {
			// we check if the command is loaded else throw a error saying there was command it didn't load
				console.log(`${error} Error loading command in ${dir}${dirs}. Missing help.name/help.category or help.name/help.category not a string.`);
				// we use continue to load other commands or else it will stop here
				continue;
			}
			// we check if the command has aliases, is so we add it to the collection
			if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
				pull.help.aliases.forEach(alias => {
					// we check if there is a conflict with any other aliases which have same name
					if (bot.aliases.get(alias)) return console.warn(`${warning} Two or more commands have the same aliases ${alias}!`);
					bot.aliases.set(alias, pull.help.name);
				});
		  }
		}
	});
};
loadCmds();
/* Depreciated command handler */
/*
const cmdsDir = './cora_modules/cora.commands/'
const cmdsData = fs.readdirSync(cmdsDir).filter(cmdsFile => cmdsFile.endsWith('.js'));
console.log("[System] Searching for files from `"+cmdsDir+"`. Please wait...")
console.log("[System] Fetching commands from `"+cmdsDir+"` and storing into commands table...")
for (const cmdsFile of cmdsData) {
  const cmds = require(cmdsDir+`${cmdsFile}`)
  bot.commands.set(cmds.name, cmds)
  if (debug === true) {console.log("[Debug] Loaded "+cmdsFile+" successfully!")} //Debug console prompt to confirm command file is validated.
}
*/

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
  bot.user.setActivity("with my developer ^w^", {type:'Playing'});
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
