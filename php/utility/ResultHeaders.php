<?php
declare(strict_types=1);

// Jsonplaceholder SDK utility: result_headers

class JsonplaceholderResultHeaders
{
    public static function call(JsonplaceholderContext $ctx): ?JsonplaceholderResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
