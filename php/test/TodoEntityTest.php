<?php
declare(strict_types=1);

// Todo entity test

require_once __DIR__ . '/../jsonplaceholder_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class TodoEntityTest extends TestCase
{
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
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_TODO_ENTID JSON to run live");
            return;
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
        $todo_ref01_match = [
            "user_id" => $setup["idmap"]["user01"],
        ];

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
        $todo_ref01_match_rt0 = [
            "user_id" => $setup["idmap"]["user01"],
        ];

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

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
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
            [
            ],
            $extra ?? [],
        ]);
        $client = new JsonplaceholderSDK(Helpers::to_map($merged_opts));
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
