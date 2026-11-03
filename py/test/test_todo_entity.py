# Todo entity test

import json
import os
import time

import pytest

from jsonplaceholder_sdk.utility.voxgig_struct import voxgig_struct as vs
from jsonplaceholder_sdk import JsonplaceholderSDK
from jsonplaceholder_sdk.core import helpers
from jsonplaceholder_sdk.config import shared_config
from jsonplaceholder_sdk.feature.base_feature import JsonplaceholderBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class _FailHook(JsonplaceholderBaseFeature):
    def __init__(self):
        super().__init__()
        self.name = "failhook"
        self.unexpected = 0

    def init(self, ctx, options):
        pass

    def PreSpec(self, ctx):
        raise RuntimeError("todo hook failed")

    def PreUnexpected(self, ctx):
        self.unexpected += 1



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestTodoEntity:

    def test_should_create_instance(self):
        testsdk = JsonplaceholderSDK.test(None, None)
        ent = testsdk.Todo(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "todo": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = JsonplaceholderSDK.test(seed, None)
        seen = list(base.Todo(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from jsonplaceholder_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = JsonplaceholderSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Todo(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_report_a_failed_stream(self):
        offline = {"net": {"offline": True}}
        with pytest.raises(Exception, match="offline"):
            list(JsonplaceholderSDK.test(offline, None).Todo(None).stream("list", None, None))

        quiet = {"ctrl": {"throw": False}}
        list(JsonplaceholderSDK.test(offline, None).Todo(None).stream("list", None, quiet))

        if "rbac" in (shared_config().get("feature") or {}):
            denied = JsonplaceholderSDK.test(
                None, {"feature": {"rbac": {"active": True, "deny": True}}})
            with pytest.raises(Exception) as err:
                list(denied.Todo(None).stream("list", None, None))
            assert "rbac_denied" == getattr(err.value, "code", None)

    def test_should_leave_the_callers_ctrl(self):
        explain = {}
        ctrl = {"explain": explain}
        list(JsonplaceholderSDK.test(None, None).Todo(None).stream("list", None, {"ctrl": ctrl}))
        assert ["explain"] == list(ctrl.keys())
        assert explain is ctrl["explain"] and 0 < len(explain)

    def test_should_fire_pre_unexpected(self):
        hook = _FailHook()
        client = JsonplaceholderSDK({"feature": {"test": {"active": True}}, "extend": [hook]})
        with pytest.raises(Exception, match="hook failed"):
            client.Todo(None).list(None, None)
        assert 0 < hook.unexpected

        fired = hook.unexpected
        assert client.Todo(None).list(None, {"throw": False}) is None
        assert fired < hook.unexpected

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = JsonplaceholderSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Todo(None).list({"user_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _todo_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "todo." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"todo.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /todos\"}")
            print("LIVE STEP {\"id\":\"todo.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /todos/{id}\"}")
            print("LIVE STEP {\"id\":\"todo.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /todos/{id}\"}")
            print("LIVE STEP {\"id\":\"todo.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["user01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via JSONPLACEHOLDER_TEST_TODO_ENTID")
        client = setup["client"]

        # CREATE
        todo_ref01_ent = client.Todo(None)
        todo_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.todo"), "todo_ref01"))
        todo_ref01_data["user_id"] = setup["idmap"]["user01"]

        todo_ref01_data = helpers.to_map(runner.entity_data(todo_ref01_ent.create(todo_ref01_data, None)))
        assert todo_ref01_data is not None
        assert todo_ref01_data["id"] is not None

        # LIST
        todo_ref01_match = {}
        if setup["live"]:
            todo_ref01_match["user_id"] = 1

        todo_ref01_list_result = todo_ref01_ent.list(todo_ref01_match, None)
        assert isinstance(todo_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(todo_ref01_list_result),
            {"id": todo_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        todo_ref01_data_up0_up = {
            "id": todo_ref01_data["id"],
        }

        todo_ref01_markdef_up0_name = "title"
        todo_ref01_markdef_up0_value = "Mark01-todo_ref01_" + str(setup["now"])
        todo_ref01_data_up0_up[todo_ref01_markdef_up0_name] = todo_ref01_markdef_up0_value

        todo_ref01_resdata_up0 = helpers.to_map(runner.entity_data(todo_ref01_ent.update(todo_ref01_data_up0_up, None)))
        assert todo_ref01_resdata_up0 is not None
        assert todo_ref01_resdata_up0["id"] == todo_ref01_data_up0_up["id"]
        assert todo_ref01_resdata_up0[todo_ref01_markdef_up0_name] == todo_ref01_markdef_up0_value

        # LOAD
        todo_ref01_match_dt0 = {
            "id": todo_ref01_data["id"],
        }
        todo_ref01_data_dt0_loaded = todo_ref01_ent.load(todo_ref01_match_dt0, None)
        todo_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(todo_ref01_data_dt0_loaded))
        assert todo_ref01_data_dt0_load_result is not None
        assert todo_ref01_data_dt0_load_result["id"] == todo_ref01_data["id"]

        # REMOVE
        todo_ref01_match_rm0 = {
            "id": todo_ref01_data["id"],
        }
        todo_ref01_ent.remove(todo_ref01_match_rm0, None)

        # LIST
        todo_ref01_match_rt0 = {}
        if setup["live"]:
            todo_ref01_match_rt0["user_id"] = 1

        todo_ref01_list_rt0_result = todo_ref01_ent.list(todo_ref01_match_rt0, None)
        assert isinstance(todo_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(todo_ref01_list_rt0_result),
            {"id": todo_ref01_data["id"]})
        assert vs.isempty(not_found_item)


    def _run_get_only_flow(self, setup):
        client = setup["client"]
        if setup["live"]:
            runner.live_existing(setup, LIVE_STRICT, "todo",
                                 lambda: client.Todo(None).list({"user_id": 1}, None))

        # Bootstrap entity data from existing test data.
        todo_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.todo")))
        todo_ref01_data = None
        if len(todo_ref01_data_raw) > 0:
            todo_ref01_data = helpers.to_map(todo_ref01_data_raw[0][1])

        # LIST
        todo_ref01_ent = client.Todo(None)
        todo_ref01_match = {}
        if setup["live"]:
            todo_ref01_match["user_id"] = 1

        todo_ref01_list_result = todo_ref01_ent.list(todo_ref01_match, None)
        assert isinstance(todo_ref01_list_result, list)

        # LOAD
        todo_ref01_match_dt0 = {
            "id": todo_ref01_data["id"],
        }
        todo_ref01_data_dt0_loaded = todo_ref01_ent.load(todo_ref01_match_dt0, None)
        todo_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(todo_ref01_data_dt0_loaded))
        assert todo_ref01_data_dt0_load_result is not None
        assert todo_ref01_data_dt0_load_result["id"] == todo_ref01_data["id"]



def _todo_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/todo/TodoTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = JsonplaceholderSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["todo01", "todo02", "todo03", "user01", "user02", "user03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "JSONPLACEHOLDER_TEST_TODO_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "JSONPLACEHOLDER_TEST_TODO_ENTID": idmap,
        "JSONPLACEHOLDER_TEST_LIVE": "FALSE",
        "JSONPLACEHOLDER_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("JSONPLACEHOLDER_TEST_TODO_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("JSONPLACEHOLDER_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = JsonplaceholderSDK(helpers.to_map(merged_opts))

    _live = env.get("JSONPLACEHOLDER_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("JSONPLACEHOLDER_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
