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

func TestSystemInfoEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SystemInfo(nil)
		if ent == nil {
			t.Fatal("expected non-nil SystemInfoEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := system_infoBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "system_info." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set MYSQLVISUALEXPLAIN_TEST_SYSTEM_INFO_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		systemInfoRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.system_info", setup.data)))
		var systemInfoRef01Data map[string]any
		if len(systemInfoRef01DataRaw) > 0 {
			systemInfoRef01Data = core.ToMapAny(systemInfoRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = systemInfoRef01Data

		// LOAD
		systemInfoRef01Ent := client.SystemInfo(nil)
		systemInfoRef01MatchDt0 := map[string]any{}
		systemInfoRef01DataDt0Loaded, err := systemInfoRef01Ent.Load(systemInfoRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if systemInfoRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func system_infoBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "system_info", "SystemInfoTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read system_info test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse system_info test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"system_info01", "system_info02", "system_info03"},
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
	entidEnvRaw := os.Getenv("MYSQLVISUALEXPLAIN_TEST_SYSTEM_INFO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MYSQLVISUALEXPLAIN_TEST_SYSTEM_INFO_ENTID": idmap,
		"MYSQLVISUALEXPLAIN_TEST_LIVE":      "FALSE",
		"MYSQLVISUALEXPLAIN_TEST_EXPLAIN":   "FALSE",
		"MYSQLVISUALEXPLAIN_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["MYSQLVISUALEXPLAIN_TEST_SYSTEM_INFO_ENTID"])
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
