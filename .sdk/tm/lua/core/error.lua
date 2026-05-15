-- MysqlVisualExplain SDK error

local MysqlVisualExplainError = {}
MysqlVisualExplainError.__index = MysqlVisualExplainError


function MysqlVisualExplainError.new(code, msg, ctx)
  local self = setmetatable({}, MysqlVisualExplainError)
  self.is_sdk_error = true
  self.sdk = "MysqlVisualExplain"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MysqlVisualExplainError:error()
  return self.msg
end


function MysqlVisualExplainError:__tostring()
  return self.msg
end


return MysqlVisualExplainError
