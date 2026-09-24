# Jsonplaceholder SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Jsonplaceholder",
            "slug": "jsonplaceholder",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://jsonplaceholder.typicode.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "album": {},
                "comment": {},
                "photo": {},
                "post": {},
                "todo": {},
                "user": {},
            },
        },
        "entity": {
      "album": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Album ID",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Album title",
          },
          {
            "name": "userId",
            "title": "User Id",
            "type": "`$INTEGER`",
            "op": {
              "create": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "patch": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "update": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "short": "User ID who created the album",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "album",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/albums",
                "segments": [
                  {
                    "lit": "albums",
                  },
                ],
                "parts": [
                  "albums",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/albums",
                "segments": [
                  {
                    "lit": "albums",
                  },
                ],
                "parts": [
                  "albums",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "user_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/users/{id}/albums",
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "user_id",
                  },
                  {
                    "lit": "albums",
                  },
                ],
                "parts": [
                  "users",
                  "{user_id}",
                  "albums",
                ],
                "rename": {
                  "param": {
                    "id": "user_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "user_id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "user_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/albums/{id}",
                "segments": [
                  {
                    "lit": "albums",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "albums",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/albums/{id}",
                "segments": [
                  {
                    "lit": "albums",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "albums",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/albums/{id}",
                "segments": [
                  {
                    "lit": "albums",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "albums",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/albums/{id}",
                "segments": [
                  {
                    "lit": "albums",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "albums",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.user",
            ],
          ],
        },
      },
      "comment": {
        "fields": [
          {
            "name": "body",
            "title": "Body",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Comment content",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Email of the commenter",
            "format": "email",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Comment ID",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Comment name/title",
          },
          {
            "name": "postId",
            "title": "Post Id",
            "type": "`$INTEGER`",
            "op": {
              "create": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "patch": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "update": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "short": "Post ID the comment belongs to",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "comment",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/comments",
                "segments": [
                  {
                    "lit": "comments",
                  },
                ],
                "parts": [
                  "comments",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/comments",
                "segments": [
                  {
                    "lit": "comments",
                  },
                ],
                "parts": [
                  "comments",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "post_id",
                      "orig": "post_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "post_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/posts/{id}/comments",
                "segments": [
                  {
                    "lit": "posts",
                  },
                  {
                    "var": "post_id",
                  },
                  {
                    "lit": "comments",
                  },
                ],
                "parts": [
                  "posts",
                  "{post_id}",
                  "comments",
                ],
                "rename": {
                  "param": {
                    "id": "post_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "post_id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "post_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/comments/{id}",
                "segments": [
                  {
                    "lit": "comments",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "comments",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/comments/{id}",
                "segments": [
                  {
                    "lit": "comments",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "comments",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/comments/{id}",
                "segments": [
                  {
                    "lit": "comments",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "comments",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/comments/{id}",
                "segments": [
                  {
                    "lit": "comments",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "comments",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.post",
            ],
          ],
        },
      },
      "photo": {
        "fields": [
          {
            "name": "albumId",
            "title": "Album Id",
            "type": "`$INTEGER`",
            "op": {
              "create": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "patch": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "update": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "short": "Album ID the photo belongs to",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Photo ID",
          },
          {
            "name": "thumbnailUrl",
            "title": "Thumbnail Url",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Photo thumbnail URL",
            "format": "uri",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Photo title",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Photo URL",
            "format": "uri",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "photo",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/photos",
                "segments": [
                  {
                    "lit": "photos",
                  },
                ],
                "parts": [
                  "photos",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/albums/{id}/photos",
                "segments": [
                  {
                    "lit": "albums",
                  },
                  {
                    "var": "album_id",
                  },
                  {
                    "lit": "photos",
                  },
                ],
                "parts": [
                  "albums",
                  "{album_id}",
                  "photos",
                ],
                "rename": {
                  "param": {
                    "id": "album_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "album_id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "album_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/photos",
                "segments": [
                  {
                    "lit": "photos",
                  },
                ],
                "parts": [
                  "photos",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "album_id",
                      "orig": "album_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "album_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/photos/{id}",
                "segments": [
                  {
                    "lit": "photos",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "photos",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/photos/{id}",
                "segments": [
                  {
                    "lit": "photos",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "photos",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/photos/{id}",
                "segments": [
                  {
                    "lit": "photos",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "photos",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/photos/{id}",
                "segments": [
                  {
                    "lit": "photos",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "photos",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.album",
            ],
          ],
        },
      },
      "post": {
        "fields": [
          {
            "name": "body",
            "title": "Body",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Post content",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Post ID",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Post title",
          },
          {
            "name": "userId",
            "title": "User Id",
            "type": "`$INTEGER`",
            "op": {
              "create": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "patch": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "update": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "short": "User ID who created the post",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "post",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/posts",
                "segments": [
                  {
                    "lit": "posts",
                  },
                ],
                "parts": [
                  "posts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/posts",
                "segments": [
                  {
                    "lit": "posts",
                  },
                ],
                "parts": [
                  "posts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "user_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/users/{id}/posts",
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "user_id",
                  },
                  {
                    "lit": "posts",
                  },
                ],
                "parts": [
                  "users",
                  "{user_id}",
                  "posts",
                ],
                "rename": {
                  "param": {
                    "id": "user_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "user_id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "user_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/posts/{id}",
                "segments": [
                  {
                    "lit": "posts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "posts",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/posts/{id}",
                "segments": [
                  {
                    "lit": "posts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "posts",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/posts/{id}",
                "segments": [
                  {
                    "lit": "posts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "posts",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/posts/{id}",
                "segments": [
                  {
                    "lit": "posts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "posts",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.user",
            ],
          ],
        },
      },
      "todo": {
        "fields": [
          {
            "name": "completed",
            "title": "Completed",
            "type": "`$BOOLEAN`",
            "op": {
              "create": {
                "req": True,
                "type": "`$BOOLEAN`",
              },
              "patch": {
                "req": True,
                "type": "`$BOOLEAN`",
              },
              "update": {
                "req": True,
                "type": "`$BOOLEAN`",
              },
            },
            "short": "Todo completion status",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Todo ID",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Todo title",
          },
          {
            "name": "userId",
            "title": "User Id",
            "type": "`$INTEGER`",
            "op": {
              "create": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "patch": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "update": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "short": "User ID who created the todo",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "todo",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/todos",
                "segments": [
                  {
                    "lit": "todos",
                  },
                ],
                "parts": [
                  "todos",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/todos",
                "segments": [
                  {
                    "lit": "todos",
                  },
                ],
                "parts": [
                  "todos",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "user_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/users/{id}/todos",
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "user_id",
                  },
                  {
                    "lit": "todos",
                  },
                ],
                "parts": [
                  "users",
                  "{user_id}",
                  "todos",
                ],
                "rename": {
                  "param": {
                    "id": "user_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "user_id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "user_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/todos/{id}",
                "segments": [
                  {
                    "lit": "todos",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "todos",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/todos/{id}",
                "segments": [
                  {
                    "lit": "todos",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "todos",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/todos/{id}",
                "segments": [
                  {
                    "lit": "todos",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "todos",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/todos/{id}",
                "segments": [
                  {
                    "lit": "todos",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "todos",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.user",
            ],
          ],
        },
      },
      "user": {
        "fields": [
          {
            "name": "address",
            "title": "Address",
            "type": "`$OBJECT`",
          },
          {
            "name": "company",
            "title": "Company",
            "type": "`$OBJECT`",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "User email",
            "format": "email",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "User ID",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "User full name",
          },
          {
            "name": "phone",
            "title": "Phone",
            "type": "`$STRING`",
            "short": "User phone number",
          },
          {
            "name": "username",
            "title": "Username",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "patch": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Username",
          },
          {
            "name": "website",
            "title": "Website",
            "type": "`$STRING`",
            "short": "User website",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "user",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/users",
                "segments": [
                  {
                    "lit": "users",
                  },
                ],
                "parts": [
                  "users",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/users",
                "segments": [
                  {
                    "lit": "users",
                  },
                ],
                "parts": [
                  "users",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/users/{id}",
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "users",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/users/{id}",
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "users",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/users/{id}",
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "users",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/users/{id}",
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "users",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
