module.exports.run = (bot, message) => {
  message.channel.send("Pong! `"+bot.ping+"ms`")
};

module.exports.help = {
  name: "ping",
  description: "Pings Cora and she returns your ping time",
  usage: "ping",
  category: "core",
  cooldown: 5,
  guildOnly: false
};
