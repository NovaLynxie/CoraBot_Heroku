// PostgreSQL.js Structure file for use with PostgreSQL for Discord.js Commando.
// This structure code file is created by iCrawl.
// Source: https://github.com/WeebDev/Commando/blob/master/structures/PostgreSQL.js

const Sequelize = require('sequelize');
const winston = require('winston');

const { DB } = process.env;
const database = new Sequelize(DB, { logging: false });

class Database {
	static get db() {
		return database;
	}

	static start() {
		database.authenticate()
			.then(() => winston.info('[POSTGRES]: Connection to database has been established successfully.'))
			.then(() => winston.info('[POSTGRES]: Synchronizing database...'))
			.then(() => database.sync()
				.then(() => winston.info('[POSTGRES]: Done Synchronizing database!'))
				.catch(error => winston.error(`[POSTGRES]: Error synchronizing the database: \n${error}`))
			)
			.catch(error => {
				winston.error(`[POSTGRES]: Unable to connect to the database: \n${error}`);
				winston.error(`[POSTGRES]: Try reconnecting in 5 seconds...`);
				setTimeout(() => Database.start(), 5000);
			});
	}
}

module.exports = Database;