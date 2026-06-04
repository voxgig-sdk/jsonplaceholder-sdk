-- Comment entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("jsonplaceholder_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("CommentEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Comment(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = comment_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "comment." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_COMMENT_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local comment_ref01_ent = client:Comment(nil)
    local comment_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.comment"), "comment_ref01"))
    comment_ref01_data["post_id"] = setup.idmap["post01"]

    local comment_ref01_data_result, err = comment_ref01_ent:create(comment_ref01_data, nil)
    assert.is_nil(err)
    comment_ref01_data = helpers.to_map(comment_ref01_data_result)
    assert.is_not_nil(comment_ref01_data)
    assert.is_not_nil(comment_ref01_data["id"])

    -- LIST
    local comment_ref01_match = {
      ["post_id"] = setup.idmap["post01"],
    }

    local comment_ref01_list_result, err = comment_ref01_ent:list(comment_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(comment_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(comment_ref01_list_result),
      { id = comment_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- UPDATE
    local comment_ref01_data_up0_up = {
      id = comment_ref01_data["id"],
    }

    local comment_ref01_markdef_up0_name = "body"
    local comment_ref01_markdef_up0_value = "Mark01-comment_ref01_" .. tostring(setup.now)
    comment_ref01_data_up0_up[comment_ref01_markdef_up0_name] = comment_ref01_markdef_up0_value

    local comment_ref01_resdata_up0_result, err = comment_ref01_ent:update(comment_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local comment_ref01_resdata_up0 = helpers.to_map(comment_ref01_resdata_up0_result)
    assert.is_not_nil(comment_ref01_resdata_up0)
    assert.are.equal(comment_ref01_resdata_up0["id"], comment_ref01_data_up0_up["id"])
    assert.are.equal(comment_ref01_resdata_up0[comment_ref01_markdef_up0_name], comment_ref01_markdef_up0_value)

    -- LOAD
    local comment_ref01_match_dt0 = {
      id = comment_ref01_data["id"],
    }
    local comment_ref01_data_dt0_loaded, err = comment_ref01_ent:load(comment_ref01_match_dt0, nil)
    assert.is_nil(err)
    local comment_ref01_data_dt0_load_result = helpers.to_map(comment_ref01_data_dt0_loaded)
    assert.is_not_nil(comment_ref01_data_dt0_load_result)
    assert.are.equal(comment_ref01_data_dt0_load_result["id"], comment_ref01_data["id"])

    -- REMOVE
    local comment_ref01_match_rm0 = {
      id = comment_ref01_data["id"],
    }
    local _, err = comment_ref01_ent:remove(comment_ref01_match_rm0, nil)
    assert.is_nil(err)

    -- LIST
    local comment_ref01_match_rt0 = {
      ["post_id"] = setup.idmap["post01"],
    }

    local comment_ref01_list_rt0_result, err = comment_ref01_ent:list(comment_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(comment_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(comment_ref01_list_rt0_result),
      { id = comment_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function comment_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/comment/CommentTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read comment test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "comment01", "comment02", "comment03", "post01", "post02", "post03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("JSONPLACEHOLDER_TEST_COMMENT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["JSONPLACEHOLDER_TEST_COMMENT_ENTID"] = idmap,
    ["JSONPLACEHOLDER_TEST_LIVE"] = "FALSE",
    ["JSONPLACEHOLDER_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["JSONPLACEHOLDER_TEST_COMMENT_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["JSONPLACEHOLDER_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["JSONPLACEHOLDER_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["JSONPLACEHOLDER_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
