module.exports.run = async (bot, message, args) => {
	const member = message.mentions.members.first();

	if (!member) {
		return message.reply('You need to mention the member you want to kick');
	}

	if (!member.kickable) {
		return message.reply('I can\'t kick this user.');
	}

	return member
		.kick()
		.then(() => message.reply(`${member.user.tag} was kicked.`))
		.catch(error => message.reply('Sorry, an error occured.'));
};

module.exports.help = {
  name: "kick",
  description: "Kicks the specified member out of the server or guild.",
  usage: "kick <@user>",
  category: "admin",
  aliases: ["boot"],
	guildOnly: true
};
