# MysqlVisualExplain SDK utility: prepare_body
require_relative 'media'
module MysqlVisualExplainUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return MysqlVisualExplainUtilities.raw_body(ctx.reqdata) if MysqlVisualExplainUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
