# MysqlVisualExplain SDK configuration

module MysqlVisualExplainConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "MysqlVisualExplain",
        "slug" => "mysql-visual-explain",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://mysqlexplain.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "query_analysi" => {},
          "system_info" => {},
        },
      },
      "entity" => {
        "query_analysi" => {
          "fields" => [
            {
              "name" => "explainOutput",
              "short" => "Raw EXPLAIN output from MySQL",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "mysqlVersion",
              "short" => "MySQL version for compatibility (e.g., 8.0, 5.7)",
              "type" => "`$STRING`",
            },
            {
              "name" => "query",
              "req" => true,
              "short" => "The SQL query to analyze and visualize",
              "type" => "`$STRING`",
            },
            {
              "name" => "recommendations",
              "short" => "Performance optimization recommendations",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "visualization",
              "short" => "The visual representation data of the query execution plan",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "query_analysi",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/explain",
                  "parts" => [
                    "api",
                    "explain",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "system_info" => {
          "fields" => [
            {
              "name" => "version",
              "short" => "MySQL version string",
              "type" => "`$STRING`",
            },
            {
              "name" => "versionComment",
              "short" => "Additional version information",
              "type" => "`$STRING`",
            },
          ],
          "name" => "system_info",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/version",
                  "parts" => [
                    "api",
                    "version",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    MysqlVisualExplainFeatures.make_feature(name)
  end
end
