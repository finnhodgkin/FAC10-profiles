const getData = require('./../database/get_data');

module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    const getUsers = (err, userArr) => {
      if (err) {
        console.log(err);
        return;
      }
      const data = { users: userArr };
      reply.view('index', data);
    }

    if (request.query.team) {
      getData.filteredByTeam(request.query.team, getUsers);
    } else {
      getData.allUsers(null, getUsers);
    }
    
  },
};
