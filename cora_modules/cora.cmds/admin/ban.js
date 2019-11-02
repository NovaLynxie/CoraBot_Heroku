module.exports = {
	name: 'ban',
	description: 'Bans the specified guild member',
	aliases: ['exile'],
	usage: 'ban <@user>',
	guildOnly: true,
	execute(message){
		const member = message.mentions.members.first();

		if (!member) {
			return message.reply('You need to mention the member you want to ban him');
		}

		if (!member.banable) {
			return message.reply('I can\'t ban this user.');
		}

		return member
			.ban()
			.then(() => message.reply(`${member.user.tag} was banned.`))
			.catch(error => message.reply('Sorry, an error occured.'));
	},
};

module.exports.run = async (bot, message, args) => {

  // Do Some stuff

};

// Help Object
module.exports.help = {
  name: "",
  description: "Bans the specified member out of the server or guild.",
  usage: "ban <@user>",
  category: "admin",
  aliases: [""]
	guildOnly: true
};
