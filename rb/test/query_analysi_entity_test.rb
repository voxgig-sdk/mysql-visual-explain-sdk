# QueryAnalysi entity test

require "minitest/autorun"
require "json"
require_relative "../MysqlVisualExplain_sdk"
require_relative "runner"

class QueryAnalysiEntityTest < Minitest::Test
  def test_create_instance
    testsdk = MysqlVisualExplainSDK.test(nil, nil)
    ent = testsdk.QueryAnalysi(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = query_analysi_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "query_analysi." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set MYSQLVISUALEXPLAIN_TEST_QUERY_ANALYSI_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    query_analysi_ref01_ent = client.QueryAnalysi(nil)
    query_analysi_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.query_analysi"), "query_analysi_ref01"))

    query_analysi_ref01_data_result, err = query_analysi_ref01_ent.create(query_analysi_ref01_data, nil)
    assert_nil err
    query_analysi_ref01_data = Helpers.to_map(query_analysi_ref01_data_result)
    assert !query_analysi_ref01_data.nil?

  end
end

def query_analysi_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "query_analysi", "QueryAnalysiTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MysqlVisualExplainSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["query_analysi01", "query_analysi02", "query_analysi03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["MYSQLVISUALEXPLAIN_TEST_QUERY_ANALYSI_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "MYSQLVISUALEXPLAIN_TEST_QUERY_ANALYSI_ENTID" => idmap,
    "MYSQLVISUALEXPLAIN_TEST_LIVE" => "FALSE",
    "MYSQLVISUALEXPLAIN_TEST_EXPLAIN" => "FALSE",
    "MYSQLVISUALEXPLAIN_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["MYSQLVISUALEXPLAIN_TEST_QUERY_ANALYSI_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["MYSQLVISUALEXPLAIN_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["MYSQLVISUALEXPLAIN_APIKEY"],
      },
      extra || {},
    ])
    client = MysqlVisualExplainSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["MYSQLVISUALEXPLAIN_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["MYSQLVISUALEXPLAIN_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
