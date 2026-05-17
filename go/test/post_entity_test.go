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

func TestPostEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Post(nil)
		if ent == nil {
			t.Fatal("expected non-nil PostEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := postBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "post." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_POST_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		postRef01Ent := client.Post(nil)
		postRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "post"}, setup.data), "post_ref01"))
		postRef01Data["user_id"] = setup.idmap["user01"]

		postRef01DataResult, err := postRef01Ent.Create(postRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		postRef01Data = core.ToMapAny(postRef01DataResult)
		if postRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if postRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		postRef01Match := map[string]any{
			"user_id": setup.idmap["user01"],
		}

		postRef01ListResult, err := postRef01Ent.List(postRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		postRef01List, postRef01ListOk := postRef01ListResult.([]any)
		if !postRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", postRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(postRef01List), map[string]any{"id": postRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		postRef01DataUp0Up := map[string]any{
			"id": postRef01Data["id"],
		}

		postRef01MarkdefUp0Name := "body"
		postRef01MarkdefUp0Value := fmt.Sprintf("Mark01-post_ref01_%d", setup.now)
		postRef01DataUp0Up[postRef01MarkdefUp0Name] = postRef01MarkdefUp0Value

		postRef01ResdataUp0Result, err := postRef01Ent.Update(postRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		postRef01ResdataUp0 := core.ToMapAny(postRef01ResdataUp0Result)
		if postRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if postRef01ResdataUp0["id"] != postRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if postRef01ResdataUp0[postRef01MarkdefUp0Name] != postRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", postRef01MarkdefUp0Name, postRef01ResdataUp0[postRef01MarkdefUp0Name])
		}

		// LOAD
		postRef01MatchDt0 := map[string]any{
			"id": postRef01Data["id"],
		}
		postRef01DataDt0Loaded, err := postRef01Ent.Load(postRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		postRef01DataDt0LoadResult := core.ToMapAny(postRef01DataDt0Loaded)
		if postRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if postRef01DataDt0LoadResult["id"] != postRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		postRef01MatchRm0 := map[string]any{
			"id": postRef01Data["id"],
		}
		_, err = postRef01Ent.Remove(postRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		postRef01MatchRt0 := map[string]any{
			"user_id": setup.idmap["user01"],
		}

		postRef01ListRt0Result, err := postRef01Ent.List(postRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		postRef01ListRt0, postRef01ListRt0Ok := postRef01ListRt0Result.([]any)
		if !postRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", postRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(postRef01ListRt0), map[string]any{"id": postRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func postBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "post", "PostTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read post test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse post test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"post01", "post02", "post03", "user01", "user02", "user03"},
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
	entidEnvRaw := os.Getenv("JSONPLACEHOLDER_TEST_POST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"JSONPLACEHOLDER_TEST_POST_ENTID": idmap,
		"JSONPLACEHOLDER_TEST_LIVE":      "FALSE",
		"JSONPLACEHOLDER_TEST_EXPLAIN":   "FALSE",
		"JSONPLACEHOLDER_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["JSONPLACEHOLDER_TEST_POST_ENTID"])
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
