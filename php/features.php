<?php
declare(strict_types=1);

// MysqlVisualExplain SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class MysqlVisualExplainFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new MysqlVisualExplainBaseFeature();
            case "test":
                return new MysqlVisualExplainTestFeature();
            default:
                return new MysqlVisualExplainBaseFeature();
        }
    }
}
