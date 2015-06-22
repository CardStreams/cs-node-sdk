module.exports = {
  "getStreams": {
    url: "/streams",
    method: "GET"
  },
  "createStream": {
    url: "/streams",
    method: "POST"
  },
  "getStream": {
    url: "/streams/{id}",
    method: "GET"
  },
  "createCard": {
    url: "/streams/{id}/cards",
    method: "POST"
  },
  "updateStream": {
    url: "/streams/{id}",
    method: "PATCH"
  },
  "deleteStream": {
    url: "/streams/{id}",
    method: "DELETE"
  },
  "getCard": {
    url: "/streams/{streamId}/cards/{cardId}",
    method: "GET"
  },
  "updateCard": {
    url: "/streams/{streamId}/cards/{cardId}",
    method: "PATCH"
  },
  "deleteCard": {
    url: "/streams/{streamId}/cards/{cardId}",
    method: "DELETE"
  },
  "getComment": {
    url: "/streams/{streamId}/cards/{cardId}/comments/{commentId}",
    method: "GET"
  },
  "deleteComment": {
    url: "/streams/{streamId}/cards/{cardId}/comments/{commentId}",
    method: "DELETE"
  },
  "getComments": {
    url: "/streams/{streamId}/cards/{cardId}/comments",
    method: "GET"
  },
  "createComment": {
    url: "/streams/{streamId}/cards/{cardId}/comments",
    method: "POST"
  },
  "getCards": {
    url: "/streams/{id}/cards?ts={?ts}&direction={?direction}&limit={?limit}&q={?q}",
    method: "GET"
  }
};