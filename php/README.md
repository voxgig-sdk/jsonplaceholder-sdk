# Jsonplaceholder PHP SDK



The PHP SDK for the Jsonplaceholder API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Album()` — with named operations (`list`/`load`/`create`/`update`/`remove`/`patch`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/jsonplaceholder-sdk/releases](https://github.com/voxgig-sdk/jsonplaceholder-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'jsonplaceholder_sdk.php';

$client = new JsonplaceholderSDK();
```

### 2. List album records

```php
try {
    // list() returns an array of Album records — iterate directly.
    $albums = $client->Album()->list();
    foreach ($albums as $item) {
        echo $item["id"] . " " . $item["title"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an album

```php
try {
    // load() returns the ENTITY — call data_get() for the Album record (throws on error).
    $album = $client->Album()->load(["id" => 1]);
    print_r($album);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Album record.
$created = $client->Album()->create(["title" => "example_title", "userId" => 1]);

// Update — index the record via data_get() ($created->data_get()["id"]).
$client->Album()->update(["id" => $created->data_get()["id"], "title" => "example_title", "userId" => 1]);

// Remove
$client->Album()->remove(["id" => $created->data_get()["id"]]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $photos = $client->Photo()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = JsonplaceholderSDK::test([
    "entity" => ["photo" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$photo = $client->Photo()->list();
print_r($photo);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new JsonplaceholderSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
JSONPLACEHOLDER_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### JsonplaceholderSDK

```php
require_once 'jsonplaceholder_sdk.php';
$client = new JsonplaceholderSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = JsonplaceholderSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### JsonplaceholderSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Album` | `($data): AlbumEntity` | Create an Album entity instance. |
| `Comment` | `($data): CommentEntity` | Create a Comment entity instance. |
| `Photo` | `($data): PhotoEntity` | Create a Photo entity instance. |
| `Post` | `($data): PostEntity` | Create a Post entity instance. |
| `Todo` | `($data): TodoEntity` | Create a Todo entity instance. |
| `User` | `($data): UserEntity` | Create an User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Album

| Field | Description |
| --- | --- |
| `id` | Album ID |
| `title` | Album title |
| `userId` | User ID who created the album |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/albums`

#### Comment

| Field | Description |
| --- | --- |
| `body` | Comment content |
| `email` | Email of the commenter |
| `id` | Comment ID |
| `name` | Comment name/title |
| `postId` | Post ID the comment belongs to |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/comments`

#### Photo

| Field | Description |
| --- | --- |
| `albumId` | Album ID the photo belongs to |
| `id` | Photo ID |
| `thumbnailUrl` | Photo thumbnail URL |
| `title` | Photo title |
| `url` | Photo URL |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/photos`

#### Post

| Field | Description |
| --- | --- |
| `body` | Post content |
| `id` | Post ID |
| `title` | Post title |
| `userId` | User ID who created the post |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/posts`

#### Todo

| Field | Description |
| --- | --- |
| `completed` | Todo completion status |
| `id` | Todo ID |
| `title` | Todo title |
| `userId` | User ID who created the todo |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/todos`

#### User

| Field | Description |
| --- | --- |
| `address` |  |
| `company` |  |
| `email` | User email |
| `id` | User ID |
| `name` | User full name |
| `phone` | User phone number |
| `username` | Username |
| `website` | User website |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/users`



## Entities


### Album

Create an instance: `$album = $client->Album();`

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
| `id` | `int` | Album ID |
| `title` | `string` | Album title |
| `userId` | `int` | User ID who created the album |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Album record (throws on error).
$album = $client->Album()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Album records (throws on error).
$albums = $client->Album()->list();
```

#### Example: Create

```php
$album = $client->Album()->create([
]);
```


### Comment

Create an instance: `$comment = $client->Comment();`

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
| `body` | `string` | Comment content |
| `email` | `string` | Email of the commenter |
| `id` | `int` | Comment ID |
| `name` | `string` | Comment name/title |
| `postId` | `int` | Post ID the comment belongs to |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Comment record (throws on error).
$comment = $client->Comment()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Comment records (throws on error).
$comments = $client->Comment()->list();
```

#### Example: Create

```php
$comment = $client->Comment()->create([
]);
```


### Photo

Create an instance: `$photo = $client->Photo();`

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
| `albumId` | `int` | Album ID the photo belongs to |
| `id` | `int` | Photo ID |
| `thumbnailUrl` | `string` | Photo thumbnail URL |
| `title` | `string` | Photo title |
| `url` | `string` | Photo URL |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Photo record (throws on error).
$photo = $client->Photo()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Photo records (throws on error).
$photos = $client->Photo()->list();
```

#### Example: Create

```php
$photo = $client->Photo()->create([
]);
```


### Post

Create an instance: `$post = $client->Post();`

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
| `body` | `string` | Post content |
| `id` | `int` | Post ID |
| `title` | `string` | Post title |
| `userId` | `int` | User ID who created the post |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Post record (throws on error).
$post = $client->Post()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Post records (throws on error).
$posts = $client->Post()->list();
```

#### Example: Create

```php
$post = $client->Post()->create([
]);
```


### Todo

Create an instance: `$todo = $client->Todo();`

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
| `completed` | `bool` | Todo completion status |
| `id` | `int` | Todo ID |
| `title` | `string` | Todo title |
| `userId` | `int` | User ID who created the todo |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Todo record (throws on error).
$todo = $client->Todo()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Todo records (throws on error).
$todos = $client->Todo()->list();
```

#### Example: Create

```php
$todo = $client->Todo()->create([
]);
```


### User

Create an instance: `$user = $client->User();`

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
| `address` | `array` |  |
| `company` | `array` |  |
| `email` | `string` | User email |
| `id` | `int` | User ID |
| `name` | `string` | User full name |
| `phone` | `string` | User phone number |
| `username` | `string` | Username |
| `website` | `string` | User website |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the User record (throws on error).
$user = $client->User()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of User records (throws on error).
$users = $client->User()->list();
```

#### Example: Create

```php
$user = $client->User()->create([
]);
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

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

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── jsonplaceholder_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`jsonplaceholder_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$photo = $client->Photo();
$photo->list();

// $photo->data_get() now returns the photo data from the last list
// $photo->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
