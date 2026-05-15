# Todo entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from jsonplaceholder_sdk import JsonplaceholderSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestTodoEntity:

    def test_should_create_instance(self):
        testsdk = JsonplaceholderSDK.test(None, None)
        ent = testsdk.Todo(None)
        assert ent is not None

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
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set JSONPLACEHOLDER_TEST_TODO_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        todo_ref01_ent = client.Todo(None)
        todo_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.todo"), "todo_ref01"))
        todo_ref01_data["user_id"] = setup["idmap"]["user01"]

        todo_ref01_data_result, err = todo_ref01_ent.create(todo_ref01_data, None)
        assert err is None
        todo_ref01_data = helpers.to_map(todo_ref01_data_result)
        assert todo_ref01_data is not None
        assert todo_ref01_data["id"] is not None

        # LIST
        todo_ref01_match = {
            "user_id": setup["idmap"]["user01"],
        }

        todo_ref01_list_result, err = todo_ref01_ent.list(todo_ref01_match, None)
        assert err is None
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

        todo_ref01_resdata_up0_result, err = todo_ref01_ent.update(todo_ref01_data_up0_up, None)
        assert err is None
        todo_ref01_resdata_up0 = helpers.to_map(todo_ref01_resdata_up0_result)
        assert todo_ref01_resdata_up0 is not None
        assert todo_ref01_resdata_up0["id"] == todo_ref01_data_up0_up["id"]
        assert todo_ref01_resdata_up0[todo_ref01_markdef_up0_name] == todo_ref01_markdef_up0_value

        # LOAD
        todo_ref01_match_dt0 = {
            "id": todo_ref01_data["id"],
        }
        todo_ref01_data_dt0_loaded, err = todo_ref01_ent.load(todo_ref01_match_dt0, None)
        assert err is None
        todo_ref01_data_dt0_load_result = helpers.to_map(todo_ref01_data_dt0_loaded)
        assert todo_ref01_data_dt0_load_result is not None
        assert todo_ref01_data_dt0_load_result["id"] == todo_ref01_data["id"]

        # REMOVE
        todo_ref01_match_rm0 = {
            "id": todo_ref01_data["id"],
        }
        _, err = todo_ref01_ent.remove(todo_ref01_match_rm0, None)
        assert err is None

        # LIST
        todo_ref01_match_rt0 = {
            "user_id": setup["idmap"]["user01"],
        }

        todo_ref01_list_rt0_result, err = todo_ref01_ent.list(todo_ref01_match_rt0, None)
        assert err is None
        assert isinstance(todo_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(todo_ref01_list_rt0_result),
            {"id": todo_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _todo_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/todo/TodoTestData.json")
    with open(entity_data_file, "r") as f:
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

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "JSONPLACEHOLDER_TEST_TODO_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "JSONPLACEHOLDER_TEST_TODO_ENTID": idmap,
        "JSONPLACEHOLDER_TEST_LIVE": "FALSE",
        "JSONPLACEHOLDER_TEST_EXPLAIN": "FALSE",
        "JSONPLACEHOLDER_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("JSONPLACEHOLDER_TEST_TODO_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("JSONPLACEHOLDER_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("JSONPLACEHOLDER_APIKEY"),
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
