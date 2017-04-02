const getData = require('./../database/get_data');

const waterfall = require('./../helper_functions/waterfall');

const helpers = require('./template_helpers');

module.exports = user = {};

/*******************************************************************************
-- TEMPLATES -------------------------------------------------------------------
*******************************************************************************/

const template = (user) => {
  return `
  <section class="user">
    <a href="https://github.com/${user.github_user_name}" class="user__link">
      <h3 class="user__name">${user.first_name}</h2>
      <p class="user__text">Languages: ${user.languages}</p>
    </a>
  </section>
  `;
};


/*******************************************************************************
-- HANDLER ---------------------------------------------------------------------
*******************************************************************************/
user.get = (user, callback) => {
  build = helpers.buildData(template);
  waterfall(user, [getData.user, build],
    (err, userData) => {
      if (err) { return callback(err); }
      helpers.replaceTemplate('users.html', '<!--USERS-->', userData, callback);
  });
};
