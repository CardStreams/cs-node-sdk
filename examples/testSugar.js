var sdk = require('../lib/api.js');

sdk.init({
  api_id: "54340b777fb1f2e550000033",
  api_key: "8f9c88c5-1a10-468c-982b-f8708d29e8ad"
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