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

func TestTodoEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Todo(nil)
		if ent == nil {
			t.Fatal("expected non-nil TodoEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"todo": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Todo(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Todo(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := todoBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "todo." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_TODO_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		todoRef01Ent := client.Todo(nil)
		todoRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "todo"}, setup.data), "todo_ref01"))
		todoRef01Data["user_id"] = setup.idmap["user01"]

		todoRef01DataResult, err := todoRef01Ent.Create(todoRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		todoRef01Data = core.ToMapAny(entityData(todoRef01DataResult))
		if todoRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if todoRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		todoRef01Match := map[string]any{
			"user_id": setup.idmap["user01"],
		}

		todoRef01ListResult, err := todoRef01Ent.List(todoRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		todoRef01List, todoRef01ListOk := todoRef01ListResult.([]any)
		if !todoRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", todoRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(todoRef01List), map[string]any{"id": todoRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		todoRef01DataUp0Up := map[string]any{
			"id": todoRef01Data["id"],
		}

		todoRef01MarkdefUp0Name := "title"
		todoRef01MarkdefUp0Value := fmt.Sprintf("Mark01-todo_ref01_%d", setup.now)
		todoRef01DataUp0Up[todoRef01MarkdefUp0Name] = todoRef01MarkdefUp0Value

		todoRef01ResdataUp0Result, err := todoRef01Ent.Update(todoRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		todoRef01ResdataUp0 := core.ToMapAny(entityData(todoRef01ResdataUp0Result))
		if todoRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if todoRef01ResdataUp0["id"] != todoRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if todoRef01ResdataUp0[todoRef01MarkdefUp0Name] != todoRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", todoRef01MarkdefUp0Name, todoRef01ResdataUp0[todoRef01MarkdefUp0Name])
		}

		// LOAD
		todoRef01MatchDt0 := map[string]any{
			"id": todoRef01Data["id"],
		}
		todoRef01DataDt0Loaded, err := todoRef01Ent.Load(todoRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		todoRef01DataDt0LoadResult := core.ToMapAny(entityData(todoRef01DataDt0Loaded))
		if todoRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if todoRef01DataDt0LoadResult["id"] != todoRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		todoRef01MatchRm0 := map[string]any{
			"id": todoRef01Data["id"],
		}
		_, err = todoRef01Ent.Remove(todoRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		todoRef01MatchRt0 := map[string]any{
			"user_id": setup.idmap["user01"],
		}

		todoRef01ListRt0Result, err := todoRef01Ent.List(todoRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		todoRef01ListRt0, todoRef01ListRt0Ok := todoRef01ListRt0Result.([]any)
		if !todoRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", todoRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(todoRef01ListRt0), map[string]any{"id": todoRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func todoBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "todo", "TodoTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read todo test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse todo test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"todo01", "todo02", "todo03", "user01", "user02", "user03"},
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
	entidEnvRaw := os.Getenv("JSONPLACEHOLDER_TEST_TODO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"JSONPLACEHOLDER_TEST_TODO_ENTID": idmap,
		"JSONPLACEHOLDER_TEST_LIVE":      "FALSE",
		"JSONPLACEHOLDER_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["JSONPLACEHOLDER_TEST_TODO_ENTID"])
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
