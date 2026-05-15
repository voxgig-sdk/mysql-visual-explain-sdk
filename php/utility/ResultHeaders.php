<?php
declare(strict_types=1);

// MysqlVisualExplain SDK utility: result_headers

class MysqlVisualExplainResultHeaders
{
    public static function call(MysqlVisualExplainContext $ctx): ?MysqlVisualExplainResult
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
