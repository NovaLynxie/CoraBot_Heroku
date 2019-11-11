module.exports = class PokeCommand extends Command {
  constructor(bot) {
    super(bot, {
        name: '',
        aliases: [''],
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

module.exports.help = {
  name: "poke",
  description: "Gives Cora a small nudge. `Cora: 'Hey that tickles! xD'`",
  aliases: ["tap", "nudge"],
  usage: "poke",
  category: "utility",
  cooldown: 5,
  guildOnly: false
};
