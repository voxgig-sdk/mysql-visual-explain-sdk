# ProjectName SDK exists test

import pytest
from mysqlvisualexplain_sdk import MysqlVisualExplainSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MysqlVisualExplainSDK.test(None, None)
        assert testsdk is not None
