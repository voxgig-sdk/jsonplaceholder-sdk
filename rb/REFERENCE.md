# Jsonplaceholder Ruby SDK Reference

Complete API reference for the Jsonplaceholder Ruby SDK.


## JsonplaceholderSDK

### Constructor

```ruby
require_relative 'jsonplaceholder_sdk'

client = JsonplaceholderSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `JsonplaceholderSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = JsonplaceholderSDK.test
```


### Instance Methods

#### `Album(data = nil)`

Create a new `Album` entity instance. Pass `nil` for no initial data.

#### `Comment(data = nil)`

Create a new `Comment` entity instance. Pass `nil` for no initial data.

#### `Photo(data = nil)`

Create a new `Photo` entity instance. Pass `nil` for no initial data.

#### `Post(data = nil)`

Create a new `Post` entity instance. Pass `nil` for no initial data.

#### `Todo(data = nil)`

Create a new `Todo` entity instance. Pass `nil` for no initial data.

#### `User(data = nil)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## AlbumEntity

```ruby
album = client.Album
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `title` | ``$STRING`` | No |  |
| `user_id` | ``$INTEGER`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `id` | - | - | - | - | - |
| `title` | - | - | Yes | Yes | - |
| `user_id` | - | - | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Album.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Album.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Album.load({ "id" => "album_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result, err`

Remove the entity matching the given criteria.

```ruby
result, err = client.Album.remove({ "id" => "album_id" })
```

#### `update(reqdata, ctrl = nil) -> result, err`

Update an existing entity. The data must include the entity `id`.

```ruby
result, err = client.Album.update({
  "id" => "album_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AlbumEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CommentEntity

```ruby
comment = client.Comment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | ``$STRING`` | No |  |
| `email` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `post_id` | ``$INTEGER`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `body` | - | - | Yes | Yes | - |
| `email` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `name` | - | - | Yes | Yes | - |
| `post_id` | - | - | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Comment.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Comment.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Comment.load({ "id" => "comment_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result, err`

Remove the entity matching the given criteria.

```ruby
result, err = client.Comment.remove({ "id" => "comment_id" })
```

#### `update(reqdata, ctrl = nil) -> result, err`

Update an existing entity. The data must include the entity `id`.

```ruby
result, err = client.Comment.update({
  "id" => "comment_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CommentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhotoEntity

```ruby
photo = client.Photo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album_id` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `thumbnail_url` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `album_id` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `thumbnail_url` | - | - | Yes | Yes | - |
| `title` | - | - | Yes | Yes | - |
| `url` | - | - | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Photo.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Photo.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Photo.load({ "id" => "photo_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result, err`

Remove the entity matching the given criteria.

```ruby
result, err = client.Photo.remove({ "id" => "photo_id" })
```

#### `update(reqdata, ctrl = nil) -> result, err`

Update an existing entity. The data must include the entity `id`.

```ruby
result, err = client.Photo.update({
  "id" => "photo_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PhotoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PostEntity

```ruby
post = client.Post
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `title` | ``$STRING`` | No |  |
| `user_id` | ``$INTEGER`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `body` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `title` | - | - | Yes | Yes | - |
| `user_id` | - | - | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Post.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Post.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Post.load({ "id" => "post_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result, err`

Remove the entity matching the given criteria.

```ruby
result, err = client.Post.remove({ "id" => "post_id" })
```

#### `update(reqdata, ctrl = nil) -> result, err`

Update an existing entity. The data must include the entity `id`.

```ruby
result, err = client.Post.update({
  "id" => "post_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PostEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TodoEntity

```ruby
todo = client.Todo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed` | ``$BOOLEAN`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `title` | ``$STRING`` | No |  |
| `user_id` | ``$INTEGER`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `completed` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `title` | - | - | Yes | Yes | - |
| `user_id` | - | - | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Todo.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Todo.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Todo.load({ "id" => "todo_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result, err`

Remove the entity matching the given criteria.

```ruby
result, err = client.Todo.remove({ "id" => "todo_id" })
```

#### `update(reqdata, ctrl = nil) -> result, err`

Update an existing entity. The data must include the entity `id`.

```ruby
result, err = client.Todo.update({
  "id" => "todo_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TodoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserEntity

```ruby
user = client.User
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | ``$OBJECT`` | No |  |
| `company` | ``$OBJECT`` | No |  |
| `email` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `phone` | ``$STRING`` | No |  |
| `username` | ``$STRING`` | No |  |
| `website` | ``$STRING`` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.User.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.User.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.User.load({ "id" => "user_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result, err`

Remove the entity matching the given criteria.

```ruby
result, err = client.User.remove({ "id" => "user_id" })
```

#### `update(reqdata, ctrl = nil) -> result, err`

Update an existing entity. The data must include the entity `id`.

```ruby
result, err = client.User.update({
  "id" => "user_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = JsonplaceholderSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

