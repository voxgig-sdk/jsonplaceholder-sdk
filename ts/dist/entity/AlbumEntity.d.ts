import { JsonplaceholderEntityBase } from '../JsonplaceholderEntityBase';
import type { JsonplaceholderSDK } from '../JsonplaceholderSDK';
import type { Control } from '../types';
import type { Album, AlbumLoadMatch, AlbumListMatch, AlbumCreateData, AlbumUpdateData, AlbumRemoveMatch } from '../JsonplaceholderTypes';
declare class AlbumEntity extends JsonplaceholderEntityBase<Album> {
    constructor(client: JsonplaceholderSDK, entopts: any);
    make(this: AlbumEntity): AlbumEntity;
    load(this: any, reqmatch?: AlbumLoadMatch, ctrl?: Control): Promise<AlbumEntity>;
    list(this: any, reqmatch?: AlbumListMatch, ctrl?: Control): Promise<AlbumEntity[]>;
    create(this: any, reqdata?: AlbumCreateData, ctrl?: Control): Promise<AlbumEntity>;
    update(this: any, reqdata?: AlbumUpdateData, ctrl?: Control): Promise<AlbumEntity>;
    remove(this: any, reqmatch?: AlbumRemoveMatch, ctrl?: Control): Promise<AlbumEntity>;
}
export { AlbumEntity };
