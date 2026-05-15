# ProjectName SDK exists test

import pytest
from jsonplaceholder_sdk import JsonplaceholderSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = JsonplaceholderSDK.test(None, None)
        assert testsdk is not None
