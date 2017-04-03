const getData = require('./../database/get_data');
const parallel = require('./../helper_functions/parallel');

module.exports = {
  method: 'GET',
  path: '/user',
  handler: (request, reply) => {
    const userId = request.query.id;
    const getUser = getData.user.call(null, userId);
    const getProj = getData.userProjects.call(null, userId);
    console.log(typeof getData.user, typeof getProj)
    parallel([getUser, getProj], (err, dataArray) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(dataArray);
      const data = { user: dataArray[0], projects: dataArray[1] };
      reply.view('user', data);
    });
  },
};
