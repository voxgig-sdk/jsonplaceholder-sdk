# Photo entity test

require "minitest/autorun"
require "json"
require_relative "../Jsonplaceholder_sdk"
require_relative "runner"

class PhotoEntityTest < Minitest::Test
  def test_create_instance
    testsdk = JsonplaceholderSDK.test(nil, nil)
    ent = testsdk.Photo(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "photo" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = JsonplaceholderSDK.test(seed, nil)
    seen = base.Photo(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = JsonplaceholderConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = JsonplaceholderSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Photo(nil).stream("list", nil, nil).each do |item|
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
    setup = photo_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "photo." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_PHOTO_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    photo_ref01_ent = client.Photo(nil)
    photo_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.photo"), "photo_ref01"))
    photo_ref01_data["album_id"] = setup[:idmap]["album01"]

    photo_ref01_data_result = photo_ref01_ent.create(photo_ref01_data, nil)
    photo_ref01_data = Helpers.to_map(photo_ref01_data_result.respond_to?(:data_get) ? photo_ref01_data_result.data_get : photo_ref01_data_result)
    assert !photo_ref01_data.nil?
    assert !photo_ref01_data["id"].nil?

    # LIST
    photo_ref01_match = {}

    photo_ref01_list_result = photo_ref01_ent.list(photo_ref01_match, nil)
    assert photo_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(photo_ref01_list_result),
      { "id" => photo_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    photo_ref01_data_up0_up = {
      "id" => photo_ref01_data["id"],
    }

    photo_ref01_markdef_up0_name = "thumbnailUrl"
    photo_ref01_markdef_up0_value = "Mark01-photo_ref01_#{setup[:now]}"
    photo_ref01_data_up0_up[photo_ref01_markdef_up0_name] = photo_ref01_markdef_up0_value

    photo_ref01_resdata_up0_result = photo_ref01_ent.update(photo_ref01_data_up0_up, nil)
    photo_ref01_resdata_up0 = Helpers.to_map(photo_ref01_resdata_up0_result.respond_to?(:data_get) ? photo_ref01_resdata_up0_result.data_get : photo_ref01_resdata_up0_result)
    assert !photo_ref01_resdata_up0.nil?
    assert_equal photo_ref01_resdata_up0["id"], photo_ref01_data_up0_up["id"]
    assert_equal photo_ref01_resdata_up0[photo_ref01_markdef_up0_name], photo_ref01_markdef_up0_value

    # LOAD
    photo_ref01_match_dt0 = {
      "id" => photo_ref01_data["id"],
    }
    photo_ref01_data_dt0_loaded = photo_ref01_ent.load(photo_ref01_match_dt0, nil)
    photo_ref01_data_dt0_load_result = Helpers.to_map(photo_ref01_data_dt0_loaded.respond_to?(:data_get) ? photo_ref01_data_dt0_loaded.data_get : photo_ref01_data_dt0_loaded)
    assert !photo_ref01_data_dt0_load_result.nil?
    assert_equal photo_ref01_data_dt0_load_result["id"], photo_ref01_data["id"]

    # REMOVE
    photo_ref01_match_rm0 = {
      "id" => photo_ref01_data["id"],
    }
    photo_ref01_ent.remove(photo_ref01_match_rm0, nil)

    # LIST
    photo_ref01_match_rt0 = {}

    photo_ref01_list_rt0_result = photo_ref01_ent.list(photo_ref01_match_rt0, nil)
    assert photo_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(photo_ref01_list_rt0_result),
      { "id" => photo_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def photo_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "photo", "PhotoTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = JsonplaceholderSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["photo01", "photo02", "photo03", "album01", "album02", "album03"],
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
  entid_env_raw = ENV["JSONPLACEHOLDER_TEST_PHOTO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "JSONPLACEHOLDER_TEST_PHOTO_ENTID" => idmap,
    "JSONPLACEHOLDER_TEST_LIVE" => "FALSE",
    "JSONPLACEHOLDER_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["JSONPLACEHOLDER_TEST_PHOTO_ENTID"])
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
