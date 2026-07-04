<?php
declare(strict_types=1);

// Album entity test

require_once __DIR__ . '/../jsonplaceholder_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AlbumEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = JsonplaceholderSDK::test(null, null);
        $ent = $testsdk->Album(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = album_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "album." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_ALBUM_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $album_ref01_ent = $client->Album(null);
        $album_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.album"), "album_ref01"));
        $album_ref01_data["user_id"] = $setup["idmap"]["user01"];

        $album_ref01_data_result = $album_ref01_ent->create($album_ref01_data, null);
        $album_ref01_data = Helpers::to_map($album_ref01_data_result);
        $this->assertNotNull($album_ref01_data);
        $this->assertNotNull($album_ref01_data["id"]);

        // LIST
        $album_ref01_match = [
            "user_id" => $setup["idmap"]["user01"],
        ];

        $album_ref01_list_result = $album_ref01_ent->list($album_ref01_match, null);
        $this->assertIsArray($album_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($album_ref01_list_result),
            ["id" => $album_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $album_ref01_data_up0_up = [
            "id" => $album_ref01_data["id"],
        ];

        $album_ref01_markdef_up0_name = "title";
        $album_ref01_markdef_up0_value = "Mark01-album_ref01_" . $setup["now"];
        $album_ref01_data_up0_up[$album_ref01_markdef_up0_name] = $album_ref01_markdef_up0_value;

        $album_ref01_resdata_up0_result = $album_ref01_ent->update($album_ref01_data_up0_up, null);
        $album_ref01_resdata_up0 = Helpers::to_map($album_ref01_resdata_up0_result);
        $this->assertNotNull($album_ref01_resdata_up0);
        $this->assertEquals($album_ref01_resdata_up0["id"], $album_ref01_data_up0_up["id"]);
        $this->assertEquals($album_ref01_resdata_up0[$album_ref01_markdef_up0_name], $album_ref01_markdef_up0_value);

        // LOAD
        $album_ref01_match_dt0 = [
            "id" => $album_ref01_data["id"],
        ];
        $album_ref01_data_dt0_loaded = $album_ref01_ent->load($album_ref01_match_dt0, null);
        $album_ref01_data_dt0_load_result = Helpers::to_map($album_ref01_data_dt0_loaded);
        $this->assertNotNull($album_ref01_data_dt0_load_result);
        $this->assertEquals($album_ref01_data_dt0_load_result["id"], $album_ref01_data["id"]);

        // REMOVE
        $album_ref01_match_rm0 = [
            "id" => $album_ref01_data["id"],
        ];
        $album_ref01_ent->remove($album_ref01_match_rm0, null);

        // LIST
        $album_ref01_match_rt0 = [
            "user_id" => $setup["idmap"]["user01"],
        ];

        $album_ref01_list_rt0_result = $album_ref01_ent->list($album_ref01_match_rt0, null);
        $this->assertIsArray($album_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($album_ref01_list_rt0_result),
            ["id" => $album_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function album_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/album/AlbumTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = JsonplaceholderSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["album01", "album02", "album03", "user01", "user02", "user03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("JSONPLACEHOLDER_TEST_ALBUM_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "JSONPLACEHOLDER_TEST_ALBUM_ENTID" => $idmap,
        "JSONPLACEHOLDER_TEST_LIVE" => "FALSE",
        "JSONPLACEHOLDER_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["JSONPLACEHOLDER_TEST_ALBUM_ENTID"]);
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
