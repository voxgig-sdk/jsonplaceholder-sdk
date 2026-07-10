# frozen_string_literal: true

# Typed models for the Jsonplaceholder SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Album entity data model.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
Album = Struct.new(
  :id,
  :title,
  :user_id,
  keyword_init: true
)

# Request payload for Album#load.
#
# @!attribute [rw] id
#   @return [Integer]
AlbumLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Album#list.
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
AlbumListMatch = Struct.new(
  :user_id,
  keyword_init: true
)

# Request payload for Album#create.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
AlbumCreateData = Struct.new(
  :id,
  :title,
  :user_id,
  keyword_init: true
)

# Request payload for Album#update.
#
# @!attribute [rw] id
#   @return [Integer]
AlbumUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Album#remove.
#
# @!attribute [rw] id
#   @return [Integer]
AlbumRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Comment entity data model.
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] post_id
#   @return [Integer, nil]
Comment = Struct.new(
  :body,
  :email,
  :id,
  :name,
  :post_id,
  keyword_init: true
)

# Request payload for Comment#load.
#
# @!attribute [rw] id
#   @return [Integer]
CommentLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Comment#list.
#
# @!attribute [rw] post_id
#   @return [Integer, nil]
CommentListMatch = Struct.new(
  :post_id,
  keyword_init: true
)

# Request payload for Comment#create.
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] post_id
#   @return [Integer, nil]
CommentCreateData = Struct.new(
  :body,
  :email,
  :id,
  :name,
  :post_id,
  keyword_init: true
)

# Request payload for Comment#update.
#
# @!attribute [rw] id
#   @return [Integer]
CommentUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Comment#remove.
#
# @!attribute [rw] id
#   @return [Integer]
CommentRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Photo entity data model.
#
# @!attribute [rw] album_id
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] thumbnail_url
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Photo = Struct.new(
  :album_id,
  :id,
  :thumbnail_url,
  :title,
  :url,
  keyword_init: true
)

# Request payload for Photo#load.
#
# @!attribute [rw] id
#   @return [Integer]
PhotoLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Photo#list.
#
# @!attribute [rw] album_id
#   @return [Integer, nil]
PhotoListMatch = Struct.new(
  :album_id,
  keyword_init: true
)

# Request payload for Photo#create.
#
# @!attribute [rw] album_id
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] thumbnail_url
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
PhotoCreateData = Struct.new(
  :album_id,
  :id,
  :thumbnail_url,
  :title,
  :url,
  keyword_init: true
)

# Request payload for Photo#update.
#
# @!attribute [rw] id
#   @return [Integer]
PhotoUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Photo#remove.
#
# @!attribute [rw] id
#   @return [Integer]
PhotoRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Post entity data model.
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
Post = Struct.new(
  :body,
  :id,
  :title,
  :user_id,
  keyword_init: true
)

# Request payload for Post#load.
#
# @!attribute [rw] id
#   @return [Integer]
PostLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Post#list.
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
PostListMatch = Struct.new(
  :user_id,
  keyword_init: true
)

# Request payload for Post#create.
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
PostCreateData = Struct.new(
  :body,
  :id,
  :title,
  :user_id,
  keyword_init: true
)

# Request payload for Post#update.
#
# @!attribute [rw] id
#   @return [Integer]
PostUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Post#remove.
#
# @!attribute [rw] id
#   @return [Integer]
PostRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Todo entity data model.
#
# @!attribute [rw] completed
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
Todo = Struct.new(
  :completed,
  :id,
  :title,
  :user_id,
  keyword_init: true
)

# Request payload for Todo#load.
#
# @!attribute [rw] id
#   @return [Integer]
TodoLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Todo#list.
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
TodoListMatch = Struct.new(
  :user_id,
  keyword_init: true
)

# Request payload for Todo#create.
#
# @!attribute [rw] completed
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
TodoCreateData = Struct.new(
  :completed,
  :id,
  :title,
  :user_id,
  keyword_init: true
)

# Request payload for Todo#update.
#
# @!attribute [rw] id
#   @return [Integer]
TodoUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Todo#remove.
#
# @!attribute [rw] id
#   @return [Integer]
TodoRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] address
#   @return [Hash, nil]
#
# @!attribute [rw] company
#   @return [Hash, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
User = Struct.new(
  :address,
  :company,
  :email,
  :id,
  :name,
  :phone,
  :username,
  :website,
  keyword_init: true
)

# Request payload for User#load.
#
# @!attribute [rw] id
#   @return [Integer]
UserLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for User#list.
#
# @!attribute [rw] address
#   @return [Hash, nil]
#
# @!attribute [rw] company
#   @return [Hash, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
UserListMatch = Struct.new(
  :address,
  :company,
  :email,
  :id,
  :name,
  :phone,
  :username,
  :website,
  keyword_init: true
)

# Request payload for User#create.
#
# @!attribute [rw] address
#   @return [Hash, nil]
#
# @!attribute [rw] company
#   @return [Hash, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
UserCreateData = Struct.new(
  :address,
  :company,
  :email,
  :id,
  :name,
  :phone,
  :username,
  :website,
  keyword_init: true
)

# Request payload for User#update.
#
# @!attribute [rw] id
#   @return [Integer]
UserUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for User#remove.
#
# @!attribute [rw] id
#   @return [Integer]
UserRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

