<?php
declare(strict_types=1);

// Comment entity test

require_once __DIR__ . '/../jsonplaceholder_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CommentEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = JsonplaceholderSDK::test(null, null);
        $ent = $testsdk->Comment(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = comment_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "comment." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_COMMENT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $comment_ref01_ent = $client->Comment(null);
        $comment_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.comment"), "comment_ref01"));
        $comment_ref01_data["post_id"] = $setup["idmap"]["post01"];

        $comment_ref01_data_result = $comment_ref01_ent->create($comment_ref01_data, null);
        $comment_ref01_data = Helpers::to_map($comment_ref01_data_result);
        $this->assertNotNull($comment_ref01_data);
        $this->assertNotNull($comment_ref01_data["id"]);

        // LIST
        $comment_ref01_match = [
            "post_id" => $setup["idmap"]["post01"],
        ];

        $comment_ref01_list_result = $comment_ref01_ent->list($comment_ref01_match, null);
        $this->assertIsArray($comment_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($comment_ref01_list_result),
            ["id" => $comment_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $comment_ref01_data_up0_up = [
            "id" => $comment_ref01_data["id"],
        ];

        $comment_ref01_markdef_up0_name = "body";
        $comment_ref01_markdef_up0_value = "Mark01-comment_ref01_" . $setup["now"];
        $comment_ref01_data_up0_up[$comment_ref01_markdef_up0_name] = $comment_ref01_markdef_up0_value;

        $comment_ref01_resdata_up0_result = $comment_ref01_ent->update($comment_ref01_data_up0_up, null);
        $comment_ref01_resdata_up0 = Helpers::to_map($comment_ref01_resdata_up0_result);
        $this->assertNotNull($comment_ref01_resdata_up0);
        $this->assertEquals($comment_ref01_resdata_up0["id"], $comment_ref01_data_up0_up["id"]);
        $this->assertEquals($comment_ref01_resdata_up0[$comment_ref01_markdef_up0_name], $comment_ref01_markdef_up0_value);

        // LOAD
        $comment_ref01_match_dt0 = [
            "id" => $comment_ref01_data["id"],
        ];
        $comment_ref01_data_dt0_loaded = $comment_ref01_ent->load($comment_ref01_match_dt0, null);
        $comment_ref01_data_dt0_load_result = Helpers::to_map($comment_ref01_data_dt0_loaded);
        $this->assertNotNull($comment_ref01_data_dt0_load_result);
        $this->assertEquals($comment_ref01_data_dt0_load_result["id"], $comment_ref01_data["id"]);

        // REMOVE
        $comment_ref01_match_rm0 = [
            "id" => $comment_ref01_data["id"],
        ];
        $comment_ref01_ent->remove($comment_ref01_match_rm0, null);

        // LIST
        $comment_ref01_match_rt0 = [
            "post_id" => $setup["idmap"]["post01"],
        ];

        $comment_ref01_list_rt0_result = $comment_ref01_ent->list($comment_ref01_match_rt0, null);
        $this->assertIsArray($comment_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($comment_ref01_list_rt0_result),
            ["id" => $comment_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function comment_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/comment/CommentTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = JsonplaceholderSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["comment01", "comment02", "comment03", "post01", "post02", "post03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("JSONPLACEHOLDER_TEST_COMMENT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "JSONPLACEHOLDER_TEST_COMMENT_ENTID" => $idmap,
        "JSONPLACEHOLDER_TEST_LIVE" => "FALSE",
        "JSONPLACEHOLDER_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["JSONPLACEHOLDER_TEST_COMMENT_ENTID"]);
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
