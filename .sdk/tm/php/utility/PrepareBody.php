<?php
declare(strict_types=1);

// Jsonplaceholder SDK utility: prepare_body

class JsonplaceholderPrepareBody
{
    public static function call(JsonplaceholderContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
