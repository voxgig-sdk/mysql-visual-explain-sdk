<?php
declare(strict_types=1);

// MysqlVisualExplain SDK configuration

class MysqlVisualExplainConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "MysqlVisualExplain",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://mysqlexplain.com",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "query_analysi" => [],
                    "system_info" => [],
                ],
            ],
            "entity" => [
        'query_analysi' => [
          'fields' => [
            [
              'name' => 'explain_output',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'mysql_version',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'query',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'recommendation',
              'req' => false,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'visualization',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 4,
            ],
          ],
          'name' => 'query_analysi',
          'op' => [
            'create' => [
              'name' => 'create',
              'points' => [
                [
                  'method' => 'POST',
                  'orig' => '/api/explain',
                  'parts' => [
                    'api',
                    'explain',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'create',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'system_info' => [
          'fields' => [
            [
              'name' => 'version',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'version_comment',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
          ],
          'name' => 'system_info',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'method' => 'GET',
                  'orig' => '/api/version',
                  'parts' => [
                    'api',
                    'version',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return MysqlVisualExplainFeatures::make_feature($name);
    }
}
