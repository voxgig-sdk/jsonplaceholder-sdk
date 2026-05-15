<?php
declare(strict_types=1);

// Jsonplaceholder SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class JsonplaceholderFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new JsonplaceholderBaseFeature();
            case "test":
                return new JsonplaceholderTestFeature();
            default:
                return new JsonplaceholderBaseFeature();
        }
    }
}
