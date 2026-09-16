# Jsonplaceholder SDK feature factory

from jsonplaceholder_sdk.feature.base_feature import JsonplaceholderBaseFeature
from jsonplaceholder_sdk.feature.ratelimit_feature import JsonplaceholderRatelimitFeature
from jsonplaceholder_sdk.feature.retry_feature import JsonplaceholderRetryFeature
from jsonplaceholder_sdk.feature.test_feature import JsonplaceholderTestFeature
from jsonplaceholder_sdk.feature.timeout_feature import JsonplaceholderTimeoutFeature


_FEATURES = {
    "base": lambda: JsonplaceholderBaseFeature(),
    "ratelimit": lambda: JsonplaceholderRatelimitFeature(),
    "retry": lambda: JsonplaceholderRetryFeature(),
    "test": lambda: JsonplaceholderTestFeature(),
    "timeout": lambda: JsonplaceholderTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
