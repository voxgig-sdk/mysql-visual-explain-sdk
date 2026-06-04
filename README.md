# MysqlVisualExplain SDK

Turn MySQL EXPLAIN output into interactive visual query plans

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About MySQL Visual Explain

[MySQL Visual Explain](https://mysqlexplain.com) is a hosted service that converts the output of MySQL's `EXPLAIN` command into interactive visualisations, making it easier to spot slow joins, missing indexes, and other query-plan issues.

The API exposes two operations:

- `POST /v2/explains` — submit a MySQL query plan for analysis and receive a sharable visualisation.
- `GET /v2/oembed.json` — return oEmbed-compatible iframe markup so an EXPLAIN plan can be embedded in a webpage, blog post, or documentation.

The API is served from `https://api.mysqlexplain.com` and has CORS enabled, so it can be called from browser-based tools. Public documentation does not specify authentication requirements or rate limits.

## Try it

**TypeScript**
```bash
npm install mysql-visual-explain
```

**Python**
```bash
pip install mysql-visual-explain-sdk
```

**PHP**
```bash
composer require voxgig/mysql-visual-explain-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/mysql-visual-explain-sdk/go
```

**Ruby**
```bash
gem install mysql-visual-explain-sdk
```

**Lua**
```bash
luarocks install mysql-visual-explain-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { MysqlVisualExplainSDK } from 'mysql-visual-explain'

const client = new MysqlVisualExplainSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o mysql-visual-explain-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "mysql-visual-explain": {
      "command": "/abs/path/to/mysql-visual-explain-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **QueryAnalysi** | Represents a submitted MySQL EXPLAIN plan and its generated visualisation; created via `POST /v2/explains`. | `/api/explain` |
| **SystemInfo** | Service-level metadata and oEmbed responses used to embed a rendered query plan, returned by `GET /v2/oembed.json`. | `/api/version` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from mysqlvisualexplain_sdk import MysqlVisualExplainSDK

client = MysqlVisualExplainSDK({})

```

### PHP

```php
<?php
require_once 'mysqlvisualexplain_sdk.php';

$client = new MysqlVisualExplainSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/mysql-visual-explain-sdk/go"

client := sdk.NewMysqlVisualExplainSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "MysqlVisualExplain_sdk"

client = MysqlVisualExplainSDK.new({})

```

### Lua

```lua
local sdk = require("mysql-visual-explain_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = MysqlVisualExplainSDK.test()
const result = await client.QueryAnalysi().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = MysqlVisualExplainSDK.test(None, None)
result, err = client.QueryAnalysi(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = MysqlVisualExplainSDK::test(null, null);
[$result, $err] = $client->QueryAnalysi(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.QueryAnalysi(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MysqlVisualExplainSDK.test(nil, nil)
result, err = client.QueryAnalysi(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:QueryAnalysi(nil):load(
  { id = "test01" }, nil
)
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

## Using the MySQL Visual Explain

- Upstream: [https://mysqlexplain.com](https://mysqlexplain.com)

---

Generated from the MySQL Visual Explain OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
