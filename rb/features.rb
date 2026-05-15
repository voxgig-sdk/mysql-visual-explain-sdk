# MysqlVisualExplain SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MysqlVisualExplainFeatures
  def self.make_feature(name)
    case name
    when "base"
      MysqlVisualExplainBaseFeature.new
    when "test"
      MysqlVisualExplainTestFeature.new
    else
      MysqlVisualExplainBaseFeature.new
    end
  end
end
