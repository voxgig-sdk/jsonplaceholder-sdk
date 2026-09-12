import { AlbumEntity } from './entity/AlbumEntity';
import { CommentEntity } from './entity/CommentEntity';
import { PhotoEntity } from './entity/PhotoEntity';
import { PostEntity } from './entity/PostEntity';
import { TodoEntity } from './entity/TodoEntity';
import { UserEntity } from './entity/UserEntity';
export type * from './JsonplaceholderTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { JsonplaceholderEntityBase } from './JsonplaceholderEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class JsonplaceholderSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Album(entopts?: Record<string, any>): AlbumEntity;
    Comment(entopts?: Record<string, any>): CommentEntity;
    Photo(entopts?: Record<string, any>): PhotoEntity;
    Post(entopts?: Record<string, any>): PostEntity;
    Todo(entopts?: Record<string, any>): TodoEntity;
    User(entopts?: Record<string, any>): UserEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): JsonplaceholderSDK;
    tester(testopts?: any, sdkopts?: any): JsonplaceholderSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof JsonplaceholderSDK;
export { stdutil, config, BaseFeature, JsonplaceholderEntityBase, JsonplaceholderSDK, SDK, };
