const fs = require('fs');
const db = require('./database');
const logger = require('./logger');

function readDataInChunks(filePath, chunkSize = 2) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
}

function uploadToDb(newData) {
  db.serialize(() => {
    const stmt = db.prepare(`INSERT OR IGNORE INTO records VALUES (?, ?, ?, ?, ?, ?)`);
    newData.forEach(record => {
      stmt.run(record.id, record.name, record.score, record.age, record.city, record.gender, (err) => {
        if (err) {
          logger.error(`Failed to insert record with id ${record.id}: ${err.message}`);
        } else {
          logger.info(`Inserted record with id ${record.id}`);
        }
      });
    });
    stmt.finalize();
  });
}

function checkAndUpdate(filePath) {
  db.all('SELECT id FROM records', (err, rows) => {
    if (err) {
      logger.error(`Failed to fetch existing records: ${err.message}`);
      return;
    }

    const existingIds = new Set(rows.map(row => row.id));
    const newEntries = [];

    readDataInChunks(filePath).forEach(chunk => {
      chunk.forEach(record => {
        if (!existingIds.has(record.id)) {
          newEntries.push(record);
          existingIds.add(record.id);
        }
      });
    });

    if (newEntries.length > 0) {
      uploadToDb(newEntries);
      logger.info(`${newEntries.length} new records added to the database.`);
    } else {
      logger.info('No new records to add.');
    }
  });
}

module.exports = { checkAndUpdate };
