import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "album",
    "accessor": "Album",
    "op": "create",
    "method": "POST",
    "path": "/albums",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "id": 1,
      "userId": 1,
      "title": "x"
    },
    "idField": "id"
  },
  {
    "entity": "album",
    "accessor": "Album",
    "op": "list",
    "method": "GET",
    "path": "/users/{id}/albums",
    "args": [
      {
        "name": "user_id",
        "wire": "id",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "userId": 1,
        "title": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "album",
    "accessor": "Album",
    "op": "list",
    "method": "GET",
    "path": "/albums",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "userId"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "userId": 1,
        "title": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "album",
    "accessor": "Album",
    "op": "load",
    "method": "GET",
    "path": "/albums/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "userId": 1,
      "title": "x"
    },
    "idField": "id"
  },
  {
    "entity": "album",
    "accessor": "Album",
    "op": "patch",
    "method": "PATCH",
    "path": "/albums/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "userId": 1,
      "title": "x"
    },
    "idField": "id"
  },
  {
    "entity": "album",
    "accessor": "Album",
    "op": "remove",
    "method": "DELETE",
    "path": "/albums/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "album",
    "accessor": "Album",
    "op": "update",
    "method": "PUT",
    "path": "/albums/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "userId": 1,
      "title": "x"
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "create",
    "method": "POST",
    "path": "/comments",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "id": 1,
      "postId": 1,
      "name": "x",
      "email": "x",
      "body": "x"
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "list",
    "method": "GET",
    "path": "/posts/{id}/comments",
    "args": [
      {
        "name": "post_id",
        "wire": "id",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "postId": 1,
        "name": "x",
        "email": "x",
        "body": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "list",
    "method": "GET",
    "path": "/comments",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "postId"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "postId": 1,
        "name": "x",
        "email": "x",
        "body": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "load",
    "method": "GET",
    "path": "/comments/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "postId": 1,
      "name": "x",
      "email": "x",
      "body": "x"
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "patch",
    "method": "PATCH",
    "path": "/comments/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "postId": 1,
      "name": "x",
      "email": "x",
      "body": "x"
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "remove",
    "method": "DELETE",
    "path": "/comments/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "update",
    "method": "PUT",
    "path": "/comments/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "postId": 1,
      "name": "x",
      "email": "x",
      "body": "x"
    },
    "idField": "id"
  },
  {
    "entity": "photo",
    "accessor": "Photo",
    "op": "create",
    "method": "POST",
    "path": "/photos",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "id": 1,
      "albumId": 1,
      "title": "x",
      "url": "x",
      "thumbnailUrl": "x"
    },
    "idField": "id"
  },
  {
    "entity": "photo",
    "accessor": "Photo",
    "op": "list",
    "method": "GET",
    "path": "/albums/{id}/photos",
    "args": [
      {
        "name": "album_id",
        "wire": "id",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "albumId": 1,
        "title": "x",
        "url": "x",
        "thumbnailUrl": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "photo",
    "accessor": "Photo",
    "op": "list",
    "method": "GET",
    "path": "/photos",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "albumId"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "albumId": 1,
        "title": "x",
        "url": "x",
        "thumbnailUrl": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "photo",
    "accessor": "Photo",
    "op": "load",
    "method": "GET",
    "path": "/photos/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "albumId": 1,
      "title": "x",
      "url": "x",
      "thumbnailUrl": "x"
    },
    "idField": "id"
  },
  {
    "entity": "photo",
    "accessor": "Photo",
    "op": "patch",
    "method": "PATCH",
    "path": "/photos/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "albumId": 1,
      "title": "x",
      "url": "x",
      "thumbnailUrl": "x"
    },
    "idField": "id"
  },
  {
    "entity": "photo",
    "accessor": "Photo",
    "op": "remove",
    "method": "DELETE",
    "path": "/photos/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "photo",
    "accessor": "Photo",
    "op": "update",
    "method": "PUT",
    "path": "/photos/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "albumId": 1,
      "title": "x",
      "url": "x",
      "thumbnailUrl": "x"
    },
    "idField": "id"
  },
  {
    "entity": "post",
    "accessor": "Post",
    "op": "create",
    "method": "POST",
    "path": "/posts",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "id": 1,
      "userId": 1,
      "title": "x",
      "body": "x"
    },
    "idField": "id"
  },
  {
    "entity": "post",
    "accessor": "Post",
    "op": "list",
    "method": "GET",
    "path": "/users/{id}/posts",
    "args": [
      {
        "name": "user_id",
        "wire": "id",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "userId": 1,
        "title": "x",
        "body": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "post",
    "accessor": "Post",
    "op": "list",
    "method": "GET",
    "path": "/posts",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "userId"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "userId": 1,
        "title": "x",
        "body": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "post",
    "accessor": "Post",
    "op": "load",
    "method": "GET",
    "path": "/posts/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "userId": 1,
      "title": "x",
      "body": "x"
    },
    "idField": "id"
  },
  {
    "entity": "post",
    "accessor": "Post",
    "op": "patch",
    "method": "PATCH",
    "path": "/posts/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "userId": 1,
      "title": "x",
      "body": "x"
    },
    "idField": "id"
  },
  {
    "entity": "post",
    "accessor": "Post",
    "op": "remove",
    "method": "DELETE",
    "path": "/posts/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "post",
    "accessor": "Post",
    "op": "update",
    "method": "PUT",
    "path": "/posts/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "userId": 1,
      "title": "x",
      "body": "x"
    },
    "idField": "id"
  },
  {
    "entity": "todo",
    "accessor": "Todo",
    "op": "create",
    "method": "POST",
    "path": "/todos",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "id": 1,
      "userId": 1,
      "title": "x",
      "completed": true
    },
    "idField": "id"
  },
  {
    "entity": "todo",
    "accessor": "Todo",
    "op": "list",
    "method": "GET",
    "path": "/users/{id}/todos",
    "args": [
      {
        "name": "user_id",
        "wire": "id",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "userId": 1,
        "title": "x",
        "completed": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "todo",
    "accessor": "Todo",
    "op": "list",
    "method": "GET",
    "path": "/todos",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "userId"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "userId": 1,
        "title": "x",
        "completed": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "todo",
    "accessor": "Todo",
    "op": "load",
    "method": "GET",
    "path": "/todos/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "userId": 1,
      "title": "x",
      "completed": true
    },
    "idField": "id"
  },
  {
    "entity": "todo",
    "accessor": "Todo",
    "op": "patch",
    "method": "PATCH",
    "path": "/todos/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "userId": 1,
      "title": "x",
      "completed": true
    },
    "idField": "id"
  },
  {
    "entity": "todo",
    "accessor": "Todo",
    "op": "remove",
    "method": "DELETE",
    "path": "/todos/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "todo",
    "accessor": "Todo",
    "op": "update",
    "method": "PUT",
    "path": "/todos/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "userId": 1,
      "title": "x",
      "completed": true
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "create",
    "method": "POST",
    "path": "/users",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "id": 1,
      "name": "x",
      "username": "x",
      "email": "x",
      "address": {
        "street": "x",
        "suite": "x",
        "city": "x",
        "zipcode": "x",
        "geo": {
          "lat": "x",
          "lng": "x"
        }
      },
      "phone": "x",
      "website": "x",
      "company": {
        "name": "x",
        "catchPhrase": "x",
        "bs": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "list",
    "method": "GET",
    "path": "/users",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "username": "x",
        "email": "x",
        "address": {
          "street": "x",
          "suite": "x",
          "city": "x",
          "zipcode": "x",
          "geo": {
            "lat": "x",
            "lng": "x"
          }
        },
        "phone": "x",
        "website": "x",
        "company": {
          "name": "x",
          "catchPhrase": "x",
          "bs": "x"
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "load",
    "method": "GET",
    "path": "/users/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "username": "x",
      "email": "x",
      "address": {
        "street": "x",
        "suite": "x",
        "city": "x",
        "zipcode": "x",
        "geo": {
          "lat": "x",
          "lng": "x"
        }
      },
      "phone": "x",
      "website": "x",
      "company": {
        "name": "x",
        "catchPhrase": "x",
        "bs": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "patch",
    "method": "PATCH",
    "path": "/users/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "username": "x",
      "email": "x",
      "address": {
        "street": "x",
        "suite": "x",
        "city": "x",
        "zipcode": "x",
        "geo": {
          "lat": "x",
          "lng": "x"
        }
      },
      "phone": "x",
      "website": "x",
      "company": {
        "name": "x",
        "catchPhrase": "x",
        "bs": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "remove",
    "method": "DELETE",
    "path": "/users/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "update",
    "method": "PUT",
    "path": "/users/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "username": "x",
      "email": "x",
      "address": {
        "street": "x",
        "suite": "x",
        "city": "x",
        "zipcode": "x",
        "geo": {
          "lat": "x",
          "lng": "x"
        }
      },
      "phone": "x",
      "website": "x",
      "company": {
        "name": "x",
        "catchPhrase": "x",
        "bs": "x"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
