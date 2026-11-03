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
const albumEntityLiveStrict = true


type albumFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *albumFailHook) PreSpec(ctx *sdk.Context) {
	panic("album hook failed")
}

func (f *albumFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestAlbumEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Album(nil)
		if ent == nil {
			t.Fatal("expected non-nil AlbumEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"album": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.Album(nil).Stream("list", nil, nil) {
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
			for si := range streamSdk.Album(nil).Stream("list", nil, nil) {
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
		for si := range sdk.TestSDK(offline, nil).Album(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).Album(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.Album(nil).Stream("list", nil, nil) {
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
		for range sdk.TestSDK(nil, nil).Album(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &albumFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.Album(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.Album(nil).List(nil, map[string]any{"throw": false}); nil != err {
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
		_, err := client.Album(nil).List(map[string]any{"user_id": "x"}, nil)
		if sdkerr, ok := err.(*core.JsonplaceholderError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
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
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"album.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /albums\"}")
			t.Log("LIVE STEP {\"id\":\"album.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /albums/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"album.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /albums/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"album.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, albumEntityLiveStrict, setup.data, "album", func() (any, error) {
				return client.Album(nil).List(map[string]any{"user_id": 1}, nil)
			})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		albumRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.album")))
		var albumRef01Data map[string]any
		if len(albumRef01DataRaw) > 0 {
			albumRef01Data = core.ToMapAny(albumRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = albumRef01Data

		// LIST
		albumRef01Ent := client.Album(nil)
		albumRef01Match := map[string]any{}
		if setup.live {
			albumRef01Match["user_id"] = 1
		}

		albumRef01ListResult, err := albumRef01Ent.List(albumRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, albumRef01ListOk := albumRef01ListResult.([]any)
		if !albumRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", albumRef01ListResult)
		}

		// LOAD
		albumRef01MatchDt0 := map[string]any{
			"id": albumRef01Data["id"],
		}
		albumRef01DataDt0Loaded, err := albumRef01Ent.Load(albumRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		albumRef01DataDt0LoadResult := core.ToMapAny(entityData(albumRef01DataDt0Loaded))
		if albumRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if albumRef01DataDt0LoadResult["id"] != albumRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"user01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, albumEntityLiveStrict, "Live entity test blocked: needs %s via JSONPLACEHOLDER_TEST_ALBUM_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		albumRef01Ent := client.Album(nil)
		albumRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "album"}), "album_ref01"))
		albumRef01Data["user_id"] = setup.idmap["user01"]

		albumRef01DataResult, err := albumRef01Ent.Create(albumRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		albumRef01Data = core.ToMapAny(entityData(albumRef01DataResult))
		if albumRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if albumRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		albumRef01Match := map[string]any{}
		if setup.live {
			albumRef01Match["user_id"] = 1
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
		albumRef01ResdataUp0 := core.ToMapAny(entityData(albumRef01ResdataUp0Result))
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
		albumRef01DataDt0LoadResult := core.ToMapAny(entityData(albumRef01DataDt0Loaded))
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
		albumRef01MatchRt0 := map[string]any{}
		if setup.live {
			albumRef01MatchRt0["user_id"] = 1
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
	idmap, _ := vs.Transform(
		[]any{"album01", "album02", "album03", "user01", "user02", "user03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("JSONPLACEHOLDER_TEST_ALBUM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"JSONPLACEHOLDER_TEST_ALBUM_ENTID": idmap,
		"JSONPLACEHOLDER_TEST_LIVE":      "FALSE",
		"JSONPLACEHOLDER_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["JSONPLACEHOLDER_TEST_ALBUM_ENTID"])
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
