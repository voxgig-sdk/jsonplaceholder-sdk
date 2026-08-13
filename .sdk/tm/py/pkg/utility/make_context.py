# Jsonplaceholder SDK utility: make_context

from projectname_sdk.core.context import JsonplaceholderContext


def make_context_util(ctxmap, basectx):
    return JsonplaceholderContext(ctxmap, basectx)
