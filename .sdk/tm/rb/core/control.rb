# MysqlVisualExplain SDK control

class MysqlVisualExplainControl
  attr_accessor :throw_err, :err, :explain

  def initialize(opts = {})
    @throw_err = opts[:throw_err]
    @err = nil
    @explain = opts[:explain]
  end
end
