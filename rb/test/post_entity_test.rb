# Post entity test

require "minitest/autorun"
require "json"
require_relative "../Jsonplaceholder_sdk"
require_relative "runner"

class PostEntityTest < Minitest::Test
  def test_create_instance
    testsdk = JsonplaceholderSDK.test(nil, nil)
    ent = testsdk.Post(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = post_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "post." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_POST_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    post_ref01_ent = client.Post(nil)
    post_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.post"), "post_ref01"))
    post_ref01_data["user_id"] = setup[:idmap]["user01"]

    post_ref01_data_result = post_ref01_ent.create(post_ref01_data, nil)
    post_ref01_data = Helpers.to_map(post_ref01_data_result)
    assert !post_ref01_data.nil?
    assert !post_ref01_data["id"].nil?

    # LIST
    post_ref01_match = {
      "user_id" => setup[:idmap]["user01"],
    }

    post_ref01_list_result = post_ref01_ent.list(post_ref01_match, nil)
    assert post_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(post_ref01_list_result),
      { "id" => post_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    post_ref01_data_up0_up = {
      "id" => post_ref01_data["id"],
    }

    post_ref01_markdef_up0_name = "body"
    post_ref01_markdef_up0_value = "Mark01-post_ref01_#{setup[:now]}"
    post_ref01_data_up0_up[post_ref01_markdef_up0_name] = post_ref01_markdef_up0_value

    post_ref01_resdata_up0_result = post_ref01_ent.update(post_ref01_data_up0_up, nil)
    post_ref01_resdata_up0 = Helpers.to_map(post_ref01_resdata_up0_result)
    assert !post_ref01_resdata_up0.nil?
    assert_equal post_ref01_resdata_up0["id"], post_ref01_data_up0_up["id"]
    assert_equal post_ref01_resdata_up0[post_ref01_markdef_up0_name], post_ref01_markdef_up0_value

    # LOAD
    post_ref01_match_dt0 = {
      "id" => post_ref01_data["id"],
    }
    post_ref01_data_dt0_loaded = post_ref01_ent.load(post_ref01_match_dt0, nil)
    post_ref01_data_dt0_load_result = Helpers.to_map(post_ref01_data_dt0_loaded)
    assert !post_ref01_data_dt0_load_result.nil?
    assert_equal post_ref01_data_dt0_load_result["id"], post_ref01_data["id"]

    # REMOVE
    post_ref01_match_rm0 = {
      "id" => post_ref01_data["id"],
    }
    post_ref01_ent.remove(post_ref01_match_rm0, nil)

    # LIST
    post_ref01_match_rt0 = {
      "user_id" => setup[:idmap]["user01"],
    }

    post_ref01_list_rt0_result = post_ref01_ent.list(post_ref01_match_rt0, nil)
    assert post_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(post_ref01_list_rt0_result),
      { "id" => post_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def post_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "post", "PostTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = JsonplaceholderSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["post01", "post02", "post03", "user01", "user02", "user03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["JSONPLACEHOLDER_TEST_POST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "JSONPLACEHOLDER_TEST_POST_ENTID" => idmap,
    "JSONPLACEHOLDER_TEST_LIVE" => "FALSE",
    "JSONPLACEHOLDER_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["JSONPLACEHOLDER_TEST_POST_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["JSONPLACEHOLDER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = JsonplaceholderSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["JSONPLACEHOLDER_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["JSONPLACEHOLDER_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
