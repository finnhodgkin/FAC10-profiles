module.exports = {
  method: 'GET',
  path: '/login_form',
  handler: (request, reply) => {
    // if (true) return reply.view('index');
    reply.view('login');
  },
};
