const fs = require('fs');
const path = require('path');

module.exports = helpers = {};

helpers.buildData = template => (data, callback) => {
  html = data.reduce((acc, data) => acc + template(data), '');
  callback(null, html);
}

helpers.replaceHtml = (filename, toReplace, replaceWith, callback) => {
  fs.readFile(filename, 'utf8', (err, file) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, file.replace(toReplace, replaceWith));
  });
};

helpers.replaceTemplate = (template, replace, rWith, cb) => {
  helpers.replaceHtml(path.join(__dirname, '..', 'templates', template), replace, rWith, cb);
};
