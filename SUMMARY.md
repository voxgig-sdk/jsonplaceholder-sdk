# JSONPlaceholder

Free fake and reliable API for testing and prototyping. Serving ~3 billion requests each month.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 6 entities and 41 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Album

Results: Album created successfully; Successful response; Album updated successfully; Album deleted successfully.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `id`: Album ID
- `title`: Album title
- `userId`: User ID who created the album

### Comment

Results: Comment created successfully; Successful response; Comment updated successfully; Comment deleted successfully.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `body`: Comment content
- `email`: Email of the commenter
- `id`: Comment ID
- `name`: Comment name/title
- `postId`: Post ID the comment belongs to

### Photo

Results: Photo created successfully; Successful response; Photo updated successfully; Photo deleted successfully.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `albumId`: Album ID the photo belongs to
- `id`: Photo ID
- `thumbnailUrl`: Photo thumbnail URL
- `title`: Photo title
- `url`: Photo URL

### Post

Results: Post created successfully; Successful response; Post updated successfully; Post deleted successfully.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `body`: Post content
- `id`: Post ID
- `title`: Post title
- `userId`: User ID who created the post

### Todo

Results: Todo created successfully; Successful response; Todo updated successfully; Todo deleted successfully.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `completed`: Todo completion status
- `id`: Todo ID
- `title`: Todo title
- `userId`: User ID who created the todo

### User

Results: User created successfully; Successful response; User updated successfully; User deleted successfully.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `email`: User email
- `id`: User ID
- `name`: User full name
- `phone`: User phone number
- `username`: Username

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Album | `create` | `POST /albums` | See reference |
| Album | `list` | `GET /albums` | See reference |
| Album | `list` | `GET /users/{id}/albums` | See reference |
| Album | `load` | `GET /albums/{id}` | See reference |
| Album | `patch` | `PATCH /albums/{id}` | See reference |
| Album | `remove` | `DELETE /albums/{id}` | See reference |
| Album | `update` | `PUT /albums/{id}` | See reference |
| Comment | `create` | `POST /comments` | See reference |
| Comment | `list` | `GET /comments` | See reference |
| Comment | `list` | `GET /posts/{id}/comments` | See reference |
| Comment | `load` | `GET /comments/{id}` | See reference |
| Comment | `patch` | `PATCH /comments/{id}` | See reference |
| Comment | `remove` | `DELETE /comments/{id}` | See reference |
| Comment | `update` | `PUT /comments/{id}` | See reference |
| Photo | `create` | `POST /photos` | See reference |
| Photo | `list` | `GET /albums/{id}/photos` | See reference |
| Photo | `list` | `GET /photos` | See reference |
| Photo | `load` | `GET /photos/{id}` | See reference |
| Photo | `patch` | `PATCH /photos/{id}` | See reference |
| Photo | `remove` | `DELETE /photos/{id}` | See reference |
| Photo | `update` | `PUT /photos/{id}` | See reference |
| Post | `create` | `POST /posts` | See reference |
| Post | `list` | `GET /posts` | See reference |
| Post | `list` | `GET /users/{id}/posts` | See reference |
| Post | `load` | `GET /posts/{id}` | See reference |
| Post | `patch` | `PATCH /posts/{id}` | See reference |
| Post | `remove` | `DELETE /posts/{id}` | See reference |
| Post | `update` | `PUT /posts/{id}` | See reference |
| Todo | `create` | `POST /todos` | See reference |
| Todo | `list` | `GET /todos` | See reference |
| Todo | `list` | `GET /users/{id}/todos` | See reference |
| Todo | `load` | `GET /todos/{id}` | See reference |
| Todo | `patch` | `PATCH /todos/{id}` | See reference |
| Todo | `remove` | `DELETE /todos/{id}` | See reference |
| Todo | `update` | `PUT /todos/{id}` | See reference |
| User | `create` | `POST /users` | See reference |
| User | `list` | `GET /users` | See reference |
| User | `load` | `GET /users/{id}` | See reference |
| User | `patch` | `PATCH /users/{id}` | See reference |
| User | `remove` | `DELETE /users/{id}` | See reference |
| User | `update` | `PUT /users/{id}` | See reference |

## Connect to the API

- Production server: `https://jsonplaceholder.typicode.com`
- Production server (HTTP): `http://jsonplaceholder.typicode.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `jsonplaceholder_list`: List records for an entity. Supported entities: `album`, `comment`, `photo`, `post`, `todo`, `user`.
- `jsonplaceholder_load`: Load one record for an entity. Supported entities: `album`, `comment`, `photo`, `post`, `todo`, `user`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

