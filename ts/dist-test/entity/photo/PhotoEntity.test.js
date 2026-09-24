"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PhotoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('JSONPLACEHOLDER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.JsonplaceholderSDK.test();
        const ent = testsdk.Photo();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'photo.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "albumId": { "a": true, "h": "Album Id", "n": "albumId", "op": { "create": { "req": true, "type": "`$INTEGER`" }, "patch": { "req": true, "type": "`$INTEGER`" }, "update": { "req": true, "type": "`$INTEGER`" } }, "r": false, "sh": "Album ID the photo belongs to", "t": "`$INTEGER`", "key$": "albumId", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Photo ID", "t": "`$INTEGER`", "key$": "id", "index$": 1 }, "thumbnailUrl": { "a": true, "fo": "uri", "h": "Thumbnail Url", "n": "thumbnailUrl", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Photo thumbnail URL", "t": "`$STRING`", "key$": "thumbnailUrl", "index$": 2 }, "title": { "a": true, "h": "Title", "n": "title", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Photo title", "t": "`$STRING`", "key$": "title", "index$": 3 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Photo URL", "t": "`$STRING`", "key$": "url", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "photo", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /photos", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/photos", "q": {}, "r": {}, "s": [{ "lit": "photos" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /albums/{id}/photos", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "album_id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/albums/{id}/photos", "q": { "exist": ["album_id"] }, "r": { "param": { "id": "album_id" } }, "s": [{ "lit": "albums" }, { "var": "album_id" }, { "lit": "photos" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /photos", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "album_id", "or": "album_id", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/photos", "q": { "exist": ["album_id"] }, "r": {}, "s": [{ "lit": "photos" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /photos/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/photos/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "photos" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "co": { "id": "PATCH /photos/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/photos/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "photos" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /photos/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/photos/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "photos" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /photos/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/photos/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "photos" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.album"]] }, "key$": "photo", "name__orig": "photo", "Name": "Photo", "name_": "photo", "name-": "photo", "NAME": "PHOTO", "index$": 2 }, { "active": true, "entity": "photo", "key$": "BasicPhotoFlow", "kind": "basic", "name": "BasicPhotoFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "photo_ref01" }, "m": { "album_id": "album01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "photo_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "photo_ref01", "srcdatavar": "photo_ref01_data", "suffix": "_up0", "textfield": "thumbnailUrl" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-photo_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "photo_ref01", "srcdatavar": "photo_ref01_data", "suffix": "_dt0" }, "m": { "id": "photo01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-photo_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "photo_ref01", "suffix": "_rm0" }, "m": { "id": "photo01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "photo_ref01" } }], "index$": 5 }] }, 'Photo', { "POST /photos": { "protocol": "http", "operationId": "createPhoto", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["albumId", "title", "url", "thumbnailUrl"], "properties": { "albumId": { "type": "integer", "description": "Album ID the photo belongs to", "key$": "albumId" }, "title": { "type": "string", "description": "Photo title", "key$": "title" }, "url": { "type": "string", "format": "uri", "description": "Photo URL", "key$": "url" }, "thumbnailUrl": { "type": "string", "format": "uri", "description": "Photo thumbnail URL", "key$": "thumbnailUrl" } }, "x-ref": "#/components/schemas/PhotoInput", "index$": 1 } } } }, "responses": { "201": { "description": "Photo created successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Photo ID", "key$": "id" }, "albumId": { "type": "integer", "description": "Album ID the photo belongs to", "key$": "albumId" }, "title": { "type": "string", "description": "Photo title", "key$": "title" }, "url": { "type": "string", "format": "uri", "description": "Photo URL", "key$": "url" }, "thumbnailUrl": { "type": "string", "format": "uri", "description": "Photo thumbnail URL", "key$": "thumbnailUrl" } }, "x-ref": "#/components/schemas/Photo" } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /albums/{id}/photos": { "protocol": "http", "operationId": "getAlbumPhotos", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "description": "Photo ID", "key$": "id" }, "albumId": { "type": "integer", "description": "Album ID the photo belongs to", "key$": "albumId" }, "title": { "type": "string", "description": "Photo title", "key$": "title" }, "url": { "type": "string", "format": "uri", "description": "Photo URL", "key$": "url" }, "thumbnailUrl": { "type": "string", "format": "uri", "description": "Photo thumbnail URL", "key$": "thumbnailUrl" } }, "x-ref": "#/components/schemas/Photo", "index$": 0 } } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Album ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /photos": { "protocol": "http", "operationId": "getPhotos", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "description": "Photo ID", "key$": "id" }, "albumId": { "type": "integer", "description": "Album ID the photo belongs to", "key$": "albumId" }, "title": { "type": "string", "description": "Photo title", "key$": "title" }, "url": { "type": "string", "format": "uri", "description": "Photo URL", "key$": "url" }, "thumbnailUrl": { "type": "string", "format": "uri", "description": "Photo thumbnail URL", "key$": "thumbnailUrl" } }, "x-ref": "#/components/schemas/Photo", "index$": 0 } } } } } }, "parameters": [{ "name": "albumId", "in": "query", "description": "Filter photos by album ID", "required": false, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /photos/{id}": { "protocol": "http", "operationId": "getPhotoById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Photo ID", "key$": "id" }, "albumId": { "type": "integer", "description": "Album ID the photo belongs to", "key$": "albumId" }, "title": { "type": "string", "description": "Photo title", "key$": "title" }, "url": { "type": "string", "format": "uri", "description": "Photo URL", "key$": "url" }, "thumbnailUrl": { "type": "string", "format": "uri", "description": "Photo thumbnail URL", "key$": "thumbnailUrl" } }, "x-ref": "#/components/schemas/Photo", "index$": 0 } } } }, "404": { "description": "Photo not found" } }, "parameters": [{ "name": "id", "in": "path", "description": "Photo ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "PATCH /photos/{id}": { "protocol": "http", "operationId": "patchPhoto", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["albumId", "title", "url", "thumbnailUrl"], "properties": { "albumId": { "type": "integer", "description": "Album ID the photo belongs to", "key$": "albumId" }, "title": { "type": "string", "description": "Photo title", "key$": "title" }, "url": { "type": "string", "format": "uri", "description": "Photo URL", "key$": "url" }, "thumbnailUrl": { "type": "string", "format": "uri", "description": "Photo thumbnail URL", "key$": "thumbnailUrl" } }, "x-ref": "#/components/schemas/PhotoInput", "index$": 1 } } } }, "responses": { "200": { "description": "Photo updated successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Photo ID", "key$": "id" }, "albumId": { "type": "integer", "description": "Album ID the photo belongs to", "key$": "albumId" }, "title": { "type": "string", "description": "Photo title", "key$": "title" }, "url": { "type": "string", "format": "uri", "description": "Photo URL", "key$": "url" }, "thumbnailUrl": { "type": "string", "format": "uri", "description": "Photo thumbnail URL", "key$": "thumbnailUrl" } }, "x-ref": "#/components/schemas/Photo", "index$": 0 } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Photo ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "DELETE /photos/{id}": { "protocol": "http", "operationId": "deletePhoto", "responses": { "200": { "description": "Photo deleted successfully" } }, "parameters": [{ "name": "id", "in": "path", "description": "Photo ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "PUT /photos/{id}": { "protocol": "http", "operationId": "updatePhoto", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["albumId", "title", "url", "thumbnailUrl"], "properties": { "albumId": { "type": "integer", "description": "Album ID the photo belongs to", "key$": "albumId" }, "title": { "type": "string", "description": "Photo title", "key$": "title" }, "url": { "type": "string", "format": "uri", "description": "Photo URL", "key$": "url" }, "thumbnailUrl": { "type": "string", "format": "uri", "description": "Photo thumbnail URL", "key$": "thumbnailUrl" } }, "x-ref": "#/components/schemas/PhotoInput", "index$": 1 } } } }, "responses": { "200": { "description": "Photo updated successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Photo ID", "key$": "id" }, "albumId": { "type": "integer", "description": "Album ID the photo belongs to", "key$": "albumId" }, "title": { "type": "string", "description": "Photo title", "key$": "title" }, "url": { "type": "string", "format": "uri", "description": "Photo URL", "key$": "url" }, "thumbnailUrl": { "type": "string", "format": "uri", "description": "Photo thumbnail URL", "key$": "thumbnailUrl" } }, "x-ref": "#/components/schemas/Photo", "index$": 0 } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Photo ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const photo_ref01_ent = client.Photo();
        let photo_ref01_data = setup.data.new.photo['photo_ref01'];
        photo_ref01_data['album_id'] = setup.idmap['album01'];
        photo_ref01_data = (await photo_ref01_ent.create(photo_ref01_data)).data();
        (0, node_assert_1.default)(null != photo_ref01_data.id);
        // LIST
        const photo_ref01_match = {};
        const photo_ref01_list = (await photo_ref01_ent.list(photo_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(photo_ref01_list, { id: photo_ref01_data.id })));
        // UPDATE
        const photo_ref01_data_up0 = {};
        photo_ref01_data_up0.id = photo_ref01_data.id;
        const photo_ref01_markdef_up0 = { name: 'thumbnailUrl', value: 'Mark01-photo_ref01_' + setup.now };
        photo_ref01_data_up0[photo_ref01_markdef_up0.name] = photo_ref01_markdef_up0.value;
        const photo_ref01_resdata_up0 = (await photo_ref01_ent.update(photo_ref01_data_up0)).data();
        (0, node_assert_1.default)(photo_ref01_resdata_up0.id === photo_ref01_data_up0.id);
        (0, node_assert_1.default)(photo_ref01_resdata_up0[photo_ref01_markdef_up0.name] === photo_ref01_markdef_up0.value);
        // LOAD
        const photo_ref01_match_dt0 = {};
        photo_ref01_match_dt0.id = photo_ref01_data.id;
        const photo_ref01_data_dt0 = (await photo_ref01_ent.load(photo_ref01_match_dt0)).data();
        (0, node_assert_1.default)(photo_ref01_data_dt0.id === photo_ref01_data.id);
        // REMOVE
        const photo_ref01_match_rm0 = { id: photo_ref01_data.id };
        await photo_ref01_ent.remove(photo_ref01_match_rm0);
        // LIST
        const photo_ref01_match_rt0 = {};
        const photo_ref01_list_rt0 = (await photo_ref01_ent.list(photo_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(photo_ref01_list_rt0, { id: photo_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/photo/PhotoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.JsonplaceholderSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['photo01', 'photo02', 'photo03', 'album01', 'album02', 'album03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'JSONPLACEHOLDER_TEST_PHOTO_ENTID': idmap,
        'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
        'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['JSONPLACEHOLDER_TEST_PHOTO_ENTID'];
    const live = 'TRUE' === env.JSONPLACEHOLDER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['JSONPLACEHOLDER_TEST_PHOTO_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.JsonplaceholderSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.JSONPLACEHOLDER_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PhotoEntity.test.js.map