var sdk = require('../lib/api.js');

sdk.init({
  "app_id": "91312294",
  "app_key": "9fce4bb6bc33d780002fda854e6aaa03",
  "api_url": "https://dev.lifestreams.com:6100/beta1"
});

var data = {
  "description": "test post"
};

sdk.getUsers(function(err, data) {
  if (!err) {
    console.log(data);
  } else {
    throw err;
  }
});