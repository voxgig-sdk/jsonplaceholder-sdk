import { JsonplaceholderEntityBase } from '../JsonplaceholderEntityBase';
import type { JsonplaceholderSDK } from '../JsonplaceholderSDK';
import type { Control } from '../types';
import type { Post, PostLoadMatch, PostListMatch, PostCreateData, PostUpdateData, PostRemoveMatch } from '../JsonplaceholderTypes';
declare class PostEntity extends JsonplaceholderEntityBase<Post> {
    constructor(client: JsonplaceholderSDK, entopts: any);
    make(this: PostEntity): PostEntity;
    load(this: any, reqmatch?: PostLoadMatch, ctrl?: Control): Promise<PostEntity>;
    list(this: any, reqmatch?: PostListMatch, ctrl?: Control): Promise<PostEntity[]>;
    create(this: any, reqdata?: PostCreateData, ctrl?: Control): Promise<PostEntity>;
    update(this: any, reqdata?: PostUpdateData, ctrl?: Control): Promise<PostEntity>;
    remove(this: any, reqmatch?: PostRemoveMatch, ctrl?: Control): Promise<PostEntity>;
}
export { PostEntity };
