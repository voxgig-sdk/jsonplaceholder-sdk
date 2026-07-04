# Typed models for the Jsonplaceholder SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Album:
    id: Optional[int] = None
    title: Optional[str] = None
    user_id: Optional[int] = None


@dataclass
class AlbumLoadMatch:
    id: int


@dataclass
class AlbumListMatch:
    user_id: int


@dataclass
class AlbumCreateData:
    id: Optional[int] = None
    title: Optional[str] = None
    user_id: Optional[int] = None


@dataclass
class AlbumUpdateData:
    id: int


@dataclass
class AlbumRemoveMatch:
    id: int


@dataclass
class Comment:
    body: Optional[str] = None
    email: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    post_id: Optional[int] = None


@dataclass
class CommentLoadMatch:
    id: int


@dataclass
class CommentListMatch:
    post_id: int


@dataclass
class CommentCreateData:
    body: Optional[str] = None
    email: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    post_id: Optional[int] = None


@dataclass
class CommentUpdateData:
    id: int


@dataclass
class CommentRemoveMatch:
    id: int


@dataclass
class Photo:
    album_id: Optional[int] = None
    id: Optional[int] = None
    thumbnail_url: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None


@dataclass
class PhotoLoadMatch:
    id: int


@dataclass
class PhotoListMatch:
    album_id: int


@dataclass
class PhotoCreateData:
    album_id: Optional[int] = None
    id: Optional[int] = None
    thumbnail_url: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None


@dataclass
class PhotoUpdateData:
    id: int


@dataclass
class PhotoRemoveMatch:
    id: int


@dataclass
class Post:
    body: Optional[str] = None
    id: Optional[int] = None
    title: Optional[str] = None
    user_id: Optional[int] = None


@dataclass
class PostLoadMatch:
    id: int


@dataclass
class PostListMatch:
    user_id: int


@dataclass
class PostCreateData:
    body: Optional[str] = None
    id: Optional[int] = None
    title: Optional[str] = None
    user_id: Optional[int] = None


@dataclass
class PostUpdateData:
    id: int


@dataclass
class PostRemoveMatch:
    id: int


@dataclass
class Todo:
    completed: Optional[bool] = None
    id: Optional[int] = None
    title: Optional[str] = None
    user_id: Optional[int] = None


@dataclass
class TodoLoadMatch:
    id: int


@dataclass
class TodoListMatch:
    user_id: int


@dataclass
class TodoCreateData:
    completed: Optional[bool] = None
    id: Optional[int] = None
    title: Optional[str] = None
    user_id: Optional[int] = None


@dataclass
class TodoUpdateData:
    id: int


@dataclass
class TodoRemoveMatch:
    id: int


@dataclass
class User:
    address: Optional[dict] = None
    company: Optional[dict] = None
    email: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    phone: Optional[str] = None
    username: Optional[str] = None
    website: Optional[str] = None


@dataclass
class UserLoadMatch:
    id: int


@dataclass
class UserListMatch:
    address: Optional[dict] = None
    company: Optional[dict] = None
    email: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    phone: Optional[str] = None
    username: Optional[str] = None
    website: Optional[str] = None


@dataclass
class UserCreateData:
    address: Optional[dict] = None
    company: Optional[dict] = None
    email: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    phone: Optional[str] = None
    username: Optional[str] = None
    website: Optional[str] = None


@dataclass
class UserUpdateData:
    id: int


@dataclass
class UserRemoveMatch:
    id: int

