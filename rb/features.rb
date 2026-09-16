# Jsonplaceholder SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module JsonplaceholderFeatures
  def self.make_feature(name)
    case name
    when "base"
      JsonplaceholderBaseFeature.new
    when "ratelimit"
      JsonplaceholderRatelimitFeature.new
    when "retry"
      JsonplaceholderRetryFeature.new
    when "test"
      JsonplaceholderTestFeature.new
    when "timeout"
      JsonplaceholderTimeoutFeature.new
    else
      JsonplaceholderBaseFeature.new
    end
  end
end
