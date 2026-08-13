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
    public ?array $explainOutput = null;
    public ?string $mysqlVersion = null;
    public string $query;
    public ?array $recommendations = null;
    public ?array $visualization = null;
}

/** Request payload for QueryAnalysi#create. */
class QueryAnalysiCreateData
{
    public ?array $explainOutput = null;
    public ?string $mysqlVersion = null;
    public string $query;
    public ?array $recommendations = null;
    public ?array $visualization = null;
}

/** SystemInfo entity data model. */
class SystemInfo
{
    public ?string $version = null;
    public ?string $versionComment = null;
}

/** Request payload for SystemInfo#load. */
class SystemInfoLoadMatch
{
    public ?string $version = null;
    public ?string $versionComment = null;
}

