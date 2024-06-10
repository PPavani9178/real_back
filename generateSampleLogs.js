const logger = require('./logger');

function generateLogs() {
  logger.info('Inserted record with id 1');
  logger.warn("Missing field 'city' in record id 2");
  logger.error('Failed to insert record with id 3: Unique constraint failed');
  logger.info('Inserted record with id 4');
  logger.success('Successfully processed 5 records');
  logger.warn('Invalid data format in record id 5');
  logger.error('Failed to read data file: ENOENT: no such file or directory');
  logger.success('Successfully added 3 new records to the database');
  logger.info('Inserted record with id 6');
  logger.warn('Incomplete record data for id 7');
  logger.error('Database connection lost');
  logger.success('Reconnected to the database');
  logger.info('Inserted record with id 8');
}

generateLogs();
