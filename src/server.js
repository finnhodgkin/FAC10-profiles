const hapi = require('hapi');
const server = new hapi.Server();

const inert = require('inert');
const vision = require('vision');

const routes = require('./routes');
const handlebars = require('./handlebars');

server.connection({
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || 4000,
});

server.register([inert, vision], err => {
  if (err) throw err;
  server.views(handlebars);
  server.route(routes);
});

server.start(err => {
  if (err) throw err;
  console.log(`Server running at: ${server.info.uri}`)
});
