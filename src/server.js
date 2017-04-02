const router = require('./routers/main_router');
const server = require('http').createServer(router);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
