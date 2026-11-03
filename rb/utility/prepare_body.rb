# Jsonplaceholder SDK utility: prepare_body
require_relative 'media'
module JsonplaceholderUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return JsonplaceholderUtilities.raw_body(ctx.reqdata) if JsonplaceholderUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
