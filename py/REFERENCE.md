# Jsonplaceholder Python SDK Reference

Complete API reference for the Jsonplaceholder Python SDK.


## JsonplaceholderSDK

### Constructor

```python
from jsonplaceholder_sdk import JsonplaceholderSDK

client = JsonplaceholderSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `JsonplaceholderSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = JsonplaceholderSDK.test()
```


### Instance Methods

#### `Album(data=None)`

Create a new `AlbumEntity` instance. Pass `None` for no initial data.

#### `Comment(data=None)`

Create a new `CommentEntity` instance. Pass `None` for no initial data.

#### `Photo(data=None)`

Create a new `PhotoEntity` instance. Pass `None` for no initial data.

#### `Post(data=None)`

Create a new `PostEntity` instance. Pass `None` for no initial data.

#### `Todo(data=None)`

Create a new `TodoEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## AlbumEntity

```python
album = client.Album()
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

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Album().create({
})
```

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Album().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Album().load({"id": "album_id"})
```

#### `remove(reqmatch, ctrl=None) -> tuple`

Remove the entity matching the given criteria.

```python
result, err = client.Album().remove({"id": "album_id"})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.Album().update({
    "id": "album_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AlbumEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CommentEntity

```python
comment = client.Comment()
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

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Comment().create({
})
```

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Comment().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Comment().load({"id": "comment_id"})
```

#### `remove(reqmatch, ctrl=None) -> tuple`

Remove the entity matching the given criteria.

```python
result, err = client.Comment().remove({"id": "comment_id"})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.Comment().update({
    "id": "comment_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CommentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PhotoEntity

```python
photo = client.Photo()
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

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Photo().create({
})
```

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Photo().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Photo().load({"id": "photo_id"})
```

#### `remove(reqmatch, ctrl=None) -> tuple`

Remove the entity matching the given criteria.

```python
result, err = client.Photo().remove({"id": "photo_id"})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.Photo().update({
    "id": "photo_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PostEntity

```python
post = client.Post()
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

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Post().create({
})
```

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Post().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Post().load({"id": "post_id"})
```

#### `remove(reqmatch, ctrl=None) -> tuple`

Remove the entity matching the given criteria.

```python
result, err = client.Post().remove({"id": "post_id"})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.Post().update({
    "id": "post_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PostEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TodoEntity

```python
todo = client.Todo()
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

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Todo().create({
})
```

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Todo().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Todo().load({"id": "todo_id"})
```

#### `remove(reqmatch, ctrl=None) -> tuple`

Remove the entity matching the given criteria.

```python
result, err = client.Todo().remove({"id": "todo_id"})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.Todo().update({
    "id": "todo_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TodoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
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

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.User().create({
})
```

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.User().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.User().load({"id": "user_id"})
```

#### `remove(reqmatch, ctrl=None) -> tuple`

Remove the entity matching the given criteria.

```python
result, err = client.User().remove({"id": "user_id"})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.User().update({
    "id": "user_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = JsonplaceholderSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

