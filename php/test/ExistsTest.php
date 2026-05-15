<?php
declare(strict_types=1);

// MysqlVisualExplain SDK exists test

require_once __DIR__ . '/../mysqlvisualexplain_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = MysqlVisualExplainSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
