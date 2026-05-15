# Jsonplaceholder Golang SDK

The Golang SDK for the Jsonplaceholder API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/jsonplaceholder-sdk
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/jsonplaceholder-sdk=../path/to/github.com/voxgig-sdk/jsonplaceholder-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/jsonplaceholder-sdk"
    "github.com/voxgig-sdk/jsonplaceholder-sdk/core"
)

func main() {
    client := sdk.NewJsonplaceholderSDK(map[string]any{
        "apikey": os.Getenv("JSONPLACEHOLDER_APIKEY"),
    })
```

### 2. List albums

```go
    result, err := client.Album(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a album

```go
    result, err = client.Album(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
```

### 4. Create, update, and remove

```go
// Create
created, _ := client.Album(nil).Create(
    map[string]any{"name": "Example"}, nil,
)
cm := core.ToMapAny(created)
newID := core.ToMapAny(cm["data"])["id"]

// Update
client.Album(nil).Update(
    map[string]any{"id": newID, "name": "Example-Renamed"}, nil,
)

// Remove
client.Album(nil).Remove(
    map[string]any{"id": newID}, nil,
)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewJsonplaceholderSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
JSONPLACEHOLDER_TEST_LIVE=TRUE
JSONPLACEHOLDER_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewJsonplaceholderSDK

```go
func NewJsonplaceholderSDK(options map[string]any) *JsonplaceholderSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *JsonplaceholderSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### JsonplaceholderSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Album` | `(data map[string]any) JsonplaceholderEntity` | Create a Album entity instance. |
| `Comment` | `(data map[string]any) JsonplaceholderEntity` | Create a Comment entity instance. |
| `Photo` | `(data map[string]any) JsonplaceholderEntity` | Create a Photo entity instance. |
| `Post` | `(data map[string]any) JsonplaceholderEntity` | Create a Post entity instance. |
| `Todo` | `(data map[string]any) JsonplaceholderEntity` | Create a Todo entity instance. |
| `User` | `(data map[string]any) JsonplaceholderEntity` | Create a User entity instance. |

### Entity interface (JsonplaceholderEntity)

All entities implement the `JsonplaceholderEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Album

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"title"` |  |
| `"user_id"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/albums`

#### Comment

| Field | Description |
| --- | --- |
| `"body"` |  |
| `"email"` |  |
| `"id"` |  |
| `"name"` |  |
| `"post_id"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/comments`

#### Photo

| Field | Description |
| --- | --- |
| `"album_id"` |  |
| `"id"` |  |
| `"thumbnail_url"` |  |
| `"title"` |  |
| `"url"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/photos`

#### Post

| Field | Description |
| --- | --- |
| `"body"` |  |
| `"id"` |  |
| `"title"` |  |
| `"user_id"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/posts`

#### Todo

| Field | Description |
| --- | --- |
| `"completed"` |  |
| `"id"` |  |
| `"title"` |  |
| `"user_id"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/todos`

#### User

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"company"` |  |
| `"email"` |  |
| `"id"` |  |
| `"name"` |  |
| `"phone"` |  |
| `"username"` |  |
| `"website"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/users`



## Entities


### Album

Create an instance: `album := client.Album(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |
| `user_id` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Album(nil).Load(map[string]any{"id": "album_id"}, nil)
```

#### Example: List

```go
results, err := client.Album(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.Album(nil).Create(map[string]any{
}, nil)
```


### Comment

Create an instance: `comment := client.Comment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `post_id` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Comment(nil).Load(map[string]any{"id": "comment_id"}, nil)
```

#### Example: List

```go
results, err := client.Comment(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.Comment(nil).Create(map[string]any{
}, nil)
```


### Photo

Create an instance: `photo := client.Photo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album_id` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `thumbnail_url` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Photo(nil).Load(map[string]any{"id": "photo_id"}, nil)
```

#### Example: List

```go
results, err := client.Photo(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.Photo(nil).Create(map[string]any{
}, nil)
```


### Post

Create an instance: `post := client.Post(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |
| `user_id` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Post(nil).Load(map[string]any{"id": "post_id"}, nil)
```

#### Example: List

```go
results, err := client.Post(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.Post(nil).Create(map[string]any{
}, nil)
```


### Todo

Create an instance: `todo := client.Todo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed` | ``$BOOLEAN`` |  |
| `id` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |
| `user_id` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Todo(nil).Load(map[string]any{"id": "todo_id"}, nil)
```

#### Example: List

```go
results, err := client.Todo(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.Todo(nil).Create(map[string]any{
}, nil)
```


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | ``$OBJECT`` |  |
| `company` | ``$OBJECT`` |  |
| `email` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `phone` | ``$STRING`` |  |
| `username` | ``$STRING`` |  |
| `website` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
```

#### Example: List

```go
results, err := client.User(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.User(nil).Create(map[string]any{
}, nil)
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/jsonplaceholder-sdk/
├── jsonplaceholder.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/jsonplaceholder-sdk`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
