const getData = require('./../database/get_data');

const waterfall = require('./../helper_functions/waterfall');

const helpers = require('./template_helpers');

module.exports = user = {};

/*******************************************************************************
-- TEMPLATES -------------------------------------------------------------------
*******************************************************************************/
user.template = (userData) => {
  return `
  <section class="user">
    <a href="https://github.com/${userData.github_user_name}" class="user__link">
      <h3 class="user__name">${userData.first_name}</h2>
      <p class="user__text">Languages: ${userData.languages}</p>
    </a>
  </section>
  `;
};

user.build = helpers.buildData(user.template);

/*******************************************************************************
-- HANDLER ---------------------------------------------------------------------
*******************************************************************************/
user.get = (userId, callback) => {
  waterfall(userId, [getData.user, user.build],
    (err, userData) => {
      if (err) { return callback(err); }
      helpers.replaceTemplate('users.html', '<!--USERS-->', userData, callback);
  });
};
