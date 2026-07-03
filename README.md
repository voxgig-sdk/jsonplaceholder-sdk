# Jsonplaceholder SDK

JSONPlaceholder client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { JsonplaceholderSDK } from 'jsonplaceholder'

const client = new JsonplaceholderSDK({
  apikey: process.env.JSONPLACEHOLDER_APIKEY,
})

// List all albums
const albums = await client.Album().list()
console.log(albums.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Album** |  | `/albums` |
| **Comment** |  | `/comments` |
| **Photo** |  | `/photos` |
| **Post** |  | `/posts` |
| **Todo** |  | `/todos` |
| **User** |  | `/users` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from jsonplaceholder_sdk import JsonplaceholderSDK

client = JsonplaceholderSDK({
    "apikey": os.environ.get("JSONPLACEHOLDER_APIKEY"),
})

# List all albums
albums, err = client.Album().list()
print(albums)

# Load a specific album
album, err = client.Album().load({"id": "example_id"})
print(album)
```

### PHP

```php
<?php
require_once 'jsonplaceholder_sdk.php';

$client = new JsonplaceholderSDK([
    "apikey" => getenv("JSONPLACEHOLDER_APIKEY"),
]);

// List all albums
[$albums, $err] = $client->Album()->list();
print_r($albums);

// Load a specific album
[$album, $err] = $client->Album()->load(["id" => "example_id"]);
print_r($album);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/jsonplaceholder-sdk/go"

client := sdk.NewJsonplaceholderSDK(map[string]any{
    "apikey": os.Getenv("JSONPLACEHOLDER_APIKEY"),
})

// List all albums
albums, err := client.Album(nil).List(nil, nil)
fmt.Println(albums)
```

### Ruby

```ruby
require_relative "Jsonplaceholder_sdk"

client = JsonplaceholderSDK.new({
  "apikey" => ENV["JSONPLACEHOLDER_APIKEY"],
})

# List all albums
albums, err = client.Album().list
puts albums

# Load a specific album
album, err = client.Album().load({ "id" => "example_id" })
puts album
```

### Lua

```lua
local sdk = require("jsonplaceholder_sdk")

local client = sdk.new({
  apikey = os.getenv("JSONPLACEHOLDER_APIKEY"),
})

-- List all albums
local albums, err = client:Album():list()
print(albums)

-- Load a specific album
local album, err = client:Album():load({ id = "example_id" })
print(album)
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
client = JsonplaceholderSDK.test()
result, err = client.Album().load({"id": "test01"})
```

### PHP

```php
$client = JsonplaceholderSDK::test();
[$result, $err] = $client->Album()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Album(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = JsonplaceholderSDK.test
result, err = client.Album().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Album():load({ id = "test01" })
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

---

Generated from the JSONPlaceholder OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
