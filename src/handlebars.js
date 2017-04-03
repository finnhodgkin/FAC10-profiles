const handlebars = require('handlebars');

module.exports = {
  engines: {
    hbs: handlebars,
  },
  path: 'views',
  layout: 'users',
  relativeTo: __dirname,
  layoutPath: 'views/layouts',
  partialsPath: 'views/partials',
  helpersPath: 'views/helpers',
};
