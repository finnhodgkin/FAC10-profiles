const connect = require('./../../database/database_connect');
module.exports = getData = {};

getData.allUsers = (x, callback) => {
  connect.query(`
      SELECT id, first_name, middle_name, last_name, profile_img
      FROM users;`, (err, response) => {
    if (err) { return callback(err); }
    callback(null, response.rows);
  });

};

getData.filteredByTeam = (team, callback) => {
  connect.query(`
      SELECT users.id, first_name, middle_name, last_name, profile_img
      FROM users INNER JOIN userteam ON users.id = userteam.user_id
      INNER JOIN teams ON userteam.team_id = teams.id
      WHERE LOWER(teams.name) = LOWER($1);`, [team], (err, response) => {
    if (err) { return callback(err); }
    callback(null, response.rows);
  });

};
