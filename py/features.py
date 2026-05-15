# MysqlVisualExplain SDK feature factory

from feature.base_feature import MysqlVisualExplainBaseFeature
from feature.test_feature import MysqlVisualExplainTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MysqlVisualExplainBaseFeature(),
        "test": lambda: MysqlVisualExplainTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
