# Jsonplaceholder PHP SDK Reference

Complete API reference for the Jsonplaceholder PHP SDK.


## JsonplaceholderSDK

### Constructor

```php
require_once __DIR__ . '/jsonplaceholder_sdk.php';

$client = new JsonplaceholderSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `JsonplaceholderSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = JsonplaceholderSDK::test();
```


### Instance Methods

#### `Album($data = null)`

Create a new `AlbumEntity` instance. Pass `null` for no initial data.

#### `Comment($data = null)`

Create a new `CommentEntity` instance. Pass `null` for no initial data.

#### `Photo($data = null)`

Create a new `PhotoEntity` instance. Pass `null` for no initial data.

#### `Post($data = null)`

Create a new `PostEntity` instance. Pass `null` for no initial data.

#### `Todo($data = null)`

Create a new `TodoEntity` instance. Pass `null` for no initial data.

#### `User($data = null)`

Create a new `UserEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## AlbumEntity

```php
$album = $client->Album();
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

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->Album()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Album()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Album()->load(["id" => "album_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->Album()->remove(["id" => "album_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->Album()->update([
  "id" => "album_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AlbumEntity`

Create a new `AlbumEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CommentEntity

```php
$comment = $client->Comment();
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

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->Comment()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Comment()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Comment()->load(["id" => "comment_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->Comment()->remove(["id" => "comment_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->Comment()->update([
  "id" => "comment_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CommentEntity`

Create a new `CommentEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PhotoEntity

```php
$photo = $client->Photo();
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

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->Photo()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Photo()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Photo()->load(["id" => "photo_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->Photo()->remove(["id" => "photo_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->Photo()->update([
  "id" => "photo_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PhotoEntity`

Create a new `PhotoEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PostEntity

```php
$post = $client->Post();
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

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->Post()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Post()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Post()->load(["id" => "post_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->Post()->remove(["id" => "post_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->Post()->update([
  "id" => "post_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PostEntity`

Create a new `PostEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TodoEntity

```php
$todo = $client->Todo();
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

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->Todo()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Todo()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Todo()->load(["id" => "todo_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->Todo()->remove(["id" => "todo_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->Todo()->update([
  "id" => "todo_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TodoEntity`

Create a new `TodoEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
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

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->User()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->User()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->User()->load(["id" => "user_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->User()->remove(["id" => "user_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->User()->update([
  "id" => "user_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new JsonplaceholderSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

