<?php
declare(strict_types=1);

// Jsonplaceholder SDK utility: feature_add

class JsonplaceholderFeatureAdd
{
    public static function call(JsonplaceholderContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
