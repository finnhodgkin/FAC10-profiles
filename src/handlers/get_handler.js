const fs = require('fs');
const path = require('path');
const url = require('url');
const handler = {};


/*******************************************************************************
-- DYNAMIC CONTENT -------------------------------------------------------------
*******************************************************************************/
const handle = (req, res) => (err, html) => {
    if (err) {
      handler.error(req, res, err);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
};

const templateUser = require('./template_user');
handler.user = (req, res) => {
  const serve = handle.call(null, req, res);

  const query = url.parse(req.url, true).query;
  const hasQuery = Object.keys(query).length;

  if (query.id) {
    templateUser.get(query.id, serve);

  } else {
    handler.error(req, res, new Error('Error in \'Users\' query.'));
  }
};

const templateUsers = require('./template_users');
handler.users = (req, res) => {
  const serve = handle.call(null, req, res);

  const query = url.parse(req.url, true).query;
  const hasQuery = Object.keys(query).length;

  if (!hasQuery) {
    templateUsers.all(serve);

  } else if (query.team) {
    templateUsers.filteredByTeam(query.team, serve);

  } else {
    handler.error(req, res, new Error('Error in \'Users\' query.'));
  }

};

/*******************************************************************************
-- STATIC CONTENT --------------------------------------------------------------
*******************************************************************************/

/**
 * [Serve static assets or pages]
 * @param  {object} req      [request object]
 * @param  {object} res      [response object]
 * @param  {string} filePath [path to the requested file]
 */
handler.static = (req, res, filePath) => {
  const extension = filePath.split('.').pop();
  const mimeType = {
    'html':'text/html', 'css':'text/css', 'js':'application/javascript',
    'ico':'image/x-icon', 'jpg':'image/jpeg', 'png':'image/png',
    'gif':'image/gif',
  }[extension];

  const validatedPath = (path => Boolean(!(path.includes('..')) && mimeType))(filePath);
  const fPath = path.join(__dirname, '..', '..', 'public', filePath);

  validatedPath ?
    fs.readFile(fPath, (err, file) => {
      if (err) {
        handler.error(req, res, err);
        return;
      }
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(file);
    }) :
    handler.error(req, res, new Error('Static path not valid.'));
};

/**
 * Serve error pages
 * @param  {object} req  [Request object]
 * @param  {object} res  [Response object]
 * @param  {Error} err  [Optional Error]
 * @param  {number} type [Optional status code]
 */
handler.error = (req, res, err, statusCode) => {
  if (err) {
    console.log(err.message);
  }
  res.writeHead(statusCode || 404, { 'Content-Type': 'text/html' });
  res.end('404: Page not found.');
};

module.exports = handler;
