<?php
declare(strict_types=1);

// MysqlVisualExplain SDK utility: result_body

class MysqlVisualExplainResultBody
{
    public static function call(MysqlVisualExplainContext $ctx): ?MysqlVisualExplainResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
