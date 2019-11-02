module.exports.run = async (bot, message) => {
  message.channel.send("Pong! `"+bot.ping+"ms`")
};

module.exports.help = {
  name: "ping",
  description: "Pings Cora and she returns your ping time",
  cooldown: 5,
  usage: "ping",
  category: "core",
  guildOnly: false
};
