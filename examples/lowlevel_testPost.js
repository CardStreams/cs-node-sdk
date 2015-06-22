var sdk = require('../index.js');

var path = "/streams";

sdk.init({
  "app_id": "000000",
  "app_key": "000000000000000000",
  "api_url": "https://api.cardstreams.io/v1"
});

var data = {
  "name": "test timeline",
  "description": "test timeline"
};

sdk.api(path, 'POST', data, function(data) {
  console.log(data)
});