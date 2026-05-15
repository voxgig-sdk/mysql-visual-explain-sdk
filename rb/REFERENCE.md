# MysqlVisualExplain Ruby SDK Reference

Complete API reference for the MysqlVisualExplain Ruby SDK.


## MysqlVisualExplainSDK

### Constructor

```ruby
require_relative 'mysql-visual-explain_sdk'

client = MysqlVisualExplainSDK.new(options)
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

#### `MysqlVisualExplainSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = MysqlVisualExplainSDK.test
```


### Instance Methods

#### `QueryAnalysi(data = nil)`

Create a new `QueryAnalysi` entity instance. Pass `nil` for no initial data.

#### `SystemInfo(data = nil)`

Create a new `SystemInfo` entity instance. Pass `nil` for no initial data.

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

## QueryAnalysiEntity

```ruby
query_analysi = client.QueryAnalysi
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `explain_output` | ``$OBJECT`` | No |  |
| `mysql_version` | ``$STRING`` | No |  |
| `query` | ``$STRING`` | Yes |  |
| `recommendation` | ``$ARRAY`` | No |  |
| `visualization` | ``$OBJECT`` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.QueryAnalysi.create({
  "query" => # `$STRING`,
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

Create a new `QueryAnalysiEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SystemInfoEntity

```ruby
system_info = client.SystemInfo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `version` | ``$STRING`` | No |  |
| `version_comment` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.SystemInfo.load({ "id" => "system_info_id" })
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

Create a new `SystemInfoEntity` instance with the same client and
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
client = MysqlVisualExplainSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

