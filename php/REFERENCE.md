# MysqlVisualExplain PHP SDK Reference

Complete API reference for the MysqlVisualExplain PHP SDK.


## MysqlVisualExplainSDK

### Constructor

```php
require_once __DIR__ . '/mysql-visual-explain_sdk.php';

$client = new MysqlVisualExplainSDK($options);
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

#### `MysqlVisualExplainSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = MysqlVisualExplainSDK::test();
```


### Instance Methods

#### `QueryAnalysi($data = null)`

Create a new `QueryAnalysiEntity` instance. Pass `null` for no initial data.

#### `SystemInfo($data = null)`

Create a new `SystemInfoEntity` instance. Pass `null` for no initial data.

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

## QueryAnalysiEntity

```php
$query_analysi = $client->QueryAnalysi();
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

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->QueryAnalysi()->create([
  "query" => /* `$STRING` */,
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

#### `make(): QueryAnalysiEntity`

Create a new `QueryAnalysiEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SystemInfoEntity

```php
$system_info = $client->SystemInfo();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `version` | ``$STRING`` | No |  |
| `version_comment` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->SystemInfo()->load(["id" => "system_info_id"]);
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

#### `make(): SystemInfoEntity`

Create a new `SystemInfoEntity` instance with the same client and
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
$client = new MysqlVisualExplainSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

