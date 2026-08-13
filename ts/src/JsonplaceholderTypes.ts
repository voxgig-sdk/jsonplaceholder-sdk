// Typed models for the Jsonplaceholder SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Album {
  id?: number
  title?: string
  userId?: number
}

export interface AlbumLoadMatch {
  id: number
}

export interface AlbumListMatch {
  user_id?: number
}

export interface AlbumCreateData {
  id?: number
  title?: string
  userId?: number
}

export interface AlbumUpdateData {
  id: number
  title?: string
  userId?: number
}

export interface AlbumRemoveMatch {
  id: number
}

export interface Comment {
  body?: string
  email?: string
  id?: number
  name?: string
  postId?: number
}

export interface CommentLoadMatch {
  id: number
}

export interface CommentListMatch {
  post_id?: number
}

export interface CommentCreateData {
  body?: string
  email?: string
  id?: number
  name?: string
  postId?: number
}

export interface CommentUpdateData {
  id: number
  body?: string
  email?: string
  name?: string
  postId?: number
}

export interface CommentRemoveMatch {
  id: number
}

export interface Photo {
  albumId?: number
  id?: number
  thumbnailUrl?: string
  title?: string
  url?: string
}

export interface PhotoLoadMatch {
  id: number
}

export interface PhotoListMatch {
  album_id?: number
}

export interface PhotoCreateData {
  albumId?: number
  id?: number
  thumbnailUrl?: string
  title?: string
  url?: string
}

export interface PhotoUpdateData {
  id: number
  albumId?: number
  thumbnailUrl?: string
  title?: string
  url?: string
}

export interface PhotoRemoveMatch {
  id: number
}

export interface Post {
  body?: string
  id?: number
  title?: string
  userId?: number
}

export interface PostLoadMatch {
  id: number
}

export interface PostListMatch {
  user_id?: number
}

export interface PostCreateData {
  body?: string
  id?: number
  title?: string
  userId?: number
}

export interface PostUpdateData {
  id: number
  body?: string
  title?: string
  userId?: number
}

export interface PostRemoveMatch {
  id: number
}

export interface Todo {
  completed?: boolean
  id?: number
  title?: string
  userId?: number
}

export interface TodoLoadMatch {
  id: number
}

export interface TodoListMatch {
  user_id?: number
}

export interface TodoCreateData {
  completed?: boolean
  id?: number
  title?: string
  userId?: number
}

export interface TodoUpdateData {
  id: number
  completed?: boolean
  title?: string
  userId?: number
}

export interface TodoRemoveMatch {
  id: number
}

export interface User {
  address?: Record<string, any>
  company?: Record<string, any>
  email?: string
  id?: number
  name?: string
  phone?: string
  username?: string
  website?: string
}

export interface UserLoadMatch {
  id: number
}

export interface UserListMatch {
  address?: Record<string, any>
  company?: Record<string, any>
  email?: string
  id?: number
  name?: string
  phone?: string
  username?: string
  website?: string
}

export interface UserCreateData {
  address?: Record<string, any>
  company?: Record<string, any>
  email?: string
  id?: number
  name?: string
  phone?: string
  username?: string
  website?: string
}

export interface UserUpdateData {
  id: number
  address?: Record<string, any>
  company?: Record<string, any>
  email?: string
  name?: string
  phone?: string
  username?: string
  website?: string
}

export interface UserRemoveMatch {
  id: number
}

