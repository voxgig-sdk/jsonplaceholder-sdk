# Typed models for the Jsonplaceholder SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Album(TypedDict, total=False):
    id: int
    title: str
    user_id: int


class AlbumLoadMatch(TypedDict):
    id: int


class AlbumListMatch(TypedDict, total=False):
    user_id: int


class AlbumCreateData(TypedDict, total=False):
    id: int
    title: str
    user_id: int


class AlbumUpdateData(TypedDict):
    id: int


class AlbumRemoveMatch(TypedDict):
    id: int


class Comment(TypedDict, total=False):
    body: str
    email: str
    id: int
    name: str
    post_id: int


class CommentLoadMatch(TypedDict):
    id: int


class CommentListMatch(TypedDict, total=False):
    post_id: int


class CommentCreateData(TypedDict, total=False):
    body: str
    email: str
    id: int
    name: str
    post_id: int


class CommentUpdateData(TypedDict):
    id: int


class CommentRemoveMatch(TypedDict):
    id: int


class Photo(TypedDict, total=False):
    album_id: int
    id: int
    thumbnail_url: str
    title: str
    url: str


class PhotoLoadMatch(TypedDict):
    id: int


class PhotoListMatch(TypedDict, total=False):
    album_id: int


class PhotoCreateData(TypedDict, total=False):
    album_id: int
    id: int
    thumbnail_url: str
    title: str
    url: str


class PhotoUpdateData(TypedDict):
    id: int


class PhotoRemoveMatch(TypedDict):
    id: int


class Post(TypedDict, total=False):
    body: str
    id: int
    title: str
    user_id: int


class PostLoadMatch(TypedDict):
    id: int


class PostListMatch(TypedDict, total=False):
    user_id: int


class PostCreateData(TypedDict, total=False):
    body: str
    id: int
    title: str
    user_id: int


class PostUpdateData(TypedDict):
    id: int


class PostRemoveMatch(TypedDict):
    id: int


class Todo(TypedDict, total=False):
    completed: bool
    id: int
    title: str
    user_id: int


class TodoLoadMatch(TypedDict):
    id: int


class TodoListMatch(TypedDict, total=False):
    user_id: int


class TodoCreateData(TypedDict, total=False):
    completed: bool
    id: int
    title: str
    user_id: int


class TodoUpdateData(TypedDict):
    id: int


class TodoRemoveMatch(TypedDict):
    id: int


class User(TypedDict, total=False):
    address: dict
    company: dict
    email: str
    id: int
    name: str
    phone: str
    username: str
    website: str


class UserLoadMatch(TypedDict):
    id: int


class UserListMatch(TypedDict, total=False):
    address: dict
    company: dict
    email: str
    id: int
    name: str
    phone: str
    username: str
    website: str


class UserCreateData(TypedDict, total=False):
    address: dict
    company: dict
    email: str
    id: int
    name: str
    phone: str
    username: str
    website: str


class UserUpdateData(TypedDict):
    id: int


class UserRemoveMatch(TypedDict):
    id: int
