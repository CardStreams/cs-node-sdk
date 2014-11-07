var sdk = require('../index.js');

var consumer_key = "SlNgHQlVduKKNWkezPxe0dfEHIP2dlTh";

sdk.init({
  "consumer_key": consumer_key,
  "api_url": "https://lifestreams-test.apigee.net/ls-dev/beta1"
});

sdk.api('/timelines', 'GET', function(data) {
  console.log(data)
});