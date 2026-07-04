// Typed models for the Jsonplaceholder SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Album is the typed data model for the album entity.
type Album struct {
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"user_id,omitempty"`
}

// AlbumLoadMatch is the typed request payload for Album.LoadTyped.
type AlbumLoadMatch struct {
	Id int `json:"id"`
}

// AlbumListMatch is the typed request payload for Album.ListTyped.
type AlbumListMatch struct {
	UserId int `json:"user_id"`
}

// AlbumCreateData mirrors the album fields as an all-optional match
// filter (Go analog of Partial<Album>).
type AlbumCreateData struct {
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"user_id,omitempty"`
}

// AlbumUpdateData is the typed request payload for Album.UpdateTyped.
type AlbumUpdateData struct {
	Id int `json:"id"`
}

// AlbumRemoveMatch is the typed request payload for Album.RemoveTyped.
type AlbumRemoveMatch struct {
	Id int `json:"id"`
}

// Comment is the typed data model for the comment entity.
type Comment struct {
	Body *string `json:"body,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	PostId *int `json:"post_id,omitempty"`
}

// CommentLoadMatch is the typed request payload for Comment.LoadTyped.
type CommentLoadMatch struct {
	Id int `json:"id"`
}

// CommentListMatch is the typed request payload for Comment.ListTyped.
type CommentListMatch struct {
	PostId int `json:"post_id"`
}

// CommentCreateData mirrors the comment fields as an all-optional match
// filter (Go analog of Partial<Comment>).
type CommentCreateData struct {
	Body *string `json:"body,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	PostId *int `json:"post_id,omitempty"`
}

// CommentUpdateData is the typed request payload for Comment.UpdateTyped.
type CommentUpdateData struct {
	Id int `json:"id"`
}

// CommentRemoveMatch is the typed request payload for Comment.RemoveTyped.
type CommentRemoveMatch struct {
	Id int `json:"id"`
}

// Photo is the typed data model for the photo entity.
type Photo struct {
	AlbumId *int `json:"album_id,omitempty"`
	Id *int `json:"id,omitempty"`
	ThumbnailUrl *string `json:"thumbnail_url,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PhotoLoadMatch is the typed request payload for Photo.LoadTyped.
type PhotoLoadMatch struct {
	Id int `json:"id"`
}

// PhotoListMatch is the typed request payload for Photo.ListTyped.
type PhotoListMatch struct {
	AlbumId int `json:"album_id"`
}

// PhotoCreateData mirrors the photo fields as an all-optional match
// filter (Go analog of Partial<Photo>).
type PhotoCreateData struct {
	AlbumId *int `json:"album_id,omitempty"`
	Id *int `json:"id,omitempty"`
	ThumbnailUrl *string `json:"thumbnail_url,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PhotoUpdateData is the typed request payload for Photo.UpdateTyped.
type PhotoUpdateData struct {
	Id int `json:"id"`
}

// PhotoRemoveMatch is the typed request payload for Photo.RemoveTyped.
type PhotoRemoveMatch struct {
	Id int `json:"id"`
}

// Post is the typed data model for the post entity.
type Post struct {
	Body *string `json:"body,omitempty"`
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"user_id,omitempty"`
}

// PostLoadMatch is the typed request payload for Post.LoadTyped.
type PostLoadMatch struct {
	Id int `json:"id"`
}

// PostListMatch is the typed request payload for Post.ListTyped.
type PostListMatch struct {
	UserId int `json:"user_id"`
}

// PostCreateData mirrors the post fields as an all-optional match
// filter (Go analog of Partial<Post>).
type PostCreateData struct {
	Body *string `json:"body,omitempty"`
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"user_id,omitempty"`
}

// PostUpdateData is the typed request payload for Post.UpdateTyped.
type PostUpdateData struct {
	Id int `json:"id"`
}

// PostRemoveMatch is the typed request payload for Post.RemoveTyped.
type PostRemoveMatch struct {
	Id int `json:"id"`
}

// Todo is the typed data model for the todo entity.
type Todo struct {
	Completed *bool `json:"completed,omitempty"`
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"user_id,omitempty"`
}

// TodoLoadMatch is the typed request payload for Todo.LoadTyped.
type TodoLoadMatch struct {
	Id int `json:"id"`
}

// TodoListMatch is the typed request payload for Todo.ListTyped.
type TodoListMatch struct {
	UserId int `json:"user_id"`
}

// TodoCreateData mirrors the todo fields as an all-optional match
// filter (Go analog of Partial<Todo>).
type TodoCreateData struct {
	Completed *bool `json:"completed,omitempty"`
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"user_id,omitempty"`
}

// TodoUpdateData is the typed request payload for Todo.UpdateTyped.
type TodoUpdateData struct {
	Id int `json:"id"`
}

// TodoRemoveMatch is the typed request payload for Todo.RemoveTyped.
type TodoRemoveMatch struct {
	Id int `json:"id"`
}

// User is the typed data model for the user entity.
type User struct {
	Address *map[string]any `json:"address,omitempty"`
	Company *map[string]any `json:"company,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Username *string `json:"username,omitempty"`
	Website *string `json:"website,omitempty"`
}

// UserLoadMatch is the typed request payload for User.LoadTyped.
type UserLoadMatch struct {
	Id int `json:"id"`
}

// UserListMatch mirrors the user fields as an all-optional match
// filter (Go analog of Partial<User>).
type UserListMatch struct {
	Address *map[string]any `json:"address,omitempty"`
	Company *map[string]any `json:"company,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Username *string `json:"username,omitempty"`
	Website *string `json:"website,omitempty"`
}

// UserCreateData mirrors the user fields as an all-optional match
// filter (Go analog of Partial<User>).
type UserCreateData struct {
	Address *map[string]any `json:"address,omitempty"`
	Company *map[string]any `json:"company,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Username *string `json:"username,omitempty"`
	Website *string `json:"website,omitempty"`
}

// UserUpdateData is the typed request payload for User.UpdateTyped.
type UserUpdateData struct {
	Id int `json:"id"`
}

// UserRemoveMatch is the typed request payload for User.RemoveTyped.
type UserRemoveMatch struct {
	Id int `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
