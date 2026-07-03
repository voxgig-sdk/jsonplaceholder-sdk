package voxgigjsonplaceholdersdk

import (
	"github.com/voxgig-sdk/jsonplaceholder-sdk/go/core"
	"github.com/voxgig-sdk/jsonplaceholder-sdk/go/entity"
	"github.com/voxgig-sdk/jsonplaceholder-sdk/go/feature"
	_ "github.com/voxgig-sdk/jsonplaceholder-sdk/go/utility"
)

// Type aliases preserve external API.
type JsonplaceholderSDK = core.JsonplaceholderSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type JsonplaceholderEntity = core.JsonplaceholderEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type JsonplaceholderError = core.JsonplaceholderError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAlbumEntityFunc = func(client *core.JsonplaceholderSDK, entopts map[string]any) core.JsonplaceholderEntity {
		return entity.NewAlbumEntity(client, entopts)
	}
	core.NewCommentEntityFunc = func(client *core.JsonplaceholderSDK, entopts map[string]any) core.JsonplaceholderEntity {
		return entity.NewCommentEntity(client, entopts)
	}
	core.NewPhotoEntityFunc = func(client *core.JsonplaceholderSDK, entopts map[string]any) core.JsonplaceholderEntity {
		return entity.NewPhotoEntity(client, entopts)
	}
	core.NewPostEntityFunc = func(client *core.JsonplaceholderSDK, entopts map[string]any) core.JsonplaceholderEntity {
		return entity.NewPostEntity(client, entopts)
	}
	core.NewTodoEntityFunc = func(client *core.JsonplaceholderSDK, entopts map[string]any) core.JsonplaceholderEntity {
		return entity.NewTodoEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.JsonplaceholderSDK, entopts map[string]any) core.JsonplaceholderEntity {
		return entity.NewUserEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewJsonplaceholderSDK = core.NewJsonplaceholderSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewJsonplaceholderSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *JsonplaceholderSDK  { return NewJsonplaceholderSDK(nil) }
func Test() *JsonplaceholderSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
