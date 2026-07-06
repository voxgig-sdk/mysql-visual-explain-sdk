<?php
declare(strict_types=1);

// Typed models for the MysqlVisualExplain SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** QueryAnalysi entity data model. */
class QueryAnalysi
{
    public ?array $explain_output = null;
    public ?string $mysql_version = null;
    public string $query;
    public ?array $recommendation = null;
    public ?array $visualization = null;
}

/** Request payload for QueryAnalysi#create. */
class QueryAnalysiCreateData
{
    public ?array $explain_output = null;
    public ?string $mysql_version = null;
    public string $query;
    public ?array $recommendation = null;
    public ?array $visualization = null;
}

/** SystemInfo entity data model. */
class SystemInfo
{
    public ?string $version = null;
    public ?string $version_comment = null;
}

/** Request payload for SystemInfo#load. */
class SystemInfoLoadMatch
{
    public ?string $version = null;
    public ?string $version_comment = null;
}

