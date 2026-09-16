<?php
declare(strict_types=1);

// MysqlVisualExplain SDK configuration

class MysqlVisualExplainConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "MysqlVisualExplain",
                "slug" => "mysql-visual-explain",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'name' => 'explainOutput',
              'short' => 'Raw EXPLAIN output from MySQL',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'mysqlVersion',
              'short' => 'MySQL version for compatibility (e.g., 8.0, 5.7)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'query',
              'req' => true,
              'short' => 'The SQL query to analyze and visualize',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'recommendations',
              'short' => 'Performance optimization recommendations',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'visualization',
              'short' => 'The visual representation data of the query execution plan',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'query_analysi',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/explain',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'explain',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'explain',
                  ],
                ],
              ],
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
              'short' => 'MySQL version string',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'versionComment',
              'short' => 'Additional version information',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'system_info',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/version',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'version',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'version',
                  ],
                ],
              ],
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
