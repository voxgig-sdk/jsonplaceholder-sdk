# Jsonplaceholder SDK feature factory

from jsonplaceholder_sdk.feature.base_feature import JsonplaceholderBaseFeature
from jsonplaceholder_sdk.feature.test_feature import JsonplaceholderTestFeature


def _make_feature(name):
    features = {
        "base": lambda: JsonplaceholderBaseFeature(),
        "test": lambda: JsonplaceholderTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
