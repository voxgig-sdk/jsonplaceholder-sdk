# Jsonplaceholder SDK utility: make_context
require_relative '../core/context'
module JsonplaceholderUtilities
  MakeContext = ->(ctxmap, basectx) {
    JsonplaceholderContext.new(ctxmap, basectx)
  }
end
