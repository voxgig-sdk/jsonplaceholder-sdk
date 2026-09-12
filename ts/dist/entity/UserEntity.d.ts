import { JsonplaceholderEntityBase } from '../JsonplaceholderEntityBase';
import type { JsonplaceholderSDK } from '../JsonplaceholderSDK';
import type { Control } from '../types';
import type { User, UserLoadMatch, UserListMatch, UserCreateData, UserUpdateData, UserRemoveMatch } from '../JsonplaceholderTypes';
declare class UserEntity extends JsonplaceholderEntityBase<User> {
    constructor(client: JsonplaceholderSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    load(this: any, reqmatch?: UserLoadMatch, ctrl?: Control): Promise<UserEntity>;
    list(this: any, reqmatch?: UserListMatch, ctrl?: Control): Promise<UserEntity[]>;
    create(this: any, reqdata?: UserCreateData, ctrl?: Control): Promise<UserEntity>;
    update(this: any, reqdata?: UserUpdateData, ctrl?: Control): Promise<UserEntity>;
    remove(this: any, reqmatch?: UserRemoveMatch, ctrl?: Control): Promise<UserEntity>;
}
export { UserEntity };
