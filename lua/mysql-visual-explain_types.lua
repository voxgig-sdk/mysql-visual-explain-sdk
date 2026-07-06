-- Typed models for the MysqlVisualExplain SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class QueryAnalysi
---@field explain_output? table
---@field mysql_version? string
---@field query string
---@field recommendation? table
---@field visualization? table

---@class QueryAnalysiCreateData
---@field explain_output? table
---@field mysql_version? string
---@field query string
---@field recommendation? table
---@field visualization? table

---@class SystemInfo
---@field version? string
---@field version_comment? string

---@class SystemInfoLoadMatch
---@field version? string
---@field version_comment? string

local M = {}

return M
