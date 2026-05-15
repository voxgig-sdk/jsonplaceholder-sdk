# Jsonplaceholder SDK utility: make_context

from core.context import JsonplaceholderContext


def make_context_util(ctxmap, basectx):
    return JsonplaceholderContext(ctxmap, basectx)
