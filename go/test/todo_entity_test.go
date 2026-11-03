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

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const todoEntityLiveStrict = true


type todoFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *todoFailHook) PreSpec(ctx *sdk.Context) {
	panic("todo hook failed")
}

func (f *todoFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

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
		for si := range base.Todo(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				t.Fatalf("stream failed: %v", si.Err)
			}
			seen = append(seen, si.Item)
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
			for si := range streamSdk.Todo(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					t.Fatalf("stream failed: %v", si.Err)
				}
				if sub, ok := si.Item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, si.Item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("stream-error", func(t *testing.T) {
		offline := map[string]any{"net": map[string]any{"offline": true}}
		var streamerr error
		for si := range sdk.TestSDK(offline, nil).Todo(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).Todo(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.Todo(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					denyerr = si.Err
				}
			}
			if sdkerr, ok := denyerr.(*core.JsonplaceholderError); !ok || "rbac_denied" != sdkerr.Code {
				t.Fatalf("expected the rbac denial as a stream value, got %v", denyerr)
			}
		}
	})

	t.Run("stream-ctrl", func(t *testing.T) {
		explain := map[string]any{}
		ctrl := map[string]any{"explain": explain}
		for range sdk.TestSDK(nil, nil).Todo(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &todoFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.Todo(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.Todo(nil).List(nil, map[string]any{"throw": false}); nil != err {
			t.Fatalf("throw false: expected no error, got %v", err)
		}
		if fired == hook.unexpected {
			t.Fatalf("throw false: PreUnexpected did not fire")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Todo(nil).List(map[string]any{"user_id": "x"}, nil)
		if sdkerr, ok := err.(*core.JsonplaceholderError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
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
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"todo.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /todos\"}")
			t.Log("LIVE STEP {\"id\":\"todo.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /todos/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"todo.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /todos/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"todo.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, todoEntityLiveStrict, setup.data, "todo", func() (any, error) {
				return client.Todo(nil).List(map[string]any{"user_id": 1}, nil)
			})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		todoRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.todo")))
		var todoRef01Data map[string]any
		if len(todoRef01DataRaw) > 0 {
			todoRef01Data = core.ToMapAny(todoRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = todoRef01Data

		// LIST
		todoRef01Ent := client.Todo(nil)
		todoRef01Match := map[string]any{}
		if setup.live {
			todoRef01Match["user_id"] = 1
		}

		todoRef01ListResult, err := todoRef01Ent.List(todoRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, todoRef01ListOk := todoRef01ListResult.([]any)
		if !todoRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", todoRef01ListResult)
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

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"user01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, todoEntityLiveStrict, "Live entity test blocked: needs %s via JSONPLACEHOLDER_TEST_TODO_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		todoRef01Ent := client.Todo(nil)
		todoRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "todo"}), "todo_ref01"))
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
		todoRef01Match := map[string]any{}
		if setup.live {
			todoRef01Match["user_id"] = 1
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
		todoRef01MatchRt0 := map[string]any{}
		if setup.live {
			todoRef01MatchRt0["user_id"] = 1
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
	idmap, _ := vs.Transform(
		[]any{"todo01", "todo02", "todo03", "user01", "user02", "user03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
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
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
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
