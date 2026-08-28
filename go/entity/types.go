// Typed models for the Jsonplaceholder SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/jsonplaceholder-sdk/go/core"
)

// Album is the typed data model for the album entity.
type Album struct {
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"userId,omitempty"`
}

// AlbumLoadMatch is the typed request payload for Album.LoadTyped.
type AlbumLoadMatch struct {
	Id int `json:"id"`
}

// AlbumListMatch is the typed request payload for Album.ListTyped.
type AlbumListMatch struct {
	UserId *int `json:"user_id,omitempty"`
}

// AlbumCreateData is the typed request payload for Album.CreateTyped.
type AlbumCreateData struct {
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"userId,omitempty"`
}

// AlbumUpdateData is the typed request payload for Album.UpdateTyped.
type AlbumUpdateData struct {
	Id int `json:"id"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"userId,omitempty"`
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
	PostId *int `json:"postId,omitempty"`
}

// CommentLoadMatch is the typed request payload for Comment.LoadTyped.
type CommentLoadMatch struct {
	Id int `json:"id"`
}

// CommentListMatch is the typed request payload for Comment.ListTyped.
type CommentListMatch struct {
	PostId *int `json:"post_id,omitempty"`
}

// CommentCreateData is the typed request payload for Comment.CreateTyped.
type CommentCreateData struct {
	Body *string `json:"body,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	PostId *int `json:"postId,omitempty"`
}

// CommentUpdateData is the typed request payload for Comment.UpdateTyped.
type CommentUpdateData struct {
	Id int `json:"id"`
	Body *string `json:"body,omitempty"`
	Email *string `json:"email,omitempty"`
	Name *string `json:"name,omitempty"`
	PostId *int `json:"postId,omitempty"`
}

// CommentRemoveMatch is the typed request payload for Comment.RemoveTyped.
type CommentRemoveMatch struct {
	Id int `json:"id"`
}

// Photo is the typed data model for the photo entity.
type Photo struct {
	AlbumId *int `json:"albumId,omitempty"`
	Id *int `json:"id,omitempty"`
	ThumbnailUrl *string `json:"thumbnailUrl,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PhotoLoadMatch is the typed request payload for Photo.LoadTyped.
type PhotoLoadMatch struct {
	Id int `json:"id"`
}

// PhotoListMatch is the typed request payload for Photo.ListTyped.
type PhotoListMatch struct {
	AlbumId *int `json:"album_id,omitempty"`
}

// PhotoCreateData is the typed request payload for Photo.CreateTyped.
type PhotoCreateData struct {
	AlbumId *int `json:"albumId,omitempty"`
	Id *int `json:"id,omitempty"`
	ThumbnailUrl *string `json:"thumbnailUrl,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PhotoUpdateData is the typed request payload for Photo.UpdateTyped.
type PhotoUpdateData struct {
	Id int `json:"id"`
	AlbumId *int `json:"albumId,omitempty"`
	ThumbnailUrl *string `json:"thumbnailUrl,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
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
	UserId *int `json:"userId,omitempty"`
}

// PostLoadMatch is the typed request payload for Post.LoadTyped.
type PostLoadMatch struct {
	Id int `json:"id"`
}

// PostListMatch is the typed request payload for Post.ListTyped.
type PostListMatch struct {
	UserId *int `json:"user_id,omitempty"`
}

// PostCreateData is the typed request payload for Post.CreateTyped.
type PostCreateData struct {
	Body *string `json:"body,omitempty"`
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"userId,omitempty"`
}

// PostUpdateData is the typed request payload for Post.UpdateTyped.
type PostUpdateData struct {
	Id int `json:"id"`
	Body *string `json:"body,omitempty"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"userId,omitempty"`
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
	UserId *int `json:"userId,omitempty"`
}

// TodoLoadMatch is the typed request payload for Todo.LoadTyped.
type TodoLoadMatch struct {
	Id int `json:"id"`
}

// TodoListMatch is the typed request payload for Todo.ListTyped.
type TodoListMatch struct {
	UserId *int `json:"user_id,omitempty"`
}

// TodoCreateData is the typed request payload for Todo.CreateTyped.
type TodoCreateData struct {
	Completed *bool `json:"completed,omitempty"`
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"userId,omitempty"`
}

// TodoUpdateData is the typed request payload for Todo.UpdateTyped.
type TodoUpdateData struct {
	Id int `json:"id"`
	Completed *bool `json:"completed,omitempty"`
	Title *string `json:"title,omitempty"`
	UserId *int `json:"userId,omitempty"`
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

// UserListMatch is the typed request payload for User.ListTyped.
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

// UserCreateData is the typed request payload for User.CreateTyped.
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
	Address *map[string]any `json:"address,omitempty"`
	Company *map[string]any `json:"company,omitempty"`
	Email *string `json:"email,omitempty"`
	Name *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Username *string `json:"username,omitempty"`
	Website *string `json:"website,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
