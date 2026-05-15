<?php
declare(strict_types=1);

// MysqlVisualExplain SDK utility: feature_add

class MysqlVisualExplainFeatureAdd
{
    public static function call(MysqlVisualExplainContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
