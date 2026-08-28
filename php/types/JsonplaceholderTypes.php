<?php
declare(strict_types=1);

// Typed models for the Jsonplaceholder SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Album entity data model. */
class Album
{
    public ?int $id = null;
    public ?string $title = null;
    public ?int $userId = null;
}

/** Request payload for Album#load. */
class AlbumLoadMatch
{
    public int $id;
}

/** Request payload for Album#list. */
class AlbumListMatch
{
    public ?int $user_id = null;
}

/** Request payload for Album#create. */
class AlbumCreateData
{
    public ?int $id = null;
    public ?string $title = null;
    public ?int $userId = null;
}

/** Request payload for Album#update. */
class AlbumUpdateData
{
    public int $id;
    public ?string $title = null;
    public ?int $userId = null;
}

/** Request payload for Album#remove. */
class AlbumRemoveMatch
{
    public int $id;
}

/** Comment entity data model. */
class Comment
{
    public ?string $body = null;
    public ?string $email = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $postId = null;
}

/** Request payload for Comment#load. */
class CommentLoadMatch
{
    public int $id;
}

/** Request payload for Comment#list. */
class CommentListMatch
{
    public ?int $post_id = null;
}

/** Request payload for Comment#create. */
class CommentCreateData
{
    public ?string $body = null;
    public ?string $email = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $postId = null;
}

/** Request payload for Comment#update. */
class CommentUpdateData
{
    public int $id;
    public ?string $body = null;
    public ?string $email = null;
    public ?string $name = null;
    public ?int $postId = null;
}

/** Request payload for Comment#remove. */
class CommentRemoveMatch
{
    public int $id;
}

/** Photo entity data model. */
class Photo
{
    public ?int $albumId = null;
    public ?int $id = null;
    public ?string $thumbnailUrl = null;
    public ?string $title = null;
    public ?string $url = null;
}

/** Request payload for Photo#load. */
class PhotoLoadMatch
{
    public int $id;
}

/** Request payload for Photo#list. */
class PhotoListMatch
{
    public ?int $album_id = null;
}

/** Request payload for Photo#create. */
class PhotoCreateData
{
    public ?int $albumId = null;
    public ?int $id = null;
    public ?string $thumbnailUrl = null;
    public ?string $title = null;
    public ?string $url = null;
}

/** Request payload for Photo#update. */
class PhotoUpdateData
{
    public int $id;
    public ?int $albumId = null;
    public ?string $thumbnailUrl = null;
    public ?string $title = null;
    public ?string $url = null;
}

/** Request payload for Photo#remove. */
class PhotoRemoveMatch
{
    public int $id;
}

/** Post entity data model. */
class Post
{
    public ?string $body = null;
    public ?int $id = null;
    public ?string $title = null;
    public ?int $userId = null;
}

/** Request payload for Post#load. */
class PostLoadMatch
{
    public int $id;
}

/** Request payload for Post#list. */
class PostListMatch
{
    public ?int $user_id = null;
}

/** Request payload for Post#create. */
class PostCreateData
{
    public ?string $body = null;
    public ?int $id = null;
    public ?string $title = null;
    public ?int $userId = null;
}

/** Request payload for Post#update. */
class PostUpdateData
{
    public int $id;
    public ?string $body = null;
    public ?string $title = null;
    public ?int $userId = null;
}

/** Request payload for Post#remove. */
class PostRemoveMatch
{
    public int $id;
}

/** Todo entity data model. */
class Todo
{
    public ?bool $completed = null;
    public ?int $id = null;
    public ?string $title = null;
    public ?int $userId = null;
}

/** Request payload for Todo#load. */
class TodoLoadMatch
{
    public int $id;
}

/** Request payload for Todo#list. */
class TodoListMatch
{
    public ?int $user_id = null;
}

/** Request payload for Todo#create. */
class TodoCreateData
{
    public ?bool $completed = null;
    public ?int $id = null;
    public ?string $title = null;
    public ?int $userId = null;
}

/** Request payload for Todo#update. */
class TodoUpdateData
{
    public int $id;
    public ?bool $completed = null;
    public ?string $title = null;
    public ?int $userId = null;
}

/** Request payload for Todo#remove. */
class TodoRemoveMatch
{
    public int $id;
}

/** User entity data model. */
class User
{
    public ?array $address = null;
    public ?array $company = null;
    public ?string $email = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $phone = null;
    public ?string $username = null;
    public ?string $website = null;
}

/** Request payload for User#load. */
class UserLoadMatch
{
    public int $id;
}

/** Request payload for User#list. */
class UserListMatch
{
    public ?array $address = null;
    public ?array $company = null;
    public ?string $email = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $phone = null;
    public ?string $username = null;
    public ?string $website = null;
}

/** Request payload for User#create. */
class UserCreateData
{
    public ?array $address = null;
    public ?array $company = null;
    public ?string $email = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $phone = null;
    public ?string $username = null;
    public ?string $website = null;
}

/** Request payload for User#update. */
class UserUpdateData
{
    public int $id;
    public ?array $address = null;
    public ?array $company = null;
    public ?string $email = null;
    public ?string $name = null;
    public ?string $phone = null;
    public ?string $username = null;
    public ?string $website = null;
}

/** Request payload for User#remove. */
class UserRemoveMatch
{
    public int $id;
}

