<?php
declare(strict_types=1);

// MysqlVisualExplain SDK utility: prepare_body

class MysqlVisualExplainPrepareBody
{
    public static function call(MysqlVisualExplainContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
