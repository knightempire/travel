const moment = require('moment-timezone');


const getISTTimestamp = () => {
    return moment().tz('Asia/Kolkata').format('DD:MM:YYYY HH:mm');
};

module.exports = { getISTTimestamp };