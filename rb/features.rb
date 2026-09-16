# MysqlVisualExplain SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MysqlVisualExplainFeatures
  def self.make_feature(name)
    case name
    when "base"
      MysqlVisualExplainBaseFeature.new
    when "ratelimit"
      MysqlVisualExplainRatelimitFeature.new
    when "retry"
      MysqlVisualExplainRetryFeature.new
    when "test"
      MysqlVisualExplainTestFeature.new
    when "timeout"
      MysqlVisualExplainTimeoutFeature.new
    else
      MysqlVisualExplainBaseFeature.new
    end
  end
end
