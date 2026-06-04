# Jsonplaceholder Ruby SDK

The Ruby SDK for the Jsonplaceholder API. Provides an entity-oriented interface using idiomatic Ruby conventions.


## Install
```bash
gem install jsonplaceholder-sdk
```

Or add to your `Gemfile`:

```ruby
gem "jsonplaceholder-sdk"
```

Then run:

```bash
bundle install
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Jsonplaceholder_sdk"

client = JsonplaceholderSDK.new({})
```

### 2. List albums

```ruby
result, err = client.Album(nil).list(nil, nil)
raise err if err

if result.is_a?(Array)
  result.each do |item|
    d = item.data_get
    puts "#{d["id"]} #{d["name"]}"
  end
end
```

### 3. Load a album

```ruby
result, err = client.Album(nil).load({ "id" => "example_id" }, nil)
raise err if err
puts result
```

### 4. Create, update, and remove

```ruby
# Create
created, _ = client.Album(nil).create({ "name" => "Example" }, nil)

# Update
client.Album(nil).update({ "id" => created["id"], "name" => "Example-Renamed" }, nil)

# Remove
client.Album(nil).remove({ "id" => created["id"] }, nil)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
raise err if err

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
end
```

### Prepare a request without sending it

```ruby
fetchdef, err = client.prepare({
  "path" => "/api/resource/{id}",
  "method" => "DELETE",
  "params" => { "id" => "example" },
})
raise err if err

puts fetchdef["url"]
puts fetchdef["method"]
puts fetchdef["headers"]
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = JsonplaceholderSDK.test(nil, nil)

result, err = client.Jsonplaceholder(nil).load(
  { "id" => "test01" }, nil
)
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = JsonplaceholderSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
JSONPLACEHOLDER_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### JsonplaceholderSDK

```ruby
require_relative "Jsonplaceholder_sdk"
client = JsonplaceholderSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = JsonplaceholderSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### JsonplaceholderSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> [Hash, err]` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> [Hash, err]` | Build and send an HTTP request. |
| `Album` | `(data) -> AlbumEntity` | Create a Album entity instance. |
| `Comment` | `(data) -> CommentEntity` | Create a Comment entity instance. |
| `Photo` | `(data) -> PhotoEntity` | Create a Photo entity instance. |
| `Post` | `(data) -> PostEntity` | Create a Post entity instance. |
| `Todo` | `(data) -> TodoEntity` | Create a Todo entity instance. |
| `User` | `(data) -> UserEntity` | Create a User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> [any, err]` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> [any, err]` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> [any, err]` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> [any, err]` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> [any, err]` | Remove an entity. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return `[any, err]`. The first value is a
`Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

### Entities

#### Album

| Field | Description |
| --- | --- |
| `id` |  |
| `title` |  |
| `user_id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/albums`

#### Comment

| Field | Description |
| --- | --- |
| `body` |  |
| `email` |  |
| `id` |  |
| `name` |  |
| `post_id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/comments`

#### Photo

| Field | Description |
| --- | --- |
| `album_id` |  |
| `id` |  |
| `thumbnail_url` |  |
| `title` |  |
| `url` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/photos`

#### Post

| Field | Description |
| --- | --- |
| `body` |  |
| `id` |  |
| `title` |  |
| `user_id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/posts`

#### Todo

| Field | Description |
| --- | --- |
| `completed` |  |
| `id` |  |
| `title` |  |
| `user_id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/todos`

#### User

| Field | Description |
| --- | --- |
| `address` |  |
| `company` |  |
| `email` |  |
| `id` |  |
| `name` |  |
| `phone` |  |
| `username` |  |
| `website` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/users`



## Entities


### Album

Create an instance: `const album = client.Album()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |
| `user_id` | ``$INTEGER`` |  |

#### Example: Load

```ts
const album = await client.Album().load({ id: 'album_id' })
```

#### Example: List

```ts
const albums = await client.Album().list()
```

#### Example: Create

```ts
const album = await client.Album().create({
})
```


### Comment

Create an instance: `const comment = client.Comment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `post_id` | ``$INTEGER`` |  |

#### Example: Load

```ts
const comment = await client.Comment().load({ id: 'comment_id' })
```

#### Example: List

```ts
const comments = await client.Comment().list()
```

#### Example: Create

```ts
const comment = await client.Comment().create({
})
```


### Photo

Create an instance: `const photo = client.Photo()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album_id` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `thumbnail_url` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const photo = await client.Photo().load({ id: 'photo_id' })
```

#### Example: List

```ts
const photos = await client.Photo().list()
```

#### Example: Create

```ts
const photo = await client.Photo().create({
})
```


### Post

Create an instance: `const post = client.Post()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |
| `user_id` | ``$INTEGER`` |  |

#### Example: Load

```ts
const post = await client.Post().load({ id: 'post_id' })
```

#### Example: List

```ts
const posts = await client.Post().list()
```

#### Example: Create

```ts
const post = await client.Post().create({
})
```


### Todo

Create an instance: `const todo = client.Todo()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed` | ``$BOOLEAN`` |  |
| `id` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |
| `user_id` | ``$INTEGER`` |  |

#### Example: Load

```ts
const todo = await client.Todo().load({ id: 'todo_id' })
```

#### Example: List

```ts
const todos = await client.Todo().list()
```

#### Example: Create

```ts
const todo = await client.Todo().create({
})
```


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

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

```ts
const user = await client.User().load({ id: 'user_id' })
```

#### Example: List

```ts
const users = await client.User().list()
```

#### Example: Create

```ts
const user = await client.User().create({
})
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
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Jsonplaceholder_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Jsonplaceholder_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
moon = client.Moon
moon.load({ "planet_id" => "earth", "id" => "luna" })

# moon.data_get now returns the loaded moon data
# moon.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
