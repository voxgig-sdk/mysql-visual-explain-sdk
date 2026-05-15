package = "voxgig-sdk-mysql-visual-explain"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/mysql-visual-explain-sdk.git"
}
description = {
  summary = "MysqlVisualExplain SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["mysql-visual-explain_sdk"] = "mysql-visual-explain_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
