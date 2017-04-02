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

getData.teamProjects = (team, callback) => {
  connect.query(`
      SELECT projects.name, projects.url, projects.week, projects.id, teams.name AS team_name
      FROM projects INNER JOIN teams ON projects.team_id = teams.id
      WHERE LOWER(teams.name) = LOWER($1);`, [team], (err, response) => {
    if (err) { return callback(err); }
    callback(null, response.rows);
  });
};

getData.user = (id, callback) => {
  connect.query(`
      SELECT users.id, users.first_name, users.last_name, users.middle_name, users.github_user_name,
      users.languages
      FROM users WHERE users.id = $1;`, [id], (err, response) => {
    if (err) { return callback(err); }
    callback(null, response.rows);
  });
};
