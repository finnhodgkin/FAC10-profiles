const connect = require('./../../database/database_connect');
const wf = require('./../helper_functions/waterfall');
const para = require('./../helper_functions/parallel');

module.exports = postData = {};

postData.user = userArr => callback => {
  connect.query(`INSERT INTO users
    (first_name, middle_name, last_name, github_user_name, languages, favorite_hobby, favorite_book, profile_img)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING ID;`,
    [...userArr], (err, res) => {
      if (err) return callback(err);
      callback(null, res.rows[0].id);
    });
}

postData.teamIfExists = team => callback => {
  const checkTeam = `SELECT id FROM teams WHERE teams.name = $1;`;

  connect.query(checkTeam, [team], (err, selectResponse) => {
    if (err) return callback(err);

    if (selectResponse.rows[0]) {
      callback(null, selectResponse.rows[0].id);
    } else {
      const insertTeam = `INSERT INTO teams (name) VALUES ($1) RETURNING ID;`;
      connect.query(insertTeam, [team], (err, insertResponse) => {
        if (err) return callback(err);
        callback(null, insertResponse.rows[0].id);
      });
    }

  });
};

postData.userWithTeams = (user, callback) => {
  const getTeams = user.teams.map(team => postData.teamIfExists(team));
  const getUser = postData.user(user.user);
  para([getUser, ...getTeams], callback);
}

const finn = ['Tom', 'Testy', 'Testerson', 'finnhodgkin', 'English', 'Climbing', 'The Lacuna', './assets/profile-pics/finn_headshot.jpg'];
const finnTeams = ['te', 'tes', 'test', 'SoFly'];



postData.userWithTeams({user:finn, teams:finnTeams}, postData.insertTeams)


postData.insertUserTeams = (err, res) => {
  const userId = res[0];
  const teamIds = res.slice(1);
  const insertUserTeam = 'INSERT INTO userteam (user_id, team_id) VALUES ($1, $2) RETURNING team_id;';
  let numQueries = 0;
  teamIds.forEach((id) => {
    connect.query(insertUserTeam, [userId, id], (err, res) => {
      if (err) return callback(err);
      if (numQueries++ >= teamIds.length) callback(null, 'User with teams add successful');
    });
  });
});
