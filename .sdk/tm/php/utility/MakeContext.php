<?php
declare(strict_types=1);

// Jsonplaceholder SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class JsonplaceholderMakeContext
{
    public static function call(array $ctxmap, ?JsonplaceholderContext $basectx): JsonplaceholderContext
    {
        return new JsonplaceholderContext($ctxmap, $basectx);
    }
}
