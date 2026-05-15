# Jsonplaceholder SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module JsonplaceholderFeatures
  def self.make_feature(name)
    case name
    when "base"
      JsonplaceholderBaseFeature.new
    when "test"
      JsonplaceholderTestFeature.new
    else
      JsonplaceholderBaseFeature.new
    end
  end
end
