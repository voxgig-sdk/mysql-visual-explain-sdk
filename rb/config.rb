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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "type" => "`$OBJECT`",
            },
            {
              "name" => "mysqlVersion",
              "type" => "`$STRING`",
            },
            {
              "name" => "query",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "recommendations",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "visualization",
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
              "type" => "`$STRING`",
            },
            {
              "name" => "versionComment",
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
