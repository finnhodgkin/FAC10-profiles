const connect = require('./database_connect.js');

const projects = {
  SoFly: [{
      url:'https://github.com/FAC10/week5-SoFLY-newsfeedAPI',
      week: 4,
      name: 'SoFly Crayola Autocomplete',
    }, {
      url:'https://github.com/FAC10/week5-SoFLY-newsfeedAPI',
      week: 5,
      name: 'SoFly Presents: USA vs UK news',
    }, {
      url:'https://github.com/FAC10/week5-SoFLY-newsfeedAPI',
      week: 6,
      name: 'SoFly FAC10 FACts',
    },
  ],
  Jajascript: [{
      url:'https://github.com/FAC10/week4-jajascript',
      week: 4,
      name: 'Nobel Laureates Autocomplete',
    }, {
      url:'https://github.com/FAC10/week5-jajascript',
      week: 5,
      name: 'Jajascript Bethnal Green',
    }, {
      url:'https://github.com/FAC10/week-6-jajascript',
      week: 6,
      name: 'Founders and Coders, Interesting Companies App',
    },
  ],
  ZAPO: [{
      url:'https://github.com/FAC10/week-4-zapo',
      week: 4,
      name: 'Lazy Mad Libbers (a Zapo Project)',
    }, {
      url:'https://github.com/FAC10/week5-zapo',
      week: 5,
      name: 'Die Another Day (another Zapo project)',
    }, {
      url:'https://github.com/pbywater/week6-zapo',
      week: 6,
      name: 'ZAPO Recipes',
    },
  ],
  AMMP: [{
      url:'https://github.com/FAC10/week4-ammp',
      week: 4,
      name: 'Ammp\'s autocompletion engine',
    }, {
      url:'https://github.com/FAC10/week5-globetown-news-ammp',
      week: 5,
      name: 'Globetown News App',
    }, {
      url:'https://github.com/smarthutza/week6-AMMPazon',
      week: 6,
      name: 'Ammpazon Analytics',
    },
  ],
};

const addProject = (project, teamName, callback) => {
  insertProject = `
  INSERT INTO projects (name, week, url, team_id)
  VALUES ($1, $2, $3, (SELECT teams.id FROM teams WHERE LOWER(teams.name) = LOWER($4) LIMIT 1));`
  connect.query(insertProject, [project.name, project.week, project.url, teamName], callback);
};

const addProjects = ((projects) => (callback) => {
  let built = 0;

  const amountOfProjects = Object.keys(projects).reduce((acc, team) => {
    return acc + projects[team].length
  }, 0);

  Object.keys(projects).forEach(team => {
    projects[team].forEach(project => {

      addProject(project, team, (err) => {
        if (err) return callback(err);
        built++;
        if (built >= amountOfProjects) {
          callback(null, 'Project build finished.')

        }
      });

    });
  });
})(projects);

module.exports = addProjects;
