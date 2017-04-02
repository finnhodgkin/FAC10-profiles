const url = require('url');

const handler = require('./../handlers/get_handler');
const handlerPost = require('./../handlers/post_handler');

const router = (req, res) => {
  const pathname = url.parse(req.url).pathname;
  const isAsset = pathname.indexOf('/assets') !== -1;

  const path = {
    '/': handler.users,
    '/users': handler.users,
    '/user': handler.user,
  }[pathname];

  if (path || isAsset) {
    isAsset || typeof path === 'string' ?
      handler.static(req, res, path || pathname) :
      path(req, res);

  } else {
    handler.error(req, res);

  }
};

module.exports = router;
