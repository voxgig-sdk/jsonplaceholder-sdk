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
(0, node_test_1.describe)('AlbumEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('JSONPLACEHOLDER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.JsonplaceholderSDK.test();
        const ent = testsdk.Album();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'album.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "short": "Album ID", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "title", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "Album title", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "userId", "op": { "create": { "req": true, "type": "`$INTEGER`" }, "patch": { "req": true, "type": "`$INTEGER`" }, "update": { "req": true, "type": "`$INTEGER`" } }, "req": false, "short": "User ID who created the album", "type": "`$INTEGER`", "index$": 2 }], "id": { "field": "id", "name": "id" }, "name": "album", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /albums", "json": "{\"operationId\":\"createAlbum\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"title\":{\"description\":\"Album title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the album\",\"type\":\"integer\"}},\"required\":[\"userId\",\"title\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"description\":\"Album ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Album title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the album\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Album created successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/albums", "segments": [{ "lit": "albums" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "user_id", "orig": "user_id", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /albums", "json": "{\"operationId\":\"getAlbums\",\"parameters\":[{\"description\":\"Filter albums by user ID\",\"in\":\"query\",\"name\":\"userId\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"id\":{\"description\":\"Album ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Album title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the album\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/albums", "segments": [{ "lit": "albums" }], "select": { "exist": ["user_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "user_id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /users/{id}/albums", "json": "{\"operationId\":\"getUserAlbums\",\"parameters\":[{\"description\":\"User ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"id\":{\"description\":\"Album ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Album title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the album\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/users/{id}/albums", "rename": { "param": { "id": "user_id" } }, "segments": [{ "lit": "users" }, { "var": "user_id" }, { "lit": "albums" }], "select": { "exist": ["user_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /albums/{id}", "json": "{\"operationId\":\"getAlbumById\",\"parameters\":[{\"description\":\"Album ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"description\":\"Album ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Album title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the album\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Album not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/albums/{id}", "segments": [{ "lit": "albums" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`" }] }, "contract": { "id": "PATCH /albums/{id}", "json": "{\"operationId\":\"patchAlbum\",\"parameters\":[{\"description\":\"Album ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"title\":{\"description\":\"Album title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the album\",\"type\":\"integer\"}},\"required\":[\"userId\",\"title\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"description\":\"Album ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Album title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the album\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Album updated successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PATCH", "orig": "/albums/{id}", "segments": [{ "lit": "albums" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "DELETE /albums/{id}", "json": "{\"operationId\":\"deleteAlbum\",\"parameters\":[{\"description\":\"Album ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Album deleted successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/albums/{id}", "segments": [{ "lit": "albums" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "PUT /albums/{id}", "json": "{\"operationId\":\"updateAlbum\",\"parameters\":[{\"description\":\"Album ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"title\":{\"description\":\"Album title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the album\",\"type\":\"integer\"}},\"required\":[\"userId\",\"title\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"description\":\"Album ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Album title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the album\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Album updated successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/albums/{id}", "segments": [{ "lit": "albums" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["user"]] }, "key$": "album", "name__orig": "album", "Name": "Album", "name_": "album", "name-": "album", "NAME": "ALBUM", "index$": 0 }, { "active": true, "entity": "album", "key$": "BasicAlbumFlow", "kind": "basic", "name": "BasicAlbumFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "album_ref01" }, "match": { "user_id": "user01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": { "user_id": "user01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "album_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "album_ref01", "srcdatavar": "album_ref01_data", "suffix": "_up0", "textfield": "title" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-album_ref01" } }], "valid": [], "index$": 2 }, { "active": true, "data": {}, "input": { "ref": "album_ref01", "srcdatavar": "album_ref01_data", "suffix": "_dt0" }, "match": { "id": "album01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-album_ref01" } }], "index$": 3 }, { "active": true, "data": {}, "input": { "ref": "album_ref01", "suffix": "_rm0" }, "match": { "id": "album01" }, "op": "remove", "spec": [], "valid": [], "index$": 4 }, { "active": true, "data": {}, "input": { "suffix": "_rt0" }, "match": { "user_id": "user01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemNotExists", "def": { "ref": "album_ref01" } }], "index$": 5 }] }, 'Album');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const album_ref01_ent = client.Album();
        let album_ref01_data = setup.data.new.album['album_ref01'];
        album_ref01_data['user_id'] = setup.idmap['user01'];
        album_ref01_data = (await album_ref01_ent.create(album_ref01_data)).data();
        (0, node_assert_1.default)(null != album_ref01_data.id);
        // LIST
        const album_ref01_match = {};
        album_ref01_match['user_id'] = setup.idmap['user01'];
        const album_ref01_list = (await album_ref01_ent.list(album_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(album_ref01_list, { id: album_ref01_data.id })));
        // UPDATE
        const album_ref01_data_up0 = {};
        album_ref01_data_up0.id = album_ref01_data.id;
        const album_ref01_markdef_up0 = { name: 'title', value: 'Mark01-album_ref01_' + setup.now };
        album_ref01_data_up0[album_ref01_markdef_up0.name] = album_ref01_markdef_up0.value;
        const album_ref01_resdata_up0 = (await album_ref01_ent.update(album_ref01_data_up0)).data();
        (0, node_assert_1.default)(album_ref01_resdata_up0.id === album_ref01_data_up0.id);
        (0, node_assert_1.default)(album_ref01_resdata_up0[album_ref01_markdef_up0.name] === album_ref01_markdef_up0.value);
        // LOAD
        const album_ref01_match_dt0 = {};
        album_ref01_match_dt0.id = album_ref01_data.id;
        const album_ref01_data_dt0 = (await album_ref01_ent.load(album_ref01_match_dt0)).data();
        (0, node_assert_1.default)(album_ref01_data_dt0.id === album_ref01_data.id);
        // REMOVE
        const album_ref01_match_rm0 = { id: album_ref01_data.id };
        await album_ref01_ent.remove(album_ref01_match_rm0);
        // LIST
        const album_ref01_match_rt0 = {};
        album_ref01_match_rt0['user_id'] = setup.idmap['user01'];
        const album_ref01_list_rt0 = (await album_ref01_ent.list(album_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(album_ref01_list_rt0, { id: album_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/album/AlbumTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.JsonplaceholderSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['album01', 'album02', 'album03', 'user01', 'user02', 'user03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'JSONPLACEHOLDER_TEST_ALBUM_ENTID': idmap,
        'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
        'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['JSONPLACEHOLDER_TEST_ALBUM_ENTID'];
    const live = 'TRUE' === env.JSONPLACEHOLDER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['JSONPLACEHOLDER_TEST_ALBUM_ENTID'];
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
//# sourceMappingURL=AlbumEntity.test.js.map