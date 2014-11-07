var https = require('https');
var urlParser = require('url');

var lodash = require('lodash');
var glucose = require('ls-glucose');

var routes = require('./routes.js');

var api_url = 'https://api.lifestreams.com/beta1';
var api_user;
var consumer_key;

var sugarRoutes = glucose.digest(routes, makeApiCallbackRequest);

function init(config) {
  if (!config.consumer_key) throw new Error('Api Key is not provided.');

  consumer_key = config.consumer_key;
  api_url = config.api_url || api_url;
  api_user = config.api_user || api_user;
}

function makeApiRequest(url, method, data, callback) {
  if (!consumer_key) throw new Error('API not initialized.');

  var postString;

  method = method || 'GET';


  if (lodash.isFunction(data) && !callback) {
    callback = data;
  }

  var urlParts = urlParser.parse(api_url + url);

  var request = https.request({

    host: urlParts.hostname,
    port: urlParts.port,
    path: urlParts.path,
    method: method

  }, function(response) {

    response.setEncoding('utf8');
    response.on("data", function(data) {

      if (response.statusCode == 200) {
        if (callback) callback(null, JSON.parse(data));

      } else {
        if (callback) {
          callback({
            error: response.statusCode,
            message: data
          })
        }
      }
    })
  });

  request.on('error', callback);

  if (api_user) {
    request.setHeader('X-Lifestreams-User', api_user);
  }

  request.setHeader('X-Lifestreams-ConsumerKey', consumer_key);

  if (method === 'POST') {
    request.setHeader('Content-Type', 'application/json;charset=UTF-8');
    postString = JSON.stringify(data) || "";
    request.setHeader('Content-Length', postString.length);
    request.write(postString);
  }

  request.end();
}

function makeApiCallbackRequest(err, url, method, data, callback) {

  if (err) return callback(err);

  makeApiRequest(url, method, data, callback);

}

lodash.extend(module.exports, sugarRoutes);

module.exports.init = init;
module.exports.api = makeApiRequest;
module.exports.apiCallback = makeApiCallbackRequest;