var http = require('http');
var urlParser = require('url');
var sha1sum = require('sha1'); // replace with native 'crypto' module?
var lodash = require('lodash');
var glucose = require('glucose');

var routes = require('./routes.js');

var api_url = 'http://localhost:6100/v2';
var api_id;
var api_key;
var api_user;

var sugarRoutes = glucose.digest(routes, makeApiRequest);

function createTimestamp() {
  return Date.now() / 1000 | 0;
}

function createSignature(hashFn, apiKey, apiUser) {
  var sign;
  var timestamp = createTimestamp();
  if (apiUser) {
    sign = hashFn(apiUser + apiKey + timestamp)
  } else {
    sign = hashFn(apiKey + timestamp);
  }
  return sign;
}

function init(config) {
  if (!config.api_id) throw new Error('Api ID is not provided.');
  if (!config.api_key) throw new Error('Api Key is not provided.');

  api_id = config.api_id;
  api_key = config.api_key;
  api_user = config.api_user;
  api_url = config.api_url || api_url;
}

function makeApiRequest(err, url, method, data, callback) {
  if (!api_id || !api_key) throw new Error('API not initialized.');

  var signature;
  var postString;

  method = method || 'GET';

  if (!lodash.isObject(data) && data !== undefined) {
    callback = data;
  }

  var urlParts = urlParser.parse(api_url + url);

  console.log("SDK request ->", urlParts.hostname, urlParts.port, urlParts.path, method); // TODO: remove

  var request = http.request({

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

  signature = createSignature(sha1sum, api_key, api_user);

  if (api_user) {
    request.setHeader('X-Auth-User', api_user);
  }

  request.setHeader('X-Auth-ApiKeyId', api_id);
  request.setHeader('X-Auth-Timestamp', createTimestamp());
  request.setHeader('X-Auth-Signature', signature);

  if (method === 'POST') {
    request.setHeader('Content-Type', 'application/json;charset=UTF-8');
    postString = JSON.stringify(data);
    request.setHeader('Content-Length', postString.length);
    request.write(postString);
  }

  request.end();
}

lodash.extend(module.exports, sugarRoutes);

module.exports.init = init;
module.exports.api = makeApiRequest;