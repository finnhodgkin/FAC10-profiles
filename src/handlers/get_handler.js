const fs = require('fs');
const path = require('path');
const handler = {};


/*******************************************************************************
-- DYNAMIC CONTENT -------------------------------------------------------------
*******************************************************************************/



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

  const validatedPath = (path => Boolean((!path.includes('..')) && mimeType))(filePath);

  validatedPath ?
    fs.readFile(path.join(__dirname, '..', '..', 'public', filePath), 'utf8', (err, file) => {
      if (err) {
        handler.error(req, res, err);
        return;
      }
      res.writeHead(200, {'Content-Type': mimeType});
      res.end(file);
    }) : handler.error(req, res, new Error('Static path not valid.'));
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
  res.end('404: Page not found.')
}

module.exports = handler;
