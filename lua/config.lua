-- MysqlVisualExplain SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "MysqlVisualExplain",
      slug = "mysql-visual-explain",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://mysqlexplain.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["query_analysi"] = {},
        ["system_info"] = {},
      },
    },
    entity = {
      ["query_analysi"] = {
        ["fields"] = {
          {
            ["name"] = "explainOutput",
            ["short"] = "Raw EXPLAIN output from MySQL",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "mysqlVersion",
            ["short"] = "MySQL version for compatibility (e.g., 8.0, 5.7)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "query",
            ["req"] = true,
            ["short"] = "The SQL query to analyze and visualize",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "recommendations",
            ["short"] = "Performance optimization recommendations",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "visualization",
            ["short"] = "The visual representation data of the query execution plan",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "query_analysi",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/explain",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "explain",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "explain",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["system_info"] = {
        ["fields"] = {
          {
            ["name"] = "version",
            ["short"] = "MySQL version string",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "versionComment",
            ["short"] = "Additional version information",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "system_info",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/version",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "version",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "version",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
