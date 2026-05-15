-- Jsonplaceholder SDK error

local JsonplaceholderError = {}
JsonplaceholderError.__index = JsonplaceholderError


function JsonplaceholderError.new(code, msg, ctx)
  local self = setmetatable({}, JsonplaceholderError)
  self.is_sdk_error = true
  self.sdk = "Jsonplaceholder"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function JsonplaceholderError:error()
  return self.msg
end


function JsonplaceholderError:__tostring()
  return self.msg
end


return JsonplaceholderError
