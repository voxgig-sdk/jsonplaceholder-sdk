<?php
declare(strict_types=1);

// Photo entity test

require_once __DIR__ . '/../jsonplaceholder_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PhotoEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = JsonplaceholderSDK::test(null, null);
        $ent = $testsdk->Photo(null);
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
                "photo" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = JsonplaceholderSDK::test($seed, null);
        $seen = iterator_to_array($base->Photo(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = JsonplaceholderConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = JsonplaceholderSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Photo(null)->stream("list", null, null) as $item) {
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
        $setup = photo_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "photo." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_PHOTO_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $photo_ref01_ent = $client->Photo(null);
        $photo_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.photo"), "photo_ref01"));
        $photo_ref01_data["album_id"] = $setup["idmap"]["album01"];

        $photo_ref01_data_result = $photo_ref01_ent->create($photo_ref01_data, null);
        $photo_ref01_data = Helpers::to_map($photo_ref01_data_result);
        $this->assertNotNull($photo_ref01_data);
        $this->assertNotNull($photo_ref01_data["id"]);

        // LIST
        $photo_ref01_match = [];

        $photo_ref01_list_result = $photo_ref01_ent->list($photo_ref01_match, null);
        $this->assertIsArray($photo_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($photo_ref01_list_result),
            ["id" => $photo_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $photo_ref01_data_up0_up = [
            "id" => $photo_ref01_data["id"],
        ];

        $photo_ref01_markdef_up0_name = "thumbnail_url";
        $photo_ref01_markdef_up0_value = "Mark01-photo_ref01_" . $setup["now"];
        $photo_ref01_data_up0_up[$photo_ref01_markdef_up0_name] = $photo_ref01_markdef_up0_value;

        $photo_ref01_resdata_up0_result = $photo_ref01_ent->update($photo_ref01_data_up0_up, null);
        $photo_ref01_resdata_up0 = Helpers::to_map($photo_ref01_resdata_up0_result);
        $this->assertNotNull($photo_ref01_resdata_up0);
        $this->assertEquals($photo_ref01_resdata_up0["id"], $photo_ref01_data_up0_up["id"]);
        $this->assertEquals($photo_ref01_resdata_up0[$photo_ref01_markdef_up0_name], $photo_ref01_markdef_up0_value);

        // LOAD
        $photo_ref01_match_dt0 = [
            "id" => $photo_ref01_data["id"],
        ];
        $photo_ref01_data_dt0_loaded = $photo_ref01_ent->load($photo_ref01_match_dt0, null);
        $photo_ref01_data_dt0_load_result = Helpers::to_map($photo_ref01_data_dt0_loaded);
        $this->assertNotNull($photo_ref01_data_dt0_load_result);
        $this->assertEquals($photo_ref01_data_dt0_load_result["id"], $photo_ref01_data["id"]);

        // REMOVE
        $photo_ref01_match_rm0 = [
            "id" => $photo_ref01_data["id"],
        ];
        $photo_ref01_ent->remove($photo_ref01_match_rm0, null);

        // LIST
        $photo_ref01_match_rt0 = [];

        $photo_ref01_list_rt0_result = $photo_ref01_ent->list($photo_ref01_match_rt0, null);
        $this->assertIsArray($photo_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($photo_ref01_list_rt0_result),
            ["id" => $photo_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function photo_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/photo/PhotoTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = JsonplaceholderSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["photo01", "photo02", "photo03", "album01", "album02", "album03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("JSONPLACEHOLDER_TEST_PHOTO_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "JSONPLACEHOLDER_TEST_PHOTO_ENTID" => $idmap,
        "JSONPLACEHOLDER_TEST_LIVE" => "FALSE",
        "JSONPLACEHOLDER_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["JSONPLACEHOLDER_TEST_PHOTO_ENTID"]);
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
