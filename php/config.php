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
              'active' => true,
              'name' => 'explain_output',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'mysql_version',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'query',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'recommendation',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'visualization',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 4,
            ],
          ],
          'name' => 'query_analysi',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'method' => 'POST',
                  'orig' => '/api/explain',
                  'parts' => [
                    'api',
                    'explain',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
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
              'active' => true,
              'name' => 'version',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'version_comment',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
          ],
          'name' => 'system_info',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'method' => 'GET',
                  'orig' => '/api/version',
                  'parts' => [
                    'api',
                    'version',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
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
