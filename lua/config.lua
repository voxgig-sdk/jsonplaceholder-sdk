-- Jsonplaceholder SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Jsonplaceholder",
      slug = "jsonplaceholder",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://jsonplaceholder.typicode.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["album"] = {},
        ["comment"] = {},
        ["photo"] = {},
        ["post"] = {},
        ["todo"] = {},
        ["user"] = {},
      },
    },
    entity = {
      ["album"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["short"] = "Album ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "title",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Album title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "userId",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
            },
            ["short"] = "User ID who created the album",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "album",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/albums",
                ["segments"] = {
                  {
                    ["lit"] = "albums",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "albums",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/albums",
                ["segments"] = {
                  {
                    ["lit"] = "albums",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "albums",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "user_id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{id}/albums",
                ["rename"] = {
                  ["param"] = {
                    ["id"] = "user_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "albums",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "albums",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/albums/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "albums",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "albums",
                  "{id}",
                },
              },
            },
          },
          ["patch"] = {
            ["input"] = "data",
            ["name"] = "patch",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/albums/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "albums",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "albums",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/albums/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "albums",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "albums",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/albums/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "albums",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "albums",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "user",
            },
          },
        },
      },
      ["comment"] = {
        ["fields"] = {
          {
            ["name"] = "body",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Comment content",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "email",
            ["name"] = "email",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Email of the commenter",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Comment ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Comment name/title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "postId",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
            },
            ["short"] = "Post ID the comment belongs to",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "comment",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/comments",
                ["segments"] = {
                  {
                    ["lit"] = "comments",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "comments",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "post_id",
                      ["orig"] = "post_id",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/comments",
                ["segments"] = {
                  {
                    ["lit"] = "comments",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "post_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "comments",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "post_id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/posts/{id}/comments",
                ["rename"] = {
                  ["param"] = {
                    ["id"] = "post_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "posts",
                  },
                  {
                    ["var"] = "post_id",
                  },
                  {
                    ["lit"] = "comments",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "post_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "posts",
                  "{post_id}",
                  "comments",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/comments/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "comments",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "comments",
                  "{id}",
                },
              },
            },
          },
          ["patch"] = {
            ["input"] = "data",
            ["name"] = "patch",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/comments/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "comments",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "comments",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/comments/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "comments",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "comments",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/comments/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "comments",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "comments",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "post",
            },
          },
        },
      },
      ["photo"] = {
        ["fields"] = {
          {
            ["name"] = "albumId",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
            },
            ["short"] = "Album ID the photo belongs to",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["short"] = "Photo ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "uri",
            ["name"] = "thumbnailUrl",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Photo thumbnail URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Photo title",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "url",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Photo URL",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "photo",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/photos",
                ["segments"] = {
                  {
                    ["lit"] = "photos",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "photos",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "album_id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/albums/{id}/photos",
                ["rename"] = {
                  ["param"] = {
                    ["id"] = "album_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "albums",
                  },
                  {
                    ["var"] = "album_id",
                  },
                  {
                    ["lit"] = "photos",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "album_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "albums",
                  "{album_id}",
                  "photos",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "album_id",
                      ["orig"] = "album_id",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/photos",
                ["segments"] = {
                  {
                    ["lit"] = "photos",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "album_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "photos",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/photos/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "photos",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "photos",
                  "{id}",
                },
              },
            },
          },
          ["patch"] = {
            ["input"] = "data",
            ["name"] = "patch",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/photos/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "photos",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "photos",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/photos/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "photos",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "photos",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/photos/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "photos",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "photos",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "album",
            },
          },
        },
      },
      ["post"] = {
        ["fields"] = {
          {
            ["name"] = "body",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Post content",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Post ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "title",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Post title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "userId",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
            },
            ["short"] = "User ID who created the post",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "post",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/posts",
                ["segments"] = {
                  {
                    ["lit"] = "posts",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "posts",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/posts",
                ["segments"] = {
                  {
                    ["lit"] = "posts",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "posts",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "user_id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{id}/posts",
                ["rename"] = {
                  ["param"] = {
                    ["id"] = "user_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "posts",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "posts",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/posts/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "posts",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "posts",
                  "{id}",
                },
              },
            },
          },
          ["patch"] = {
            ["input"] = "data",
            ["name"] = "patch",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/posts/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "posts",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "posts",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/posts/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "posts",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "posts",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/posts/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "posts",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "posts",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "user",
            },
          },
        },
      },
      ["todo"] = {
        ["fields"] = {
          {
            ["name"] = "completed",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$BOOLEAN`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$BOOLEAN`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$BOOLEAN`",
              },
            },
            ["short"] = "Todo completion status",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "id",
            ["short"] = "Todo ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "title",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Todo title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "userId",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$INTEGER`",
              },
            },
            ["short"] = "User ID who created the todo",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "todo",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/todos",
                ["segments"] = {
                  {
                    ["lit"] = "todos",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "todos",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/todos",
                ["segments"] = {
                  {
                    ["lit"] = "todos",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "todos",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "user_id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{id}/todos",
                ["rename"] = {
                  ["param"] = {
                    ["id"] = "user_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "todos",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "todos",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/todos/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "todos",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "todos",
                  "{id}",
                },
              },
            },
          },
          ["patch"] = {
            ["input"] = "data",
            ["name"] = "patch",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/todos/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "todos",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "todos",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/todos/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "todos",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "todos",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/todos/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "todos",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "todos",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "user",
            },
          },
        },
      },
      ["user"] = {
        ["fields"] = {
          {
            ["name"] = "address",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "company",
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "email",
            ["name"] = "email",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "User email",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "User ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "User full name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "phone",
            ["short"] = "User phone number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "username",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["patch"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Username",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "website",
            ["short"] = "User website",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "user",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/users",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "users",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "users",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "users",
                  "{id}",
                },
              },
            },
          },
          ["patch"] = {
            ["input"] = "data",
            ["name"] = "patch",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/users/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "users",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/users/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "users",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/users/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "users",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
