const connect = require('./../../database/database_connect');
module.exports = auth = {};

auth.getDetails = (username, callback) => {
  const getUserDetails = 'SELECT * FROM auth WHERE username = $1';
  connect.query(getUserDetails, [username], (err, response) => {
    if (err) return callback(err);
    console.log(response);
    console.log(username);
    callback(null, response.rows[0]);
  });
};
