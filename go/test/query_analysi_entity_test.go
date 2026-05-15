package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/mysql-visual-explain-sdk"
	"github.com/voxgig-sdk/mysql-visual-explain-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestQueryAnalysiEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.QueryAnalysi(nil)
		if ent == nil {
			t.Fatal("expected non-nil QueryAnalysiEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := query_analysiBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "query_analysi." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set MYSQLVISUALEXPLAIN_TEST_QUERY_ANALYSI_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		queryAnalysiRef01Ent := client.QueryAnalysi(nil)
		queryAnalysiRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "query_analysi"}, setup.data), "query_analysi_ref01"))

		queryAnalysiRef01DataResult, err := queryAnalysiRef01Ent.Create(queryAnalysiRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		queryAnalysiRef01Data = core.ToMapAny(queryAnalysiRef01DataResult)
		if queryAnalysiRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func query_analysiBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "query_analysi", "QueryAnalysiTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read query_analysi test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse query_analysi test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"query_analysi01", "query_analysi02", "query_analysi03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("MYSQLVISUALEXPLAIN_TEST_QUERY_ANALYSI_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MYSQLVISUALEXPLAIN_TEST_QUERY_ANALYSI_ENTID": idmap,
		"MYSQLVISUALEXPLAIN_TEST_LIVE":      "FALSE",
		"MYSQLVISUALEXPLAIN_TEST_EXPLAIN":   "FALSE",
		"MYSQLVISUALEXPLAIN_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["MYSQLVISUALEXPLAIN_TEST_QUERY_ANALYSI_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["MYSQLVISUALEXPLAIN_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["MYSQLVISUALEXPLAIN_APIKEY"],
			},
			extra,
		})
		client = sdk.NewMysqlVisualExplainSDK(core.ToMapAny(mergedOpts))
	}

	live := env["MYSQLVISUALEXPLAIN_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["MYSQLVISUALEXPLAIN_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
