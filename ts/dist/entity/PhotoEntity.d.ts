import { JsonplaceholderEntityBase } from '../JsonplaceholderEntityBase';
import type { JsonplaceholderSDK } from '../JsonplaceholderSDK';
import type { Control } from '../types';
import type { Photo, PhotoLoadMatch, PhotoListMatch, PhotoCreateData, PhotoUpdateData, PhotoRemoveMatch } from '../JsonplaceholderTypes';
declare class PhotoEntity extends JsonplaceholderEntityBase<Photo> {
    constructor(client: JsonplaceholderSDK, entopts: any);
    make(this: PhotoEntity): PhotoEntity;
    load(this: any, reqmatch?: PhotoLoadMatch, ctrl?: Control): Promise<PhotoEntity>;
    list(this: any, reqmatch?: PhotoListMatch, ctrl?: Control): Promise<PhotoEntity[]>;
    create(this: any, reqdata?: PhotoCreateData, ctrl?: Control): Promise<PhotoEntity>;
    update(this: any, reqdata?: PhotoUpdateData, ctrl?: Control): Promise<PhotoEntity>;
    remove(this: any, reqmatch?: PhotoRemoveMatch, ctrl?: Control): Promise<PhotoEntity>;
}
export { PhotoEntity };
