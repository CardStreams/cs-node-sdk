var request = require('request');
var lodash = require('lodash');
var glucose = require('ls-glucose');

var routes = require('./routes.js');

var api_url = 'https://api.lifestreams.com/beta1';
var app_id;
var app_key;

var sugarRoutes = glucose.digest(routes, makeApiCallbackRequest);

function init(config) {
  if (!config.app_key) throw new Error('App Key is not provided.');
  if (!config.app_id) throw new Error('App Id is not provided.');

  app_id = config.app_id;
  app_key = config.app_key;
  api_url = config.api_url || api_url;
}

function makeApiRequest(url, method, data, callback) {
  if (!app_key || !app_id) throw new Error('API not initialized.');

  method = method || 'GET';

  var options = {
    method: method,
    uri: api_url + url,
    json: true,
    headers: {
      'X-Lifestreams-3scale-AppId': app_id,
      'X-Lifestreams-3scale-AppKey': app_key
    }
  };

  if (lodash.isFunction(data) && !callback) {
    callback = data;
  }

  if (!lodash.isFunction(data)) {
    options["body"] = data;
  }

  request(options, function(error, response, body) {
    if (response.statusCode == 200) {
      callback(body);
    } else {
      callback({
        error: response.statusCode,
        message: body
      });
    }
  });
}

function makeApiCallbackRequest(err, url, method, data, callback) {

  if (err) return callback(err);

  makeApiRequest(url, method, data, callback);

}

lodash.extend(module.exports, sugarRoutes);

module.exports.init = init;
module.exports.api = makeApiRequest;
module.exports.apiCallback = makeApiCallbackRequest;