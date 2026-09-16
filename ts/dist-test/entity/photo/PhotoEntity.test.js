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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "albumId", "op": { "create": { "req": true, "type": "`$INTEGER`" }, "patch": { "req": true, "type": "`$INTEGER`" }, "update": { "req": true, "type": "`$INTEGER`" } }, "req": false, "short": "Album ID the photo belongs to", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "id", "req": false, "short": "Photo ID", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "format": "uri", "name": "thumbnailUrl", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "Photo thumbnail URL", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "title", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "Photo title", "type": "`$STRING`", "index$": 3 }, { "active": true, "format": "uri", "name": "url", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "Photo URL", "type": "`$STRING`", "index$": 4 }], "id": { "field": "id", "name": "id" }, "name": "photo", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /photos", "json": "{\"operationId\":\"createPhoto\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"albumId\":{\"description\":\"Album ID the photo belongs to\",\"type\":\"integer\"},\"thumbnailUrl\":{\"description\":\"Photo thumbnail URL\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Photo title\",\"type\":\"string\"},\"url\":{\"description\":\"Photo URL\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"albumId\",\"title\",\"url\",\"thumbnailUrl\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"albumId\":{\"description\":\"Album ID the photo belongs to\",\"type\":\"integer\"},\"id\":{\"description\":\"Photo ID\",\"type\":\"integer\"},\"thumbnailUrl\":{\"description\":\"Photo thumbnail URL\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Photo title\",\"type\":\"string\"},\"url\":{\"description\":\"Photo URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Photo created successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/photos", "segments": [{ "lit": "photos" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "album_id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /albums/{id}/photos", "json": "{\"operationId\":\"getAlbumPhotos\",\"parameters\":[{\"description\":\"Album ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"albumId\":{\"description\":\"Album ID the photo belongs to\",\"type\":\"integer\"},\"id\":{\"description\":\"Photo ID\",\"type\":\"integer\"},\"thumbnailUrl\":{\"description\":\"Photo thumbnail URL\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Photo title\",\"type\":\"string\"},\"url\":{\"description\":\"Photo URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/albums/{id}/photos", "rename": { "param": { "id": "album_id" } }, "segments": [{ "lit": "albums" }, { "var": "album_id" }, { "lit": "photos" }], "select": { "exist": ["album_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "album_id", "orig": "album_id", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /photos", "json": "{\"operationId\":\"getPhotos\",\"parameters\":[{\"description\":\"Filter photos by album ID\",\"in\":\"query\",\"name\":\"albumId\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"albumId\":{\"description\":\"Album ID the photo belongs to\",\"type\":\"integer\"},\"id\":{\"description\":\"Photo ID\",\"type\":\"integer\"},\"thumbnailUrl\":{\"description\":\"Photo thumbnail URL\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Photo title\",\"type\":\"string\"},\"url\":{\"description\":\"Photo URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/photos", "segments": [{ "lit": "photos" }], "select": { "exist": ["album_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /photos/{id}", "json": "{\"operationId\":\"getPhotoById\",\"parameters\":[{\"description\":\"Photo ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"albumId\":{\"description\":\"Album ID the photo belongs to\",\"type\":\"integer\"},\"id\":{\"description\":\"Photo ID\",\"type\":\"integer\"},\"thumbnailUrl\":{\"description\":\"Photo thumbnail URL\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Photo title\",\"type\":\"string\"},\"url\":{\"description\":\"Photo URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Photo not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/photos/{id}", "segments": [{ "lit": "photos" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`" }] }, "contract": { "id": "PATCH /photos/{id}", "json": "{\"operationId\":\"patchPhoto\",\"parameters\":[{\"description\":\"Photo ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"albumId\":{\"description\":\"Album ID the photo belongs to\",\"type\":\"integer\"},\"thumbnailUrl\":{\"description\":\"Photo thumbnail URL\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Photo title\",\"type\":\"string\"},\"url\":{\"description\":\"Photo URL\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"albumId\",\"title\",\"url\",\"thumbnailUrl\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"albumId\":{\"description\":\"Album ID the photo belongs to\",\"type\":\"integer\"},\"id\":{\"description\":\"Photo ID\",\"type\":\"integer\"},\"thumbnailUrl\":{\"description\":\"Photo thumbnail URL\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Photo title\",\"type\":\"string\"},\"url\":{\"description\":\"Photo URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Photo updated successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PATCH", "orig": "/photos/{id}", "segments": [{ "lit": "photos" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "DELETE /photos/{id}", "json": "{\"operationId\":\"deletePhoto\",\"parameters\":[{\"description\":\"Photo ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Photo deleted successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/photos/{id}", "segments": [{ "lit": "photos" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "PUT /photos/{id}", "json": "{\"operationId\":\"updatePhoto\",\"parameters\":[{\"description\":\"Photo ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"albumId\":{\"description\":\"Album ID the photo belongs to\",\"type\":\"integer\"},\"thumbnailUrl\":{\"description\":\"Photo thumbnail URL\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Photo title\",\"type\":\"string\"},\"url\":{\"description\":\"Photo URL\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"albumId\",\"title\",\"url\",\"thumbnailUrl\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"albumId\":{\"description\":\"Album ID the photo belongs to\",\"type\":\"integer\"},\"id\":{\"description\":\"Photo ID\",\"type\":\"integer\"},\"thumbnailUrl\":{\"description\":\"Photo thumbnail URL\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Photo title\",\"type\":\"string\"},\"url\":{\"description\":\"Photo URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Photo updated successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/photos/{id}", "segments": [{ "lit": "photos" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["album"]] }, "key$": "photo", "name__orig": "photo", "Name": "Photo", "name_": "photo", "name-": "photo", "NAME": "PHOTO", "index$": 2 }, { "active": true, "entity": "photo", "key$": "BasicPhotoFlow", "kind": "basic", "name": "BasicPhotoFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "photo_ref01" }, "match": { "album_id": "album01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "photo_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "photo_ref01", "srcdatavar": "photo_ref01_data", "suffix": "_up0", "textfield": "thumbnailUrl" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-photo_ref01" } }], "valid": [], "index$": 2 }, { "active": true, "data": {}, "input": { "ref": "photo_ref01", "srcdatavar": "photo_ref01_data", "suffix": "_dt0" }, "match": { "id": "photo01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-photo_ref01" } }], "index$": 3 }, { "active": true, "data": {}, "input": { "ref": "photo_ref01", "suffix": "_rm0" }, "match": { "id": "photo01" }, "op": "remove", "spec": [], "valid": [], "index$": 4 }, { "active": true, "data": {}, "input": { "suffix": "_rt0" }, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemNotExists", "def": { "ref": "photo_ref01" } }], "index$": 5 }] }, 'Photo');
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