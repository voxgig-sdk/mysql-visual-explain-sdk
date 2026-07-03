<?php
declare(strict_types=1);

// QueryAnalysi entity test

require_once __DIR__ . '/../mysqlvisualexplain_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class QueryAnalysiEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MysqlVisualExplainSDK::test(null, null);
        $ent = $testsdk->QueryAnalysi(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = query_analysi_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "query_analysi." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MYSQLVISUALEXPLAIN_TEST_QUERY_ANALYSI_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $query_analysi_ref01_ent = $client->QueryAnalysi(null);
        $query_analysi_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.query_analysi"), "query_analysi_ref01"));

        [$query_analysi_ref01_data_result, $err] = $query_analysi_ref01_ent->create($query_analysi_ref01_data, null);
        $this->assertNull($err);
        $query_analysi_ref01_data = Helpers::to_map($query_analysi_ref01_data_result);
        $this->assertNotNull($query_analysi_ref01_data);

    }
}

function query_analysi_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/query_analysi/QueryAnalysiTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MysqlVisualExplainSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["query_analysi01", "query_analysi02", "query_analysi03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MYSQLVISUALEXPLAIN_TEST_QUERY_ANALYSI_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MYSQLVISUALEXPLAIN_TEST_QUERY_ANALYSI_ENTID" => $idmap,
        "MYSQLVISUALEXPLAIN_TEST_LIVE" => "FALSE",
        "MYSQLVISUALEXPLAIN_TEST_EXPLAIN" => "FALSE",
        "MYSQLVISUALEXPLAIN_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MYSQLVISUALEXPLAIN_TEST_QUERY_ANALYSI_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["MYSQLVISUALEXPLAIN_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["MYSQLVISUALEXPLAIN_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new MysqlVisualExplainSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["MYSQLVISUALEXPLAIN_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["MYSQLVISUALEXPLAIN_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
