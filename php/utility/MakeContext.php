<?php
declare(strict_types=1);

// MysqlVisualExplain SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MysqlVisualExplainMakeContext
{
    public static function call(array $ctxmap, ?MysqlVisualExplainContext $basectx): MysqlVisualExplainContext
    {
        return new MysqlVisualExplainContext($ctxmap, $basectx);
    }
}
