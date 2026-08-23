
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Jsonplaceholder',
        slug: "jsonplaceholder",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://jsonplaceholder.typicode.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      album: {
      },

      comment: {
      },

      photo: {
      },

      post: {
      },

      todo: {
      },

      user: {
      },

    }
  }


  entity = {
    "album": {
      "fields": [
        {
          "name": "id",
          "short": "Album ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "title",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Album title",
          "type": "`$STRING`"
        },
        {
          "name": "userId",
          "op": {
            "create": {
              "req": true,
              "type": "`$INTEGER`"
            },
            "patch": {
              "req": true,
              "type": "`$INTEGER`"
            },
            "update": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "short": "User ID who created the album",
          "type": "`$INTEGER`"
        }
      ],
      "name": "album",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/albums",
              "parts": [
                "albums"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "user_id",
                    "orig": "user_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/albums",
              "parts": [
                "albums"
              ],
              "select": {
                "exist": [
                  "user_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "user_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/users/{id}/albums",
              "parts": [
                "users",
                "{user_id}",
                "albums"
              ],
              "rename": {
                "param": {
                  "id": "user_id"
                }
              },
              "select": {
                "exist": [
                  "user_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/albums/{id}",
              "parts": [
                "albums",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "patch": {
          "input": "data",
          "name": "patch",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PATCH",
              "orig": "/albums/{id}",
              "parts": [
                "albums",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/albums/{id}",
              "parts": [
                "albums",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/albums/{id}",
              "parts": [
                "albums",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "user"
          ]
        ]
      }
    },
    "comment": {
      "fields": [
        {
          "name": "body",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Comment content",
          "type": "`$STRING`"
        },
        {
          "name": "email",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Email of the commenter",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Comment ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Comment name/title",
          "type": "`$STRING`"
        },
        {
          "name": "postId",
          "op": {
            "create": {
              "req": true,
              "type": "`$INTEGER`"
            },
            "patch": {
              "req": true,
              "type": "`$INTEGER`"
            },
            "update": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "short": "Post ID the comment belongs to",
          "type": "`$INTEGER`"
        }
      ],
      "name": "comment",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/comments",
              "parts": [
                "comments"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "post_id",
                    "orig": "post_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/comments",
              "parts": [
                "comments"
              ],
              "select": {
                "exist": [
                  "post_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "post_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/posts/{id}/comments",
              "parts": [
                "posts",
                "{post_id}",
                "comments"
              ],
              "rename": {
                "param": {
                  "id": "post_id"
                }
              },
              "select": {
                "exist": [
                  "post_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/comments/{id}",
              "parts": [
                "comments",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "patch": {
          "input": "data",
          "name": "patch",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PATCH",
              "orig": "/comments/{id}",
              "parts": [
                "comments",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/comments/{id}",
              "parts": [
                "comments",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/comments/{id}",
              "parts": [
                "comments",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "post"
          ]
        ]
      }
    },
    "photo": {
      "fields": [
        {
          "name": "albumId",
          "op": {
            "create": {
              "req": true,
              "type": "`$INTEGER`"
            },
            "patch": {
              "req": true,
              "type": "`$INTEGER`"
            },
            "update": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "short": "Album ID the photo belongs to",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "short": "Photo ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "thumbnailUrl",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Photo thumbnail URL",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Photo title",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Photo URL",
          "type": "`$STRING`"
        }
      ],
      "name": "photo",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/photos",
              "parts": [
                "photos"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "album_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/albums/{id}/photos",
              "parts": [
                "albums",
                "{album_id}",
                "photos"
              ],
              "rename": {
                "param": {
                  "id": "album_id"
                }
              },
              "select": {
                "exist": [
                  "album_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "album_id",
                    "orig": "album_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/photos",
              "parts": [
                "photos"
              ],
              "select": {
                "exist": [
                  "album_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/photos/{id}",
              "parts": [
                "photos",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "patch": {
          "input": "data",
          "name": "patch",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PATCH",
              "orig": "/photos/{id}",
              "parts": [
                "photos",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/photos/{id}",
              "parts": [
                "photos",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/photos/{id}",
              "parts": [
                "photos",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "album"
          ]
        ]
      }
    },
    "post": {
      "fields": [
        {
          "name": "body",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Post content",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Post ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "title",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Post title",
          "type": "`$STRING`"
        },
        {
          "name": "userId",
          "op": {
            "create": {
              "req": true,
              "type": "`$INTEGER`"
            },
            "patch": {
              "req": true,
              "type": "`$INTEGER`"
            },
            "update": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "short": "User ID who created the post",
          "type": "`$INTEGER`"
        }
      ],
      "name": "post",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/posts",
              "parts": [
                "posts"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "user_id",
                    "orig": "user_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/posts",
              "parts": [
                "posts"
              ],
              "select": {
                "exist": [
                  "user_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "user_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/users/{id}/posts",
              "parts": [
                "users",
                "{user_id}",
                "posts"
              ],
              "rename": {
                "param": {
                  "id": "user_id"
                }
              },
              "select": {
                "exist": [
                  "user_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/posts/{id}",
              "parts": [
                "posts",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "patch": {
          "input": "data",
          "name": "patch",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PATCH",
              "orig": "/posts/{id}",
              "parts": [
                "posts",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/posts/{id}",
              "parts": [
                "posts",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/posts/{id}",
              "parts": [
                "posts",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "user"
          ]
        ]
      }
    },
    "todo": {
      "fields": [
        {
          "name": "completed",
          "op": {
            "create": {
              "req": true,
              "type": "`$BOOLEAN`"
            },
            "patch": {
              "req": true,
              "type": "`$BOOLEAN`"
            },
            "update": {
              "req": true,
              "type": "`$BOOLEAN`"
            }
          },
          "short": "Todo completion status",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "id",
          "short": "Todo ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "title",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Todo title",
          "type": "`$STRING`"
        },
        {
          "name": "userId",
          "op": {
            "create": {
              "req": true,
              "type": "`$INTEGER`"
            },
            "patch": {
              "req": true,
              "type": "`$INTEGER`"
            },
            "update": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "short": "User ID who created the todo",
          "type": "`$INTEGER`"
        }
      ],
      "name": "todo",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/todos",
              "parts": [
                "todos"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "user_id",
                    "orig": "user_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/todos",
              "parts": [
                "todos"
              ],
              "select": {
                "exist": [
                  "user_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "user_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/users/{id}/todos",
              "parts": [
                "users",
                "{user_id}",
                "todos"
              ],
              "rename": {
                "param": {
                  "id": "user_id"
                }
              },
              "select": {
                "exist": [
                  "user_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/todos/{id}",
              "parts": [
                "todos",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "patch": {
          "input": "data",
          "name": "patch",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PATCH",
              "orig": "/todos/{id}",
              "parts": [
                "todos",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/todos/{id}",
              "parts": [
                "todos",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/todos/{id}",
              "parts": [
                "todos",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "user"
          ]
        ]
      }
    },
    "user": {
      "fields": [
        {
          "name": "address",
          "type": "`$OBJECT`"
        },
        {
          "name": "company",
          "type": "`$OBJECT`"
        },
        {
          "name": "email",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "User email",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "User ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "User full name",
          "type": "`$STRING`"
        },
        {
          "name": "phone",
          "short": "User phone number",
          "type": "`$STRING`"
        },
        {
          "name": "username",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "patch": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Username",
          "type": "`$STRING`"
        },
        {
          "name": "website",
          "short": "User website",
          "type": "`$STRING`"
        }
      ],
      "name": "user",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/users",
              "parts": [
                "users"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/users",
              "parts": [
                "users"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/users/{id}",
              "parts": [
                "users",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "patch": {
          "input": "data",
          "name": "patch",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PATCH",
              "orig": "/users/{id}",
              "parts": [
                "users",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/users/{id}",
              "parts": [
                "users",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/users/{id}",
              "parts": [
                "users",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

