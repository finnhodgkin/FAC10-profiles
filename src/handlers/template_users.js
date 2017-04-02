const fs = require('fs');
const path = require('path');
const getData = require('./../database/get_data');

const waterfall = require('./../helper_functions/waterfall');
const parallel = require('./../helper_functions/parallel');
module.exports = users = {};

/*******************************************************************************
-- TEMPLATING HELPERS ----------------------------------------------------------
*******************************************************************************/
users.replaceHtml = (template, toReplace, replaceWith, callback) => {
  fs.readFile(path.join(__dirname, '..', 'templates', template), 'utf8', (err, file) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, file.replace(toReplace, replaceWith));
  });
};

users.templateUser = (user) => {
  return `
  <a href="user?id=${user.id}" class="user">
    <img class="user__image" src="${user.profile_img}" alt="${user.first_name}" />
    <h2 class="user__name">${user.first_name} ${user.last_name}</h2>
  </a>`;
};

users.templateProject = (project) => {
  return `
  <a href="${project.url}" class="user">
    <h3 class="project__name">${project.name}</h2>
    <p class="project__details">${project.details}</p>
  </a>`;
};

users.buildData = template => (data, callback) => {
  html = data.reduce((acc, data) => acc + template(data), '');
  callback(null, html);
}

users.buildUsers = users.buildData(users.templateUser);
users.buildProjects = users.buildData(users.templateProject);

/*******************************************************************************
-- HANDLERS --------------------------------------------------------------------
*******************************************************************************/
users.all = (callback) => {
  waterfall('', [getData.allUsers, users.buildUsers],
    (err, userData) => {
      if (err) { return callback(err); }
      users.replaceHtml('users.html', '<!--USERS-->', usersHtml, callback);
  });
};

users.getProjectsByTeam = (team) => (callback) => {
  waterfall(team, [getData.teamProjects, users.buildProjects], callback);
};

users.getUsersByTeam = (team) => (callback) => {
  waterfall(team, [getData.filteredByTeam, users.buildUsers], callback)
};

users.filteredByTeam = (team, callback) => {
  const getUsers = users.getUsersByTeam.call(null, team);
  // const getProjects = users.getProjectsByTeam.call(null, team);
  parallel([getUsers/*, getProjects*/], (err, htmlArray) => {
    if (err) { return callback(err); }

    const html = htmlArray.reduce((acc, section) => acc += section, '');

    users.replaceHtml('users.html', '<!--USERS-->', html, callback);
  });
};
