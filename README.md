# Jsonplaceholder SDK

Free fake REST API for testing and prototyping, serving roughly 3 billion requests per month

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About JSONPlaceholder

[JSONPlaceholder](https://jsonplaceholder.typicode.com) is a free, hosted fake REST API maintained by [typicode](https://github.com/typicode), the author of [JSON Server](https://github.com/typicode/json-server) and [LowDB](https://github.com/typicode/lowdb). It is one of the most widely used placeholder APIs on the web, reportedly serving on the order of three billion requests each month.

The service exposes six fixed datasets you can read, filter, and pretend to mutate:

- `/posts` — 100 blog posts (`id`, `userId`, `title`, `body`)
- `/comments` — 500 comments linked to posts
- `/albums` — 100 albums grouped under users
- `/photos` — 5,000 photo records linked to albums
- `/todos` — 200 todo items per user
- `/users` — 10 user profiles

All standard HTTP verbs are supported (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) and the API also supports nested routes such as `/posts/1/comments`, `/albums/1/photos`, and `/users/1/posts`, plus simple query filtering like `/comments?postId=1`.

Write operations are simulated: the server responds as if the resource were created or updated, but nothing is actually persisted. No authentication or API key is required, and both HTTP and HTTPS are accepted.

## Try it

**TypeScript**
```bash
npm install jsonplaceholder
```

**Python**
```bash
pip install jsonplaceholder-sdk
```

**PHP**
```bash
composer require voxgig/jsonplaceholder-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/jsonplaceholder-sdk/go
```

**Ruby**
```bash
gem install jsonplaceholder-sdk
```

**Lua**
```bash
luarocks install jsonplaceholder-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { JsonplaceholderSDK } from 'jsonplaceholder'

const client = new JsonplaceholderSDK({})

// List all albums
const albums = await client.Album().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o jsonplaceholder-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "jsonplaceholder": {
      "command": "/abs/path/to/jsonplaceholder-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Album** | Photo album owned by a user, available at `/albums`, `/albums/{id}`, `/albums/{id}/photos`, and `/users/{id}/albums`. | `/albums` |
| **Comment** | Comment attached to a post, available at `/comments`, `/comments/{id}`, `/posts/{id}/comments`, and filterable via `/comments?postId={id}`. | `/comments` |
| **Photo** | Photo record belonging to an album, available at `/photos` and `/photos/{id}`, with album-scoped access at `/albums/{id}/photos`. | `/photos` |
| **Post** | Blog-style post written by a user, available at `/posts`, `/posts/{id}`, and `/users/{id}/posts`, with nested comments at `/posts/{id}/comments`. | `/posts` |
| **Todo** | Todo item assigned to a user, available at `/todos`, `/todos/{id}`, and `/users/{id}/todos`. | `/todos` |
| **User** | User profile (name, username, email, address, company), available at `/users` and `/users/{id}`, and the root of nested resources like `/users/{id}/posts`. | `/users` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from jsonplaceholder_sdk import JsonplaceholderSDK

client = JsonplaceholderSDK({})

# List all albums
albums, err = client.Album(None).list(None, None)

# Load a specific album
album, err = client.Album(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'jsonplaceholder_sdk.php';

$client = new JsonplaceholderSDK([]);

// List all albums
[$albums, $err] = $client->Album(null)->list(null, null);

// Load a specific album
[$album, $err] = $client->Album(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/jsonplaceholder-sdk/go"

client := sdk.NewJsonplaceholderSDK(map[string]any{})

// List all albums
albums, err := client.Album(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Jsonplaceholder_sdk"

client = JsonplaceholderSDK.new({})

# List all albums
albums, err = client.Album(nil).list(nil, nil)

# Load a specific album
album, err = client.Album(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("jsonplaceholder_sdk")

local client = sdk.new({})

-- List all albums
local albums, err = client:Album(nil):list(nil, nil)

-- Load a specific album
local album, err = client:Album(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = JsonplaceholderSDK.test()
const result = await client.Album().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = JsonplaceholderSDK.test(None, None)
result, err = client.Album(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = JsonplaceholderSDK::test(null, null);
[$result, $err] = $client->Album(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Album(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = JsonplaceholderSDK.test(nil, nil)
result, err = client.Album(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Album(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the JSONPlaceholder

- Upstream: [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com)
- API docs: [https://jsonplaceholder.typicode.com/guide/](https://jsonplaceholder.typicode.com/guide/)

- Provided free of charge by [typicode](https://github.com/typicode) for testing and prototyping.
- No formal open-source licence is published alongside the hosted service.
- Intended for demos, tutorials, sandboxes, and CI fixtures rather than production traffic.

---

Generated from the JSONPlaceholder OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
