# MysqlVisualExplain SDK feature factory

from mysqlvisualexplain_sdk.feature.base_feature import MysqlVisualExplainBaseFeature
from mysqlvisualexplain_sdk.feature.test_feature import MysqlVisualExplainTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MysqlVisualExplainBaseFeature(),
        "test": lambda: MysqlVisualExplainTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
