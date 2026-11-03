<?php
declare(strict_types=1);

// Todo entity test

require_once __DIR__ . '/../jsonplaceholder_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class TodoEntityTestFailHook extends JsonplaceholderBaseFeature
{
    public int $unexpected = 0;

    public function __construct()
    {
        parent::__construct();
        $this->name = 'failhook';
    }

    public function init(JsonplaceholderContext $ctx, array $options): void
    {
    }

    public function PreSpec(JsonplaceholderContext $ctx): void
    {
        throw new \RuntimeException('todo hook failed');
    }

    public function PreUnexpected(JsonplaceholderContext $ctx): void
    {
        $this->unexpected++;
    }
}

class TodoEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = JsonplaceholderSDK::test(null, null);
        $ent = $testsdk->Todo(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "todo" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = JsonplaceholderSDK::test($seed, null);
        $seen = iterator_to_array($base->Todo(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = JsonplaceholderConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = JsonplaceholderSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Todo(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_stream_error(): void
    {
        $offline = ["net" => ["offline" => true]];
        $streamerr = null;
        try {
            iterator_to_array(JsonplaceholderSDK::test($offline, null)->Todo(null)
                ->stream("list", null, null), false);
        } catch (\Throwable $e) {
            $streamerr = $e;
        }
        $this->assertNotNull($streamerr, 'the stream should raise the transport failure');
        $this->assertStringContainsString('offline', $streamerr->getMessage());

        iterator_to_array(JsonplaceholderSDK::test($offline, null)->Todo(null)
            ->stream("list", null, ["ctrl" => ["throw" => false]]), false);

        $cfg = JsonplaceholderConfig::shared_config();
        if (isset($cfg["feature"]["rbac"])) {
            $denied = JsonplaceholderSDK::test(null, ["feature" => ["rbac" => ["active" => true, "deny" => true]]]);
            $denyerr = null;
            try {
                iterator_to_array($denied->Todo(null)->stream("list", null, null), false);
            } catch (\Throwable $e) {
                $denyerr = $e;
            }
            $this->assertSame('rbac_denied', $denyerr->sdk_code ?? null);
        }
    }

    public function test_stream_ctrl(): void
    {
        $ctrl = ["explain" => []];
        iterator_to_array(JsonplaceholderSDK::test(null, null)->Todo(null)
            ->stream("list", null, ["ctrl" => $ctrl]), false);
        $this->assertSame(["explain"], array_keys($ctrl));
    }

    public function test_unexpected(): void
    {
        $hook = new TodoEntityTestFailHook();
        $client = new JsonplaceholderSDK(["feature" => ["test" => ["active" => true]], "extend" => [$hook]]);

        $err = null;
        try {
            $client->Todo(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertNotNull($err, 'the throwing hook should fail the operation');
        $this->assertStringContainsString('hook failed', $err->getMessage());
        $this->assertGreaterThan(0, $hook->unexpected, 'PreUnexpected did not fire');

        $fired = $hook->unexpected;
        $this->assertNull($client->Todo(null)->list(null, ["throw" => false]));
        $this->assertGreaterThan($fired, $hook->unexpected, 'PreUnexpected did not fire');
    }

    public function test_cost_commits_a_throwing_transport(): void
    {
        $cfg = JsonplaceholderConfig::shared_config();
        if (!isset($cfg["feature"]["cost"])) {
            $this->markTestSkipped('feature not present in this SDK: cost');
        }
        $client = new JsonplaceholderSDK([
            "test" => ["active" => true],
            "feature" => ["cost" => ["active" => true, "unit" => 1]],
            "utility" => ["fetcher" => function ($ctx, $url, $fetchdef) {
                throw new \RuntimeException('todo transport failed');
            }],
        ]);

        $err = null;
        try {
            $client->Todo(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertInstanceOf(JsonplaceholderError::class, $err);
        $this->assertStringContainsString('transport failed', $err->getMessage());

        $client->Todo(null)->list(null, ["throw" => false]);
        $this->assertSame(2, $client->_cost["total"]["calls"]);
        $this->assertSame(2, $client->_cost["total"]["attempts"]);
    }

    public function test_validate(): void
    {
        $cfg = JsonplaceholderConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = JsonplaceholderSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Todo(null)->list(["user_id" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = todo_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "todo." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"todo.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /todos"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"todo.update.2","state":"excluded","attempted":false,"reason":"GET-only live run: needs PUT /todos/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"todo.remove.4","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /todos/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"todo.list.5","state":"excluded","attempted":false,"reason":"GET-only live run: checks a removal this run does not make"}' . "\n");
        $client = $setup["client"];
        if (!empty($setup["live"])) {
            Runner::live_existing($setup, self::LIVE_STRICT, "todo",
                fn() => $client->Todo(null)->list(["user_id" => 1], null));
        }

        // Bootstrap entity data from existing test data.
        $todo_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.todo")));
        $todo_ref01_data = null;
        if (count($todo_ref01_data_raw) > 0) {
            $todo_ref01_data = Helpers::to_map($todo_ref01_data_raw[0][1]);
        }

        // LIST
        $todo_ref01_ent = $client->Todo(null);
        $todo_ref01_match = [];
        if (!empty($setup["live"])) {
            $todo_ref01_match["user_id"] = 1;
        }

        $todo_ref01_list_result = $todo_ref01_ent->list($todo_ref01_match, null);
        $this->assertIsArray($todo_ref01_list_result);

        // LOAD
        $todo_ref01_match_dt0 = [
            "id" => $todo_ref01_data["id"],
        ];
        $todo_ref01_data_dt0_loaded = $todo_ref01_ent->load($todo_ref01_match_dt0, null);
        $todo_ref01_data_dt0_load_result = Helpers::to_map(is_object($todo_ref01_data_dt0_loaded) && method_exists($todo_ref01_data_dt0_loaded, 'data_get') ? $todo_ref01_data_dt0_loaded->data_get() : $todo_ref01_data_dt0_loaded);
        $this->assertNotNull($todo_ref01_data_dt0_load_result);
        $this->assertEquals($todo_ref01_data_dt0_load_result["id"], $todo_ref01_data["id"]);

            return;
        }

        if (!empty($setup["live"])) {
            foreach (["user01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via JSONPLACEHOLDER_TEST_TODO_ENTID");
                }
            }
        }
        $client = $setup["client"];

        // CREATE
        $todo_ref01_ent = $client->Todo(null);
        $todo_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.todo"), "todo_ref01"));
        $todo_ref01_data["user_id"] = $setup["idmap"]["user01"];

        $todo_ref01_data_result = $todo_ref01_ent->create($todo_ref01_data, null);
        $todo_ref01_data = Helpers::to_map(is_object($todo_ref01_data_result) && method_exists($todo_ref01_data_result, 'data_get') ? $todo_ref01_data_result->data_get() : $todo_ref01_data_result);
        $this->assertNotNull($todo_ref01_data);
        $this->assertNotNull($todo_ref01_data["id"]);

        // LIST
        $todo_ref01_match = [];
        if (!empty($setup["live"])) {
            $todo_ref01_match["user_id"] = 1;
        }

        $todo_ref01_list_result = $todo_ref01_ent->list($todo_ref01_match, null);
        $this->assertIsArray($todo_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($todo_ref01_list_result),
            ["id" => $todo_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $todo_ref01_data_up0_up = [
            "id" => $todo_ref01_data["id"],
        ];

        $todo_ref01_markdef_up0_name = "title";
        $todo_ref01_markdef_up0_value = "Mark01-todo_ref01_" . $setup["now"];
        $todo_ref01_data_up0_up[$todo_ref01_markdef_up0_name] = $todo_ref01_markdef_up0_value;

        $todo_ref01_resdata_up0_result = $todo_ref01_ent->update($todo_ref01_data_up0_up, null);
        $todo_ref01_resdata_up0 = Helpers::to_map(is_object($todo_ref01_resdata_up0_result) && method_exists($todo_ref01_resdata_up0_result, 'data_get') ? $todo_ref01_resdata_up0_result->data_get() : $todo_ref01_resdata_up0_result);
        $this->assertNotNull($todo_ref01_resdata_up0);
        $this->assertEquals($todo_ref01_resdata_up0["id"], $todo_ref01_data_up0_up["id"]);
        $this->assertEquals($todo_ref01_resdata_up0[$todo_ref01_markdef_up0_name], $todo_ref01_markdef_up0_value);

        // LOAD
        $todo_ref01_match_dt0 = [
            "id" => $todo_ref01_data["id"],
        ];
        $todo_ref01_data_dt0_loaded = $todo_ref01_ent->load($todo_ref01_match_dt0, null);
        $todo_ref01_data_dt0_load_result = Helpers::to_map(is_object($todo_ref01_data_dt0_loaded) && method_exists($todo_ref01_data_dt0_loaded, 'data_get') ? $todo_ref01_data_dt0_loaded->data_get() : $todo_ref01_data_dt0_loaded);
        $this->assertNotNull($todo_ref01_data_dt0_load_result);
        $this->assertEquals($todo_ref01_data_dt0_load_result["id"], $todo_ref01_data["id"]);

        // REMOVE
        $todo_ref01_match_rm0 = [
            "id" => $todo_ref01_data["id"],
        ];
        $todo_ref01_ent->remove($todo_ref01_match_rm0, null);

        // LIST
        $todo_ref01_match_rt0 = [];
        if (!empty($setup["live"])) {
            $todo_ref01_match_rt0["user_id"] = 1;
        }

        $todo_ref01_list_rt0_result = $todo_ref01_ent->list($todo_ref01_match_rt0, null);
        $this->assertIsArray($todo_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($todo_ref01_list_rt0_result),
            ["id" => $todo_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function todo_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/todo/TodoTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = JsonplaceholderSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["todo01", "todo02", "todo03", "user01", "user02", "user03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("JSONPLACEHOLDER_TEST_TODO_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "JSONPLACEHOLDER_TEST_TODO_ENTID" => $idmap,
        "JSONPLACEHOLDER_TEST_LIVE" => "FALSE",
        "JSONPLACEHOLDER_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["JSONPLACEHOLDER_TEST_TODO_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["JSONPLACEHOLDER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new JsonplaceholderSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["JSONPLACEHOLDER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["JSONPLACEHOLDER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
