var sdk = require('../index.js');
// sdk.init({ /* api key and stuff */});
// sdk.createUser(/* params */);


sdk.init({
  api_id: "54340b777fb1f2e550000033",
  api_key: "8f9c88c5-1a10-468c-982b-f8708d29e8ad"
});

sdk.api('/timeline/54340d7f7fb1f2e550000036', 'GET', function(data) {
  console.log(data)
});

// sdk.subscribe('channel_name', function(data) {
//   console.log(data);
// })