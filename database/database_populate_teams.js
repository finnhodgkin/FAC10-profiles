const db_connection = require('./database_connect.js');

module.exports = (callback) => {

  const teams = [
    ['Yvonne', 'SoFly'],
    ['Finn', 'SoFly'],
    ['Lucy', 'SoFly'],
    ['Samatar', 'SoFly'],
    ['Jessica', 'Jajascript'],
    ['Alexis', 'Jajascript'],
    ['Alice', 'Zapo'],
    ['Oliver', 'Zapo'],
    ['Maja', 'ammp'],
    ['Akin', 'ammp'],
    ['Piotr', 'ammp'],
    ['Joey', 'Jajascript'],
    ['Philippa', 'Zapo'],
    ['Martha', 'ammp'],
    ['Antonio', 'Jajascript'],
    ['Zooey', 'Zapo'],
    ['Yvonne', 'FACXMachine'],
    ['Finn', 'PAMF'],
    ['Lucy', 'JZLP'],
    ['Samatar', 'Facalacalaca'],
    ['Jessica', 'FACXMachine'],
    ['Alexis', 'Facalacalaca'],
    ['Alice', 'Facalacalaca'],
    ['Oliver', 'FACXMachine'],
    ['Maja', 'PAMF'],
    ['Akin', 'FACXMachine'],
    ['Piotr', 'JZLP'],
    ['Joey', 'JZLP'],
    ['Philippa', 'PAMF'],
    ['Martha', 'Facalacalaca'],
    ['Antonio', 'PAMF'],
    ['Zooey', 'JZLP']
  ];

  const team = (teamNames, cb) => {
    let len = 0;
    teamNames.forEach(teamName => {
      db_connection.query(`INSERT INTO teams (name) VALUES ('${teamName}');`, (err, id) => {
        if (err) {
          cb(err);
          return;
        }
        len++;
        if (len >= teamNames.length) cb(null, id);
      });
    });
  };

  const userteam = (user, team) => {
    db_connection.query(`INSERT INTO userteam (user_id, team_id) VALUES ((SELECT id FROM users WHERE users.first_name = '${user}'), (SELECT id FROM teams WHERE teams.name = '${team}'));`,
    (err) => {
      if (err) {
        console.log(err);
      }
    });
  };


  const buildUserTeam = (teams) => {
    teams.forEach(([user, team]) => {
      userteam(user, team);
    });
    callback(null, 'Team build finished.')
  };

  const buildTeams = (teams) => {

    const teamNames = teams.reduce((acc, user) => {
      if (acc.indexOf(user[1]) === -1) {
        acc.push(user[1]);
      }
      return acc;
    }, []);

    team(teamNames, () => {
      buildUserTeam(teams);
    });
  };

  buildTeams(teams);

};
