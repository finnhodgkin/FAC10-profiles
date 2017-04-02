const fs = require('fs');
const path = require('path');
const getData = require('./../database/get_data');

const waterfall = require('./../helper_functions/waterfall');
const parallel = require('./../helper_functions/parallel');

const helpers = require('./template_helpers');

module.exports = users = {};

/*******************************************************************************
-- TEMPLATING HELPERS ----------------------------------------------------------
*******************************************************************************/
users.templateUser = (user) => {
  return `
  <a href="user?id=${user.id}" class="user">
    <img class="user__image" src="${user.profile_img}" alt="${user.first_name}" />
    <h2 class="user__name">${user.first_name} ${user.last_name}</h2>
  </a>`;
};

users.templateProject = (project) => {
  return `
  <section class="project">
    <a href="${project.url}" class="project__link">
      <h3 class="project__name">${project.name}</h2>
      <p class="project__text">Project week: ${project.week}</p>
    </a>
  </section>`;
};

users.templateProjects = (projects, callback) => {
  callback(null, `
  <section class="projects">
    <h2>Team projects:</h2>
    ${projects}
  </section>
  `);
};

users.buildUsers = helpers.buildData(users.templateUser);
users.buildProjects = helpers.buildData(users.templateProject);

/*******************************************************************************
-- HANDLERS --------------------------------------------------------------------
*******************************************************************************/
users.all = (callback) => {
  waterfall('', [getData.allUsers, users.buildUsers],
    (err, userData) => {
      if (err) { return callback(err); }
      helpers.replaceTemplate('users.html', '<!--USERS-->', userData, callback);
  });
};

users.getProjectsByTeam = (team) => (callback) => {
  waterfall(team, [getData.teamProjects, users.buildProjects, users.templateProjects], callback);
};

users.getUsersByTeam = (team) => (callback) => {
  waterfall(team, [getData.filteredByTeam, users.buildUsers], callback)
};

users.filteredByTeam = (team, callback) => {
  const getUsers = users.getUsersByTeam(team);
  const getProjects = users.getProjectsByTeam(team);
  parallel([getUsers, getProjects], (err, htmlArray) => {
    if (err) { return callback(err); }
    const html = htmlArray.reduce((acc, section) => acc += section, '');

    helpers.replaceTemplate('users.html', '<!--USERS-->', html, callback);
  });
};
