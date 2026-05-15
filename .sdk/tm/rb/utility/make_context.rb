# MysqlVisualExplain SDK utility: make_context
require_relative '../core/context'
module MysqlVisualExplainUtilities
  MakeContext = ->(ctxmap, basectx) {
    MysqlVisualExplainContext.new(ctxmap, basectx)
  }
end
