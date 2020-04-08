const moment = require('moment')
require('moment-timezone')

var getServerRegion = message.guild.region;
let setServerRegion = '';
if (getServerRegion == 'brazil') return setServerRegion = 'America/Araguaina';
if (getServerRegion == 'europe') return setServerRegion = 'Europe/London';
if (getServerRegion == 'hongkong') return setServerRegion = 'Asia/Hong_Kong';

var getLocalTime = moment.utc(message.createdTimestamp).tz('Europe/London').format('dddd, MMMM Do YYYY, HH:mm:ss Z')

module.exports = TimezoneProvider;