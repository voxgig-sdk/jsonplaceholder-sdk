# Jsonplaceholder SDK utility: transform_request
require_relative 'struct/voxgig_struct'
require_relative '../core/helpers'
module JsonplaceholderUtilities
  # `$action` selects the point (see MakePoint); it is never an API field, so
  # the body is a copy without it. The caller's hash is left untouched.
  def self.strip_action(reqdata)
    omit_keys(reqdata, ["$action"])
  end

  # A header argument travels as a header, which PrepareHeaders sends, so the
  # body is built from the request data without it.
  def self.header_arg_names(point)
    hl = point ? VoxgigStruct.getpath(point, "args.header") : nil
    return [] unless hl.is_a?(Array)
    hl.map { |hd| VoxgigStruct.getprop(hd, "name") }.select { |n| n.is_a?(String) && !n.empty? }
  end

  def self.omit_keys(reqdata, names)
    return reqdata unless reqdata.is_a?(Hash) && names.any? { |n| reqdata.key?(n) }
    reqdata.reject { |k, _| names.include?(k) }
  end

  TransformRequest = ->(ctx) {
    spec = ctx.spec
    point = ctx.point
    spec.step = "reqform" if spec
    data = JsonplaceholderUtilities.omit_keys(ctx.reqdata, JsonplaceholderUtilities.header_arg_names(point))
    transform = JsonplaceholderHelpers.to_map(VoxgigStruct.getprop(point, "transform"))
    return JsonplaceholderUtilities.strip_action(data) unless transform
    reqform = VoxgigStruct.getprop(transform, "req")
    return JsonplaceholderUtilities.strip_action(data) unless reqform
    JsonplaceholderUtilities.strip_action(VoxgigStruct.transform({ "reqdata" => data }, reqform))
  }
end
