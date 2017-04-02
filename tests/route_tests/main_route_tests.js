const test = require('tape');
const shot = require('shot');
const fs = require('fs');
const path = require('path');
const router = require('./../../src/routers/main_router');

const readFile = (pathFromBase) => {
  return fs.readFileSync(path.join(__dirname, '..', '..', pathFromBase), 'utf8');
}

// EXAMPLE OBJECT TO RUN MULTIPLE ROUTE TESTS WITH
// Each key in the object is the name of a test.
// Each value is an array with two objects:
// The first - require options for Shot
// The second - options to test the response with
const routesToTest = {
  home:[{url:'/', method:'get'},
    {
      statusCode: 200,
      headers: {'Content-Type':'text/html'},
      payload: readFile('public/index.html'),
    }],
  404:[{url:'/THISPAGEDOESNOTEXIST', method:'get'},
    {
      statusCode: 404,
      headers: {'Content-Type':'text/html'},
      payload: '404: Page not found.',
    }],
  cssAsset:[{url:'/assets/css/index.css', method:'get'},
    {
      statusCode: 200,
      headers: {'Content-Type':'text/css'},
    }],
  badAssetUrl:[{url:'/assets/../index.html', method:'get'},
    {
      headers: {'Content-Type':'text/html'},
      statusCode: 404,
    }],
  badAssetType:[{url:'/assets/css/test.exe', method:'get'},
    {
      statusCode: 404,
    }],
  usersAll:[{url:'/users', method:'get'},
    {
      statusCode: 200,
    }],
  usersTeam:[{url:'/users?team=SoFly', method:'get'},
    {
      statusCode: 200,
    }],
};

/**
 * [Runs tests on an object filled with routes]
 * @param  {object} routesToTest
 */
function testMultipleRoutes (routesToTest) {
  Object.keys(routesToTest).forEach(route => {
    testRoute(routesToTest[route], route);
  });
}

function testRoute ([reqOptions, resOptions], name = '') {
  const method = reqOptions.method || 'get';
  const url = reqOptions.url || '/';

  // shortens long test messages
  const shorten = string => string.length > 30 ? '<correct long result>' : string;

  test(`Testing '${name || url}' with ${method}`, (t) => {
    shot.inject(router, reqOptions,
      (res) => {
        Object.keys(resOptions).forEach(option => {
          const testOption = resOptions[option];
          const response = res[option];

          // second level objects (headers[content-type], etc.)
          if (typeof testOption === 'object') {
            Object.keys(testOption).forEach(innerOption => {
              const result = shorten(response[innerOption]);
              const expected = shorten(testOption[innerOption]);

              t.equal(response[innerOption], testOption[innerOption],
                `${option}[${innerOption}] expected ${expected}, got ${result}`
              );
            });
            return;
          }

          const result = shorten(response);
          const expected = shorten(testOption);
          t.equal(response, testOption,
            `${option} expected ${expected}, got ${result}`);
        });
        t.end();
      });
  });
}

module.export = testMultipleRoutes(routesToTest);
