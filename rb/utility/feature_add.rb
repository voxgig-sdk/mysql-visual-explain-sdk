# MysqlVisualExplain SDK utility: feature_add
module MysqlVisualExplainUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
