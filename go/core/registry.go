package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAlbumEntityFunc func(client *JsonplaceholderSDK, entopts map[string]any) JsonplaceholderEntityBase

var NewCommentEntityFunc func(client *JsonplaceholderSDK, entopts map[string]any) JsonplaceholderEntityBase

var NewPhotoEntityFunc func(client *JsonplaceholderSDK, entopts map[string]any) JsonplaceholderEntityBase

var NewPostEntityFunc func(client *JsonplaceholderSDK, entopts map[string]any) JsonplaceholderEntityBase

var NewTodoEntityFunc func(client *JsonplaceholderSDK, entopts map[string]any) JsonplaceholderEntityBase

var NewUserEntityFunc func(client *JsonplaceholderSDK, entopts map[string]any) JsonplaceholderEntityBase

