var sdk = require('../index.js');

var consumer_key = "SlNgHQlVduKKNWkezPxe0dfEHIP2dlTh";
var path = "/timelines";

sdk.init({
  "consumer_key": consumer_key,
  "api_url": "https://lifestreams-test.apigee.net/ls-dev/beta1"
});

var data = {
  "name": "test timeline",
  "description": "test timeline"
};

sdk.api(path, 'POST', data, function(data) {
  console.log(data)
});