# Jsonplaceholder TypeScript SDK



The TypeScript SDK for the Jsonplaceholder API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Album()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/jsonplaceholder-sdk/releases](https://github.com/voxgig-sdk/jsonplaceholder-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { JsonplaceholderSDK } from '@voxgig-sdk/jsonplaceholder'

const client = new JsonplaceholderSDK()
```

### 2. List album records

`list()` resolves to an array of Album ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const albums = await client.Album().list()

for (const album of albums) {
  console.log(album)
}
```

### 3. Load an album

`load()` returns the entity directly and throws on failure:

```ts
try {
  const album = await client.Album().load({ id: 1 })
  console.log(album)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Album ENTITY (.data() for the record)
const created = await client.Album().create({
  title: 'example_title',
  userId: 1,
})

// Update — the id comes off the returned entity's data()
const updated = await client.Album().update({
  id: created.data().id!,
  title: 'example_title',
  userId: 1,
})

// Remove
await client.Album().remove({
  id: created.data().id!,
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const photos = await client.Photo().list()
  console.log(photos)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = JsonplaceholderSDK.test()

const photo = await client.Photo().list()
// photo is the entity, populated with mock response data
// — call photo.data() for the record itself
console.log(photo)
```

You can also use the instance method:

```ts
const client = new JsonplaceholderSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Photo()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new JsonplaceholderSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
JSONPLACEHOLDER_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### JsonplaceholderSDK

#### Constructor

```ts
new JsonplaceholderSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Album(data?)` | `AlbumEntity` | Create an Album entity instance. |
| `Comment(data?)` | `CommentEntity` | Create a Comment entity instance. |
| `Photo(data?)` | `PhotoEntity` | Create a Photo entity instance. |
| `Post(data?)` | `PostEntity` | Create a Post entity instance. |
| `Todo(data?)` | `TodoEntity` | Create a Todo entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `tester(testopts?, sdkopts?)` | `JsonplaceholderSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `JsonplaceholderSDK.test(testopts?, sdkopts?)` | `JsonplaceholderSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): JsonplaceholderSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Album

| Field | Description |
| --- | --- |
| `id` | Album ID |
| `title` | Album title |
| `userId` | User ID who created the album |

Operations: create, list, load, patch, remove, update.

API path: `/albums`

#### Comment

| Field | Description |
| --- | --- |
| `body` | Comment content |
| `email` | Email of the commenter |
| `id` | Comment ID |
| `name` | Comment name/title |
| `postId` | Post ID the comment belongs to |

Operations: create, list, load, patch, remove, update.

API path: `/comments`

#### Photo

| Field | Description |
| --- | --- |
| `albumId` | Album ID the photo belongs to |
| `id` | Photo ID |
| `thumbnailUrl` | Photo thumbnail URL |
| `title` | Photo title |
| `url` | Photo URL |

Operations: create, list, load, patch, remove, update.

API path: `/photos`

#### Post

| Field | Description |
| --- | --- |
| `body` | Post content |
| `id` | Post ID |
| `title` | Post title |
| `userId` | User ID who created the post |

Operations: create, list, load, patch, remove, update.

API path: `/posts`

#### Todo

| Field | Description |
| --- | --- |
| `completed` | Todo completion status |
| `id` | Todo ID |
| `title` | Todo title |
| `userId` | User ID who created the todo |

Operations: create, list, load, patch, remove, update.

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

Operations: create, list, load, patch, remove, update.

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
| `id` | `number` | Album ID |
| `title` | `string` | Album title |
| `userId` | `number` | User ID who created the album |

#### Example: Load

```ts
const album = await client.Album().load({ id: 1 })
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
| `body` | `string` | Comment content |
| `email` | `string` | Email of the commenter |
| `id` | `number` | Comment ID |
| `name` | `string` | Comment name/title |
| `postId` | `number` | Post ID the comment belongs to |

#### Example: Load

```ts
const comment = await client.Comment().load({ id: 1 })
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
| `albumId` | `number` | Album ID the photo belongs to |
| `id` | `number` | Photo ID |
| `thumbnailUrl` | `string` | Photo thumbnail URL |
| `title` | `string` | Photo title |
| `url` | `string` | Photo URL |

#### Example: Load

```ts
const photo = await client.Photo().load({ id: 1 })
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
| `body` | `string` | Post content |
| `id` | `number` | Post ID |
| `title` | `string` | Post title |
| `userId` | `number` | User ID who created the post |

#### Example: Load

```ts
const post = await client.Post().load({ id: 1 })
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
| `completed` | `boolean` | Todo completion status |
| `id` | `number` | Todo ID |
| `title` | `string` | Todo title |
| `userId` | `number` | User ID who created the todo |

#### Example: Load

```ts
const todo = await client.Todo().load({ id: 1 })
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
| `address` | `Record<string, any>` |  |
| `company` | `Record<string, any>` |  |
| `email` | `string` | User email |
| `id` | `number` | User ID |
| `name` | `string` | User full name |
| `phone` | `string` | User phone number |
| `username` | `string` | Username |
| `website` | `string` | User website |

#### Example: Load

```ts
const user = await client.User().load({ id: 1 })
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

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
jsonplaceholder/
├── src/
│   ├── JsonplaceholderSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { JsonplaceholderSDK } from '@voxgig-sdk/jsonplaceholder'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const photo = client.Photo()
await photo.list()

// photo.data() now returns the photo data from the last `list`
// photo.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
