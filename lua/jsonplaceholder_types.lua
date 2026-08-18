-- Typed models for the Jsonplaceholder SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Album
---@field id? number
---@field title? string
---@field userId? number

---@class AlbumLoadMatch
---@field id number

---@class AlbumListMatch
---@field id? number
---@field title? string
---@field userId? number

---@class AlbumCreateData
---@field id? number
---@field title? string
---@field userId? number

---@class AlbumUpdateData
---@field id number
---@field title? string
---@field userId? number

---@class AlbumRemoveMatch
---@field id number

---@class Comment
---@field body? string
---@field email? string
---@field id? number
---@field name? string
---@field postId? number

---@class CommentLoadMatch
---@field id number

---@class CommentListMatch
---@field body? string
---@field email? string
---@field id? number
---@field name? string
---@field postId? number

---@class CommentCreateData
---@field body? string
---@field email? string
---@field id? number
---@field name? string
---@field postId? number

---@class CommentUpdateData
---@field id number
---@field body? string
---@field email? string
---@field name? string
---@field postId? number

---@class CommentRemoveMatch
---@field id number

---@class Photo
---@field albumId? number
---@field id? number
---@field thumbnailUrl? string
---@field title? string
---@field url? string

---@class PhotoLoadMatch
---@field id number

---@class PhotoListMatch
---@field albumId? number
---@field id? number
---@field thumbnailUrl? string
---@field title? string
---@field url? string

---@class PhotoCreateData
---@field albumId? number
---@field id? number
---@field thumbnailUrl? string
---@field title? string
---@field url? string

---@class PhotoUpdateData
---@field id number
---@field albumId? number
---@field thumbnailUrl? string
---@field title? string
---@field url? string

---@class PhotoRemoveMatch
---@field id number

---@class Post
---@field body? string
---@field id? number
---@field title? string
---@field userId? number

---@class PostLoadMatch
---@field id number

---@class PostListMatch
---@field body? string
---@field id? number
---@field title? string
---@field userId? number

---@class PostCreateData
---@field body? string
---@field id? number
---@field title? string
---@field userId? number

---@class PostUpdateData
---@field id number
---@field body? string
---@field title? string
---@field userId? number

---@class PostRemoveMatch
---@field id number

---@class Todo
---@field completed? boolean
---@field id? number
---@field title? string
---@field userId? number

---@class TodoLoadMatch
---@field id number

---@class TodoListMatch
---@field completed? boolean
---@field id? number
---@field title? string
---@field userId? number

---@class TodoCreateData
---@field completed? boolean
---@field id? number
---@field title? string
---@field userId? number

---@class TodoUpdateData
---@field id number
---@field completed? boolean
---@field title? string
---@field userId? number

---@class TodoRemoveMatch
---@field id number

---@class User
---@field address? table
---@field company? table
---@field email? string
---@field id? number
---@field name? string
---@field phone? string
---@field username? string
---@field website? string

---@class UserLoadMatch
---@field id number

---@class UserListMatch
---@field address? table
---@field company? table
---@field email? string
---@field id? number
---@field name? string
---@field phone? string
---@field username? string
---@field website? string

---@class UserCreateData
---@field address? table
---@field company? table
---@field email? string
---@field id? number
---@field name? string
---@field phone? string
---@field username? string
---@field website? string

---@class UserUpdateData
---@field id number
---@field address? table
---@field company? table
---@field email? string
---@field name? string
---@field phone? string
---@field username? string
---@field website? string

---@class UserRemoveMatch
---@field id number

local M = {}

return M
