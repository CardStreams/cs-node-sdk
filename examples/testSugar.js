var sdk = require('../lib/api.js');

sdk.init({
  api_id: "54340b777fb1f2e550000033",
  api_key: "8f9c88c5-1a10-468c-982b-f8708d29e8ad"
});

var data = {
  "description": "test post",
  "postAt": (Date.now() / 1000) | 0,
  "location": {
      "latitude": 0,
      "longitude": 0,
  },
  "eventData": {
      "title": "Event name",
      "details": "No dress code",
      "location": {
          "latitude": 0.10101,
          "longitude": 10.0202
      },
      "startTime": (Date.now() / 1000) | 0,
      "endTime": (Date.now() + 100 / 1000) | 0
  },
  "attachments": []
};

sdk.getUsers(function(err, data) {
  if (!err) {
    console.log(data);
  } else {
    throw err;
  }
});

// sdk.getTimelineStream('54340d7f7fb1f2e550000036', Date.now(), "before", 10, "", function(err, data) {
//   if (!err) {
//     console.log(data);
//   } else {
//     throw err;
//   }
// });

// sdk.getTimelineStream('54340d7f7fb1f2e550000036', Date.now(), "before", 1, "", function(err, data) {
//   if (!err) {
//     console.log(data);
//   } else {
//     throw err;
//   }
// });