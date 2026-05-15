<?php
declare(strict_types=1);

// MysqlVisualExplain SDK utility: prepare_headers

class MysqlVisualExplainPrepareHeaders
{
    public static function call(MysqlVisualExplainContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
