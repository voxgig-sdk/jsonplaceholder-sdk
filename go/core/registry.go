package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAlbumEntityFunc func(client *JsonplaceholderSDK, entopts map[string]any) JsonplaceholderEntity

var NewCommentEntityFunc func(client *JsonplaceholderSDK, entopts map[string]any) JsonplaceholderEntity

var NewPhotoEntityFunc func(client *JsonplaceholderSDK, entopts map[string]any) JsonplaceholderEntity

var NewPostEntityFunc func(client *JsonplaceholderSDK, entopts map[string]any) JsonplaceholderEntity

var NewTodoEntityFunc func(client *JsonplaceholderSDK, entopts map[string]any) JsonplaceholderEntity

var NewUserEntityFunc func(client *JsonplaceholderSDK, entopts map[string]any) JsonplaceholderEntity

