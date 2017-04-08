const auth = require('./../database/auth_data');
const bcrypt = require('bcrypt');

module.exports = {
  method: 'POST',
  path: '/login',
  handler: (req, reply) => {
    const username = req.payload.username;
    const password = req.payload.password;

    auth.getDetails(username, (err, user) => {
      bcrypt.compare(password, user.password, function(err, res) {
        reply.view('loggedin')
      });
    });

  },
};
