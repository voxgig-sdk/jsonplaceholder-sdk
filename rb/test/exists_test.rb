# Jsonplaceholder SDK exists test

require "minitest/autorun"
require_relative "../Jsonplaceholder_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = JsonplaceholderSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
