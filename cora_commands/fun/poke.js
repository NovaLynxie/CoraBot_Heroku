const {Command} = require('discord.js-commando')
module.exports = class PokeCommand extends Command {
  constructor(bot) {
    super(bot, {
        name: 'poke',
        aliases: ['nudge'],
        group: 'fun',
        memberName: 'poke',
        description: "Gives Cora a small nudge. `Cora: 'Hey that tickles! xD'`",
        throttling: {
            usages: 1,
            duration: 1,
        },
        guildOnly: false,
    })
  }
  run(message) {
    message.channel.send("<a:pawingcat:635163464905523221> "+message.author.toString())
  }
}