package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/jsonplaceholder-sdk/go"
	"github.com/voxgig-sdk/jsonplaceholder-sdk/go/core"

	vs "github.com/voxgig-sdk/jsonplaceholder-sdk/go/utility/struct"
)

func TestPhotoEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Photo(nil)
		if ent == nil {
			t.Fatal("expected non-nil PhotoEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := photoBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "photo." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_PHOTO_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		photoRef01Ent := client.Photo(nil)
		photoRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "photo"}, setup.data), "photo_ref01"))
		photoRef01Data["album_id"] = setup.idmap["album01"]

		photoRef01DataResult, err := photoRef01Ent.Create(photoRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		photoRef01Data = core.ToMapAny(photoRef01DataResult)
		if photoRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if photoRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		photoRef01Match := map[string]any{}

		photoRef01ListResult, err := photoRef01Ent.List(photoRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		photoRef01List, photoRef01ListOk := photoRef01ListResult.([]any)
		if !photoRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", photoRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(photoRef01List), map[string]any{"id": photoRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		photoRef01DataUp0Up := map[string]any{
			"id": photoRef01Data["id"],
		}

		photoRef01MarkdefUp0Name := "thumbnail_url"
		photoRef01MarkdefUp0Value := fmt.Sprintf("Mark01-photo_ref01_%d", setup.now)
		photoRef01DataUp0Up[photoRef01MarkdefUp0Name] = photoRef01MarkdefUp0Value

		photoRef01ResdataUp0Result, err := photoRef01Ent.Update(photoRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		photoRef01ResdataUp0 := core.ToMapAny(photoRef01ResdataUp0Result)
		if photoRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if photoRef01ResdataUp0["id"] != photoRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if photoRef01ResdataUp0[photoRef01MarkdefUp0Name] != photoRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", photoRef01MarkdefUp0Name, photoRef01ResdataUp0[photoRef01MarkdefUp0Name])
		}

		// LOAD
		photoRef01MatchDt0 := map[string]any{
			"id": photoRef01Data["id"],
		}
		photoRef01DataDt0Loaded, err := photoRef01Ent.Load(photoRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		photoRef01DataDt0LoadResult := core.ToMapAny(photoRef01DataDt0Loaded)
		if photoRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if photoRef01DataDt0LoadResult["id"] != photoRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		photoRef01MatchRm0 := map[string]any{
			"id": photoRef01Data["id"],
		}
		_, err = photoRef01Ent.Remove(photoRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		photoRef01MatchRt0 := map[string]any{}

		photoRef01ListRt0Result, err := photoRef01Ent.List(photoRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		photoRef01ListRt0, photoRef01ListRt0Ok := photoRef01ListRt0Result.([]any)
		if !photoRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", photoRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(photoRef01ListRt0), map[string]any{"id": photoRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func photoBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "photo", "PhotoTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read photo test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse photo test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"photo01", "photo02", "photo03", "album01", "album02", "album03"},
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
	entidEnvRaw := os.Getenv("JSONPLACEHOLDER_TEST_PHOTO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"JSONPLACEHOLDER_TEST_PHOTO_ENTID": idmap,
		"JSONPLACEHOLDER_TEST_LIVE":      "FALSE",
		"JSONPLACEHOLDER_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["JSONPLACEHOLDER_TEST_PHOTO_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["JSONPLACEHOLDER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewJsonplaceholderSDK(core.ToMapAny(mergedOpts))
	}

	live := env["JSONPLACEHOLDER_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["JSONPLACEHOLDER_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
