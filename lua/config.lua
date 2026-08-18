-- MysqlVisualExplain SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "MysqlVisualExplain",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "mysqlVersion",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "query",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "recommendations",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "visualization",
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
                ["parts"] = {
                  "api",
                  "explain",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "versionComment",
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
                ["parts"] = {
                  "api",
                  "version",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
