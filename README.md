CardStreams Node SDK
=========

CardStreams Node SDK provides a set of methods to interact with CardStreams API in a NodeJS application.

Prerequisites
-------------
In order to be able to use the SDK and the API, app_id and app_key need to be generated in the Developer Portal

Installation
-----------

```sh
npm install ls-node-sdk
```

Initialization
-------------

```javascript
var CS = require('cs-node-sdk');
CS.init({
    app_id: "YOUR_CardStreams_ID",
    app_key: "YOUR_CardStreams_KEY
});
```

Initialization method accepts the following optional parameters:

| param name | description | type
| --- | --- | --- |
| api_user | API user, passed as one of the stringified objects: {"username":"username"} or {"userId":"userId"} | String |
| api_url | API endpoint URL, by default pointing to the latest production instance | String |

Usage
-----
## CS.api()
Make an api call to an existing enpoint and handle a reponse in a callback.
For available endpoints and their parameters please refer to Lifestreams Streaming API documentation.

### Parameters
name | description | type | required
--- | --- | --- | ---
url | An API endpoint name | String | true
method | Http request method | ENUM: GET, POST, PATCH, DELETE | true
data | Data object to pass to an api call | Object | false
callback | A JavaScript callback method to handle the response | Function | true
### Examples
Retrieve a list of streams

```javascript
CS.api("/stream", "get", function(err, response) {
    // do something with a response
    response.forEach(function(item) {
        console.log("Stream name: " + item.name);
    }):
});
```

Create a new stream

```javascript
CS.api("/stream", "post", {
    "name": "My random Stream name"
}, function(err, response) {
    if (response.error) {
        // handle error
        console.log(response.error + ": " + response.message);
    } else {
        // handle successful response
        console.log(response.name + " created successfuly!"
    }
});
```

## CS.getStreams()
Retrieve a list of streams available for authenticated user.

### Parameters
name | description | type | required
--- | --- | --- | ---
callback | A callback to handle errors and response data | Function | true

## CS.getStream()
Retrieve information about a stream.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
callback | A callback to handle errors and response data | Function | true

## CS.createStream()
Create a new stream.

### Parameters
name | description | type | required
--- | --- | --- | ---
data | Create a new stream. The request body should contain the following properties: *name*: A name or title (not necessarily unique) for the stream (required); *description*: (optional) A description of the stream | Object | true
callback | A callback to handle errors and response data | Function | true

## CS.deleteStream()
Delete a stream.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
callback | A callback to handle errors and response data | Function | true

## CS.updateStream()
Update a stream.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
data | The request body should contain the following properties: *name*: A name or title (not necessarily unique) for the stream (required); *description*: (optional) A description of the stream | Object | true
callback | A callback to handle errors and response data | Function | true

## CS.getCards()
Obtain cards from a given stream.
### Parameters
name | description | type | required | default
--- | --- | --- | --- | ---
streamID | A stream ID string | String | true | -
ts | Timestamp to use as a reference starting point within the stream. By default, this takes the value of the current timestamp. | Number | false | now()
direction | Direction to take from the provided starting timestamp. This parameter controls whether to fetch cards from the past, from the future or around the given timestamp. | ENUM: around, before, after | false | around
limit | Maximum amount of cards to return as a result of the streaming call. | Number | false | 20
query | Query string used to filter through the stream. This allows for textual search and other filtering. | String | false | -
media_urls | Whether the response should contain publicly accessible URLs to media attached in the cards. Also note the parameter urls_ttl | Boolean | false | false
preview_urls | Whether the response should contain publicly accessible URLs to media previews in the cards. Also note the parameter urls_ttl | Boolean | false | false
thumb_urls | Whether the response should contain publicly accessible URLs to media thumbnails in the cards. Also note the parameter urls_ttl | Boolean | false | false
urls_ttl | Only has effect when media_urls or preview_urls are enabled. This parameter allows to specify for how many seconds the publicly accessible URLs to attached media should remain valid. The TTL counter is independent for each response to a streaming request and starts counting down as soon as the response is produced. The maximum allowable value for this parameter is 86400 (equivalent to 24 hours) | Number | false | 300 |
callback | A callback to handle errors and response data | Function | true | -

## CS.getCard()
Retrieve contents of a card.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardID | A card ID string | String | true
callback | A callback to handle errors and response data | Function | true

## CS.createCard()
Add card to a stream.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
data | A data object containing information about a card. | Object | true
callback | A callback to handle errors and response data | Function | true

## CS.updateCard()
Modify contents of a card.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardId | A cardID string | String | true
data | A data object containing modified information about a card. | Object | true
callback | A callback to handle errors and response data | Function | true

## CS.getComments()
Retrieve comments for a given card.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardID | A card ID string | String | true
callback | A callback to handle errors and response data | Function | true

## CS.createComment()
Create a comment and attach it to a given card.
### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardID | A card ID string | String | true
data | A data object containing modified information about a card. | Object | true
callback | A callback to handle errors and response data | Function | true

## CS.getComment()
Retrieve a single comment.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardID | A card ID string | String | true
commentID | A comment ID string | String | true
callback | A callback to handle errors and response data | Function | true

## CS.deleteComment()
Delete a comment.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardID | A card ID string | String | true
commentID | A comment ID string | String | true
callback | A callback to handle errors and response data | Function | true

Testing
-------

```sh
npm run-script install-dev # depending on your config may ask for sudo
npm test
```