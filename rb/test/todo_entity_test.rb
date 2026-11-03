# Todo entity test

require "minitest/autorun"
require "json"
require_relative "../Jsonplaceholder_sdk"
require_relative "runner"

class TodoEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = JsonplaceholderSDK.test(nil, nil)
    ent = testsdk.Todo(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "todo" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = JsonplaceholderSDK.test(seed, nil).Todo(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "todo" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = JsonplaceholderSDK.test(seed, nil)
    seen = base.Todo(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = JsonplaceholderConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = JsonplaceholderSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Todo(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < JsonplaceholderBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "todo hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      JsonplaceholderSDK.test(offline, nil).Todo(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    JsonplaceholderSDK.test(offline, nil).Todo(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = JsonplaceholderConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = JsonplaceholderSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.Todo(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    JsonplaceholderSDK.test(nil, nil).Todo(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = JsonplaceholderSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.Todo(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.Todo(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = JsonplaceholderConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = JsonplaceholderSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Todo(nil).list({ "user_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = todo_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "todo." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"todo.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /todos\"}"
      puts "LIVE STEP {\"id\":\"todo.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /todos/{id}\"}"
      puts "LIVE STEP {\"id\":\"todo.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /todos/{id}\"}"
      puts "LIVE STEP {\"id\":\"todo.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "todo") do
        client.Todo(nil).list({"user_id" => 1}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    todo_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.todo")))
    todo_ref01_data = nil
    if todo_ref01_data_raw.length > 0
      todo_ref01_data = Helpers.to_map(todo_ref01_data_raw[0][1])
    end

    # LIST
    todo_ref01_ent = client.Todo(nil)
    todo_ref01_match = {}
    if setup[:live]
      todo_ref01_match["user_id"] = 1
    end

    todo_ref01_list_result = todo_ref01_ent.list(todo_ref01_match, nil)
    assert todo_ref01_list_result.is_a?(Array)

    # LOAD
    todo_ref01_match_dt0 = {
      "id" => todo_ref01_data["id"],
    }
    todo_ref01_data_dt0_loaded = todo_ref01_ent.load(todo_ref01_match_dt0, nil)
    todo_ref01_data_dt0_load_result = Helpers.to_map(todo_ref01_data_dt0_loaded.respond_to?(:data_get) ? todo_ref01_data_dt0_loaded.data_get : todo_ref01_data_dt0_loaded)
    assert !todo_ref01_data_dt0_load_result.nil?
    assert_equal todo_ref01_data_dt0_load_result["id"], todo_ref01_data["id"]

      return
    end

    if setup[:live]
      ["user01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via JSONPLACEHOLDER_TEST_TODO_ENTID")
        end
      end
    end
    client = setup[:client]

    # CREATE
    todo_ref01_ent = client.Todo(nil)
    todo_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.todo"), "todo_ref01"))
    todo_ref01_data["user_id"] = setup[:idmap]["user01"]

    todo_ref01_data_result = todo_ref01_ent.create(todo_ref01_data, nil)
    todo_ref01_data = Helpers.to_map(todo_ref01_data_result.respond_to?(:data_get) ? todo_ref01_data_result.data_get : todo_ref01_data_result)
    assert !todo_ref01_data.nil?
    assert !todo_ref01_data["id"].nil?

    # LIST
    todo_ref01_match = {}
    if setup[:live]
      todo_ref01_match["user_id"] = 1
    end

    todo_ref01_list_result = todo_ref01_ent.list(todo_ref01_match, nil)
    assert todo_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(todo_ref01_list_result),
      { "id" => todo_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    todo_ref01_data_up0_up = {
      "id" => todo_ref01_data["id"],
    }

    todo_ref01_markdef_up0_name = "title"
    todo_ref01_markdef_up0_value = "Mark01-todo_ref01_#{setup[:now]}"
    todo_ref01_data_up0_up[todo_ref01_markdef_up0_name] = todo_ref01_markdef_up0_value

    todo_ref01_resdata_up0_result = todo_ref01_ent.update(todo_ref01_data_up0_up, nil)
    todo_ref01_resdata_up0 = Helpers.to_map(todo_ref01_resdata_up0_result.respond_to?(:data_get) ? todo_ref01_resdata_up0_result.data_get : todo_ref01_resdata_up0_result)
    assert !todo_ref01_resdata_up0.nil?
    assert_equal todo_ref01_resdata_up0["id"], todo_ref01_data_up0_up["id"]
    assert_equal todo_ref01_resdata_up0[todo_ref01_markdef_up0_name], todo_ref01_markdef_up0_value

    # LOAD
    todo_ref01_match_dt0 = {
      "id" => todo_ref01_data["id"],
    }
    todo_ref01_data_dt0_loaded = todo_ref01_ent.load(todo_ref01_match_dt0, nil)
    todo_ref01_data_dt0_load_result = Helpers.to_map(todo_ref01_data_dt0_loaded.respond_to?(:data_get) ? todo_ref01_data_dt0_loaded.data_get : todo_ref01_data_dt0_loaded)
    assert !todo_ref01_data_dt0_load_result.nil?
    assert_equal todo_ref01_data_dt0_load_result["id"], todo_ref01_data["id"]

    # REMOVE
    todo_ref01_match_rm0 = {
      "id" => todo_ref01_data["id"],
    }
    todo_ref01_ent.remove(todo_ref01_match_rm0, nil)

    # LIST
    todo_ref01_match_rt0 = {}
    if setup[:live]
      todo_ref01_match_rt0["user_id"] = 1
    end

    todo_ref01_list_rt0_result = todo_ref01_ent.list(todo_ref01_match_rt0, nil)
    assert todo_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(todo_ref01_list_rt0_result),
      { "id" => todo_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def todo_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "todo", "TodoTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = JsonplaceholderSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["todo01", "todo02", "todo03", "user01", "user02", "user03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["JSONPLACEHOLDER_TEST_TODO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "JSONPLACEHOLDER_TEST_TODO_ENTID" => idmap,
    "JSONPLACEHOLDER_TEST_LIVE" => "FALSE",
    "JSONPLACEHOLDER_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["JSONPLACEHOLDER_TEST_TODO_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["JSONPLACEHOLDER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
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
