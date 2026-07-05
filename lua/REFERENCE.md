# Jsonplaceholder Lua SDK Reference

Complete API reference for the Jsonplaceholder Lua SDK.


## JsonplaceholderSDK

### Constructor

```lua
local sdk = require("jsonplaceholder_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Album(data)`

Create a new `Album` entity instance. Pass `nil` for no initial data.

#### `Comment(data)`

Create a new `Comment` entity instance. Pass `nil` for no initial data.

#### `Photo(data)`

Create a new `Photo` entity instance. Pass `nil` for no initial data.

#### `Post(data)`

Create a new `Post` entity instance. Pass `nil` for no initial data.

#### `Todo(data)`

Create a new `Todo` entity instance. Pass `nil` for no initial data.

#### `User(data)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AlbumEntity

```lua
local album = client:Album(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No |  |
| `title` | `string` | No |  |
| `user_id` | `number` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `id` | - | - | - | - | - |
| `title` | - | - | Yes | Yes | - |
| `user_id` | - | - | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Album():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Album():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Album():load({ id = "album_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Album():remove({ id = "album_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Album():update({
  id = "album_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AlbumEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CommentEntity

```lua
local comment = client:Comment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `string` | No |  |
| `email` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `post_id` | `number` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `body` | - | - | Yes | Yes | - |
| `email` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `name` | - | - | Yes | Yes | - |
| `post_id` | - | - | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Comment():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Comment():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Comment():load({ id = "comment_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Comment():remove({ id = "comment_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Comment():update({
  id = "comment_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CommentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhotoEntity

```lua
local photo = client:Photo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album_id` | `number` | No |  |
| `id` | `number` | No |  |
| `thumbnail_url` | `string` | No |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `album_id` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `thumbnail_url` | - | - | Yes | Yes | - |
| `title` | - | - | Yes | Yes | - |
| `url` | - | - | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Photo():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Photo():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Photo():load({ id = "photo_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Photo():remove({ id = "photo_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Photo():update({
  id = "photo_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PostEntity

```lua
local post = client:Post(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `string` | No |  |
| `id` | `number` | No |  |
| `title` | `string` | No |  |
| `user_id` | `number` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `body` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `title` | - | - | Yes | Yes | - |
| `user_id` | - | - | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Post():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Post():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Post():load({ id = "post_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Post():remove({ id = "post_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Post():update({
  id = "post_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PostEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TodoEntity

```lua
local todo = client:Todo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed` | `boolean` | No |  |
| `id` | `number` | No |  |
| `title` | `string` | No |  |
| `user_id` | `number` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `completed` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `title` | - | - | Yes | Yes | - |
| `user_id` | - | - | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Todo():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Todo():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Todo():load({ id = "todo_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Todo():remove({ id = "todo_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Todo():update({
  id = "todo_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TodoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserEntity

```lua
local user = client:User(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `table` | No |  |
| `company` | `table` | No |  |
| `email` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `phone` | `string` | No |  |
| `username` | `string` | No |  |
| `website` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `address` | - | - | - | - | - |
| `company` | - | - | - | - | - |
| `email` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `name` | - | - | Yes | Yes | - |
| `phone` | - | - | - | - | - |
| `username` | - | - | Yes | Yes | - |
| `website` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:User():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:User():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:User():load({ id = "user_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:User():remove({ id = "user_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:User():update({
  id = "user_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

