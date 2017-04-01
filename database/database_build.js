const fs = require('fs');
const path = require('path');

const connect = require('./database_connect');

const build = fs.readFileSync(path.join(__dirname, 'database_build.sql'), 'utf8');

connect.query(build, (err, res) => {
  if (err) {
    throw err;
  }
  console.log('Database build successful.');
});
