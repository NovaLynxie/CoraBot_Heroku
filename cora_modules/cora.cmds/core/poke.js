module.exports.run = async (bot, message) => {
  message.channel.send("<a:pawingcat:635163464905523221> "+message.author.toString())
};

module.exports.help = {
  name: "poke",
  description: "Gives Cora a small nudge. `Cora: 'Hey that tickles! xD'`",
  aliases: ["tap", "nudge"],
  usage: "poke",
  category: "core",
  cooldown: 5,
  guildOnly: false
};
