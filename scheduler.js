const cron = require('node-cron');
const { checkAndUpdate } = require('./dataProcessor');

cron.schedule('0 0,12 * * *', () => {
  checkAndUpdate('data.json');
});
