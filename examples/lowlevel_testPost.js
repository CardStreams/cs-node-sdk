var sdk = require('../index.js');

var api_id = "54340b777fb1f2e550000033";
var api_key = "8f9c88c5-1a10-468c-982b-f8708d29e8ad";
var path = "/v2/timeline/54340d7f7fb1f2e550000036";

sdk.init({
  api_id: "54340b777fb1f2e550000033",
  api_key: "8f9c88c5-1a10-468c-982b-f8708d29e8ad"
});

var data = {
  "description": "test post"
};

sdk.api('/timeline/54340d7f7fb1f2e550000036', 'POST', data, function(data) {
  console.log(data)
});