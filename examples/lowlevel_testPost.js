var sdk = require('../index.js');

var path = "/timelines";

sdk.init({
  "app_id": "91312294",
  "app_key": "9fce4bb6bc33d780002fda854e6aaa03",
  "api_url": "https://dev.lifestreams.com:6100/beta1"
});

var data = {
  "name": "test timeline",
  "description": "test timeline"
};

sdk.api(path, 'POST', data, function(data) {
  console.log(data)
});