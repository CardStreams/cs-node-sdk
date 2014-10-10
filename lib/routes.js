// TODO: talk about {id} origin and how to get it -- does the sdk
// need to do /user call initially? do we left it for the user?

// route syntax: {id} is transformed to arguments[parameter-index]
// {?id} identifies an optional parameter

var routes = {
  'getUsers': {
    url: '/user',
    method: 'GET'
  },
  'createUser': {
    url: '/user',
    method: 'POST'
  },
  'getUser': {
    url: '/user/{userId}',
    method: 'GET'
  },
  'listMemberships': {
    url: '/user/{userId}/memberships',
    method: 'GET'
  },
  'addMembership': {
    url: '/user/{userId}/membership',
    method: 'POST'
  },
  'getMembershipInfo': {
    url: '/user/{userId}/membership/{timelineId}',
    method: 'GET'
  },
  'modifyMembership': {
    url: '/user/{userId}/membership/{timelineId}',
    method: 'PATCH'
  },
  'getTimelines': {
    url: '/timeline',
    method: 'GET'
  },
  'createTimeline': {
    url: '/timeline',
    method: 'POST'
  },
  'getTimelineInfo': {
    url: '/timeline/{id}',
    method: 'GET'
  },
  'addCard': {
    url: '/timeline/{id}',
    method: 'POST'
  },
  'getCard': {
    url: '/timeline/{timelineId}/card/{cardId}',
    method: 'GET'
  },
  'modifyCard': {
    url: '/timeline/{timelineId}/card/{cardId}',
    method: 'PATCH'
  },
  'deleteCard': {
    url: '/timeline/{timelineId}/card/{cardId}',
    method: 'DELETE'
  },
  'getComments': {
    url: '/timeline/{timelineId}/card/{cardId}/comments',
    method: 'GET'
  },
  'addComment': {
    url: '/timeline/{timelineId}/card/{cardId}/comments',
    method: 'POST'
  },
  'getTimelineStream': {
    url: '/timeline/{id}/stream?ts={?ts}&direction={?direction}&limit={?limit}&q={?q}',
    method: 'GET'
  }
}

module.exports = routes;