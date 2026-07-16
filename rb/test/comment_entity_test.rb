# Comment entity test

require "minitest/autorun"
require "json"
require_relative "../Jsonplaceholder_sdk"
require_relative "runner"

class CommentEntityTest < Minitest::Test
  def test_create_instance
    testsdk = JsonplaceholderSDK.test(nil, nil)
    ent = testsdk.Comment(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "comment" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = JsonplaceholderSDK.test(seed, nil)
    seen = base.Comment(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = JsonplaceholderConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = JsonplaceholderSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Comment(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = comment_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "comment." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_COMMENT_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    comment_ref01_ent = client.Comment(nil)
    comment_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.comment"), "comment_ref01"))
    comment_ref01_data["post_id"] = setup[:idmap]["post01"]

    comment_ref01_data_result = comment_ref01_ent.create(comment_ref01_data, nil)
    comment_ref01_data = Helpers.to_map(comment_ref01_data_result)
    assert !comment_ref01_data.nil?
    assert !comment_ref01_data["id"].nil?

    # LIST
    comment_ref01_match = {
      "post_id" => setup[:idmap]["post01"],
    }

    comment_ref01_list_result = comment_ref01_ent.list(comment_ref01_match, nil)
    assert comment_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(comment_ref01_list_result),
      { "id" => comment_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    comment_ref01_data_up0_up = {
      "id" => comment_ref01_data["id"],
    }

    comment_ref01_markdef_up0_name = "body"
    comment_ref01_markdef_up0_value = "Mark01-comment_ref01_#{setup[:now]}"
    comment_ref01_data_up0_up[comment_ref01_markdef_up0_name] = comment_ref01_markdef_up0_value

    comment_ref01_resdata_up0_result = comment_ref01_ent.update(comment_ref01_data_up0_up, nil)
    comment_ref01_resdata_up0 = Helpers.to_map(comment_ref01_resdata_up0_result)
    assert !comment_ref01_resdata_up0.nil?
    assert_equal comment_ref01_resdata_up0["id"], comment_ref01_data_up0_up["id"]
    assert_equal comment_ref01_resdata_up0[comment_ref01_markdef_up0_name], comment_ref01_markdef_up0_value

    # LOAD
    comment_ref01_match_dt0 = {
      "id" => comment_ref01_data["id"],
    }
    comment_ref01_data_dt0_loaded = comment_ref01_ent.load(comment_ref01_match_dt0, nil)
    comment_ref01_data_dt0_load_result = Helpers.to_map(comment_ref01_data_dt0_loaded)
    assert !comment_ref01_data_dt0_load_result.nil?
    assert_equal comment_ref01_data_dt0_load_result["id"], comment_ref01_data["id"]

    # REMOVE
    comment_ref01_match_rm0 = {
      "id" => comment_ref01_data["id"],
    }
    comment_ref01_ent.remove(comment_ref01_match_rm0, nil)

    # LIST
    comment_ref01_match_rt0 = {
      "post_id" => setup[:idmap]["post01"],
    }

    comment_ref01_list_rt0_result = comment_ref01_ent.list(comment_ref01_match_rt0, nil)
    assert comment_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(comment_ref01_list_rt0_result),
      { "id" => comment_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def comment_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "comment", "CommentTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = JsonplaceholderSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["comment01", "comment02", "comment03", "post01", "post02", "post03"],
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
  entid_env_raw = ENV["JSONPLACEHOLDER_TEST_COMMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "JSONPLACEHOLDER_TEST_COMMENT_ENTID" => idmap,
    "JSONPLACEHOLDER_TEST_LIVE" => "FALSE",
    "JSONPLACEHOLDER_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["JSONPLACEHOLDER_TEST_COMMENT_ENTID"])
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
