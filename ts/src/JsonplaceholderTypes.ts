// Typed models for the Jsonplaceholder SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Album {
  id?: number
  title?: string
  user_id?: number
}

export interface AlbumLoadMatch {
  id: number
}

export interface AlbumListMatch {
  user_id: number
}

export type AlbumCreateData = Partial<Album>

export interface AlbumUpdateData {
  id: number
}

export interface AlbumRemoveMatch {
  id: number
}

export interface Comment {
  body?: string
  email?: string
  id?: number
  name?: string
  post_id?: number
}

export interface CommentLoadMatch {
  id: number
}

export interface CommentListMatch {
  post_id: number
}

export type CommentCreateData = Partial<Comment>

export interface CommentUpdateData {
  id: number
}

export interface CommentRemoveMatch {
  id: number
}

export interface Photo {
  album_id?: number
  id?: number
  thumbnail_url?: string
  title?: string
  url?: string
}

export interface PhotoLoadMatch {
  id: number
}

export interface PhotoListMatch {
  album_id: number
}

export type PhotoCreateData = Partial<Photo>

export interface PhotoUpdateData {
  id: number
}

export interface PhotoRemoveMatch {
  id: number
}

export interface Post {
  body?: string
  id?: number
  title?: string
  user_id?: number
}

export interface PostLoadMatch {
  id: number
}

export interface PostListMatch {
  user_id: number
}

export type PostCreateData = Partial<Post>

export interface PostUpdateData {
  id: number
}

export interface PostRemoveMatch {
  id: number
}

export interface Todo {
  completed?: boolean
  id?: number
  title?: string
  user_id?: number
}

export interface TodoLoadMatch {
  id: number
}

export interface TodoListMatch {
  user_id: number
}

export type TodoCreateData = Partial<Todo>

export interface TodoUpdateData {
  id: number
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

export type UserListMatch = Partial<User>

export type UserCreateData = Partial<User>

export interface UserUpdateData {
  id: number
}

export interface UserRemoveMatch {
  id: number
}

