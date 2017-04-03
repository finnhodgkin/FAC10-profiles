const getData = require('./../database/get_data');

const waterfall = require('./../helper_functions/waterfall');
const parallel = require('./../helper_functions/parallel');

const helpers = require('./template_helpers');

module.exports = user = {};

/*******************************************************************************
-- TEMPLATES -------------------------------------------------------------------
*******************************************************************************/
user.template = (user) => {
  return `
    <img class="userprofile__image" src="${user.profile_img}" alt="${user.first_name}'s portrait.'" />
    <div class="userprofile__profile">
      <a class="userprofile__link" href="https://github.com/${user.github_user_name}" class="user__link">
        <h3 class="userprofile__name">${user.first_name}</h2>
      </a>
      <p class="userprofile__text">Languages: ${user.languages}</p>
    </div>
  `;
};

user.wrapProjects = (html, callback) => {
  callback(null, `
    <section class="userprofile__profile">
      <h2 class="userprofile__name">Projects:</h2>
      ${html}
    </section>
  `);
};

user.templateProject = (project) => {
  return `
      <a href="${project.url}" class="userprofile__project">${project.name}</a>
    `;
};

user.templateControls = (callback) => {
  callback(null, `
    <section class="userprofile__profile userprofile__profile--controls">
    <a href="./" class="userprofile__close">close</a>
    </section>
    `);
  };

user.combineProfileTemplate = (html, callback) => {
  callback(null, `<section class="userprofile">
    ${html}
  </section>
  `);
}

user.build = helpers.buildData(user.template);
user.projects = helpers.buildData(user.templateProject);

/*******************************************************************************
-- HANDLER ---------------------------------------------------------------------
*******************************************************************************/
user.getUserInfo = (userId) => (callback) => {
  waterfall(userId, [getData.user, user.build], callback);
};

user.getProjects = (userId) => (callback) => {
  waterfall(userId, [getData.userProjects, user.projects, user.wrapProjects], callback);
};

// user.getTeams = userId => callback => {
//   waterfall(userid, [getData.userTeams, user.teams])
// }

user.get = (userId, callback) => {
  const getProfile = user.getUserInfo(userId);
  const getProjects = user.getProjects(userId);
  parallel([getProfile, getProjects, user.templateControls], (err, htmlArray) => {
    if (err) { return callback(err); }
    const html = htmlArray.reduce((acc, section) => acc += section, '');

    user.combineProfileTemplate(html, (err, content) => {
      helpers.replaceTemplate('users.html', '<!--USERS-->', content, callback);
    });
  });
};
