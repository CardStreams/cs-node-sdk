var sdk = require('../index.js');

sdk.init({
  "app_id": "000000",
  "app_key": "000000000000000000",
  "api_url": "https://api.cardstreams.io/v1"
});

sdk.api('/streams', 'GET', function(data) {
  console.log(data)
});