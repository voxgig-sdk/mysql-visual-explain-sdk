# MysqlVisualExplain SDK utility: make_context

from core.context import MysqlVisualExplainContext


def make_context_util(ctxmap, basectx):
    return MysqlVisualExplainContext(ctxmap, basectx)
