const moment = require('moment')
require('moment-timezone')

module.exports = function getTimezone(message) {
    var getServerRegion = message.guild.region;
    var getServerTime = message.createdTimestamp;
    let setServerRegion = '';
    // Supported Regions for the timezone provider.
    if (getServerRegion == 'us-central') return setServerRegion = 'America/Denver'
    if (getServerRegion == 'us-west') return setServerRegion = 'America/Los_Angeles'
    if (getServerRegion == 'us-east') return setServerRegion = 'America/New_York'
    if (getServerRegion == 'us-south') return setServerRegion = 'America/Mexico_City'
    if (getServerRegion == 'europe') return setServerRegion = 'Europe/London';
    // Additional Regions for the timezone provider. May add later.
    //if (getServerRegion == 'brazil') return setServerRegion = 'America/Araguaina';
    //if (getServerRegion == 'hongkong') return setServerRegion = 'Asia/Hong_Kong';

    // This combines all the information gathered before returning to the command.
    var LocalTime = moment.utc(getServerTime).tz(setServerRegion).format('dddd, MMMM Do YYYY, HH:mm:ss Z')
    return LocalTime
}