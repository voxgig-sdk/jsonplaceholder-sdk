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

func TestCommentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Comment(nil)
		if ent == nil {
			t.Fatal("expected non-nil CommentEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"comment": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Comment(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.MakeConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Comment(nil).Stream("list", nil, nil) {
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
		setup := commentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "comment." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_COMMENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		commentRef01Ent := client.Comment(nil)
		commentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "comment"}, setup.data), "comment_ref01"))
		commentRef01Data["post_id"] = setup.idmap["post01"]

		commentRef01DataResult, err := commentRef01Ent.Create(commentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		commentRef01Data = core.ToMapAny(entityData(commentRef01DataResult))
		if commentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if commentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		commentRef01Match := map[string]any{
			"post_id": setup.idmap["post01"],
		}

		commentRef01ListResult, err := commentRef01Ent.List(commentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		commentRef01List, commentRef01ListOk := commentRef01ListResult.([]any)
		if !commentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", commentRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(commentRef01List), map[string]any{"id": commentRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		commentRef01DataUp0Up := map[string]any{
			"id": commentRef01Data["id"],
		}

		commentRef01MarkdefUp0Name := "body"
		commentRef01MarkdefUp0Value := fmt.Sprintf("Mark01-comment_ref01_%d", setup.now)
		commentRef01DataUp0Up[commentRef01MarkdefUp0Name] = commentRef01MarkdefUp0Value

		commentRef01ResdataUp0Result, err := commentRef01Ent.Update(commentRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		commentRef01ResdataUp0 := core.ToMapAny(entityData(commentRef01ResdataUp0Result))
		if commentRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if commentRef01ResdataUp0["id"] != commentRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if commentRef01ResdataUp0[commentRef01MarkdefUp0Name] != commentRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", commentRef01MarkdefUp0Name, commentRef01ResdataUp0[commentRef01MarkdefUp0Name])
		}

		// LOAD
		commentRef01MatchDt0 := map[string]any{
			"id": commentRef01Data["id"],
		}
		commentRef01DataDt0Loaded, err := commentRef01Ent.Load(commentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		commentRef01DataDt0LoadResult := core.ToMapAny(entityData(commentRef01DataDt0Loaded))
		if commentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if commentRef01DataDt0LoadResult["id"] != commentRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		commentRef01MatchRm0 := map[string]any{
			"id": commentRef01Data["id"],
		}
		_, err = commentRef01Ent.Remove(commentRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		commentRef01MatchRt0 := map[string]any{
			"post_id": setup.idmap["post01"],
		}

		commentRef01ListRt0Result, err := commentRef01Ent.List(commentRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		commentRef01ListRt0, commentRef01ListRt0Ok := commentRef01ListRt0Result.([]any)
		if !commentRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", commentRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(commentRef01ListRt0), map[string]any{"id": commentRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func commentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "comment", "CommentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read comment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse comment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"comment01", "comment02", "comment03", "post01", "post02", "post03"},
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
	entidEnvRaw := os.Getenv("JSONPLACEHOLDER_TEST_COMMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"JSONPLACEHOLDER_TEST_COMMENT_ENTID": idmap,
		"JSONPLACEHOLDER_TEST_LIVE":      "FALSE",
		"JSONPLACEHOLDER_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["JSONPLACEHOLDER_TEST_COMMENT_ENTID"])
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
