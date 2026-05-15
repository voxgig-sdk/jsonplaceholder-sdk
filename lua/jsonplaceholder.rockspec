package = "voxgig-sdk-jsonplaceholder"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/jsonplaceholder-sdk.git"
}
description = {
  summary = "Jsonplaceholder SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["jsonplaceholder_sdk"] = "jsonplaceholder_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
