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

func TestAlbumEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Album(nil)
		if ent == nil {
			t.Fatal("expected non-nil AlbumEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := albumBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "album." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_ALBUM_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		albumRef01Ent := client.Album(nil)
		albumRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "album"}, setup.data), "album_ref01"))
		albumRef01Data["user_id"] = setup.idmap["user01"]

		albumRef01DataResult, err := albumRef01Ent.Create(albumRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		albumRef01Data = core.ToMapAny(albumRef01DataResult)
		if albumRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if albumRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		albumRef01Match := map[string]any{
			"user_id": setup.idmap["user01"],
		}

		albumRef01ListResult, err := albumRef01Ent.List(albumRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		albumRef01List, albumRef01ListOk := albumRef01ListResult.([]any)
		if !albumRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", albumRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(albumRef01List), map[string]any{"id": albumRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		albumRef01DataUp0Up := map[string]any{
			"id": albumRef01Data["id"],
		}

		albumRef01MarkdefUp0Name := "title"
		albumRef01MarkdefUp0Value := fmt.Sprintf("Mark01-album_ref01_%d", setup.now)
		albumRef01DataUp0Up[albumRef01MarkdefUp0Name] = albumRef01MarkdefUp0Value

		albumRef01ResdataUp0Result, err := albumRef01Ent.Update(albumRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		albumRef01ResdataUp0 := core.ToMapAny(albumRef01ResdataUp0Result)
		if albumRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if albumRef01ResdataUp0["id"] != albumRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if albumRef01ResdataUp0[albumRef01MarkdefUp0Name] != albumRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", albumRef01MarkdefUp0Name, albumRef01ResdataUp0[albumRef01MarkdefUp0Name])
		}

		// LOAD
		albumRef01MatchDt0 := map[string]any{
			"id": albumRef01Data["id"],
		}
		albumRef01DataDt0Loaded, err := albumRef01Ent.Load(albumRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		albumRef01DataDt0LoadResult := core.ToMapAny(albumRef01DataDt0Loaded)
		if albumRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if albumRef01DataDt0LoadResult["id"] != albumRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		albumRef01MatchRm0 := map[string]any{
			"id": albumRef01Data["id"],
		}
		_, err = albumRef01Ent.Remove(albumRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		albumRef01MatchRt0 := map[string]any{
			"user_id": setup.idmap["user01"],
		}

		albumRef01ListRt0Result, err := albumRef01Ent.List(albumRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		albumRef01ListRt0, albumRef01ListRt0Ok := albumRef01ListRt0Result.([]any)
		if !albumRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", albumRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(albumRef01ListRt0), map[string]any{"id": albumRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func albumBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "album", "AlbumTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read album test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse album test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"album01", "album02", "album03", "user01", "user02", "user03"},
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
	entidEnvRaw := os.Getenv("JSONPLACEHOLDER_TEST_ALBUM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"JSONPLACEHOLDER_TEST_ALBUM_ENTID": idmap,
		"JSONPLACEHOLDER_TEST_LIVE":      "FALSE",
		"JSONPLACEHOLDER_TEST_EXPLAIN":   "FALSE",
		"JSONPLACEHOLDER_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["JSONPLACEHOLDER_TEST_ALBUM_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["JSONPLACEHOLDER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["JSONPLACEHOLDER_APIKEY"],
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
