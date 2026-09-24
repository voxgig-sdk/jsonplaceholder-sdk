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
(0, node_test_1.describe)('PostEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('JSONPLACEHOLDER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.JsonplaceholderSDK.test();
        const ent = testsdk.Post();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'post.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "body": { "a": true, "h": "Body", "n": "body", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Post content", "t": "`$STRING`", "key$": "body", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Post ID", "t": "`$INTEGER`", "key$": "id", "index$": 1 }, "title": { "a": true, "h": "Title", "n": "title", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Post title", "t": "`$STRING`", "key$": "title", "index$": 2 }, "userId": { "a": true, "h": "User Id", "n": "userId", "op": { "create": { "req": true, "type": "`$INTEGER`" }, "patch": { "req": true, "type": "`$INTEGER`" }, "update": { "req": true, "type": "`$INTEGER`" } }, "r": false, "sh": "User ID who created the post", "t": "`$INTEGER`", "key$": "userId", "index$": 3 } }, "id": { "field": "id", "name": "id" }, "name": "post", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /posts", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/posts", "q": {}, "r": {}, "s": [{ "lit": "posts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /posts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "user_id", "or": "user_id", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/posts", "q": { "exist": ["user_id"] }, "r": {}, "s": [{ "lit": "posts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /users/{id}/posts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "user_id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/users/{id}/posts", "q": { "exist": ["user_id"] }, "r": { "param": { "id": "user_id" } }, "s": [{ "lit": "users" }, { "var": "user_id" }, { "lit": "posts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /posts/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/posts/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "posts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "co": { "id": "PATCH /posts/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/posts/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "posts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /posts/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/posts/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "posts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /posts/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/posts/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "posts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.user"]] }, "key$": "post", "name__orig": "post", "Name": "Post", "name_": "post", "name-": "post", "NAME": "POST", "index$": 3 }, { "active": true, "entity": "post", "key$": "BasicPostFlow", "kind": "basic", "name": "BasicPostFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "post_ref01" }, "m": { "user_id": "user01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "user_id": "user01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "post_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "post_ref01", "srcdatavar": "post_ref01_data", "suffix": "_up0", "textfield": "body" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-post_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "post_ref01", "srcdatavar": "post_ref01_data", "suffix": "_dt0" }, "m": { "id": "post01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-post_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "post_ref01", "suffix": "_rm0" }, "m": { "id": "post01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "user_id": "user01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "post_ref01" } }], "index$": 5 }] }, 'Post', { "POST /posts": { "protocol": "http", "operationId": "createPost", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["title", "body", "userId"], "properties": { "userId": { "type": "integer", "description": "User ID who created the post", "key$": "userId" }, "title": { "type": "string", "description": "Post title", "key$": "title" }, "body": { "type": "string", "description": "Post content", "key$": "body" } }, "x-ref": "#/components/schemas/PostInput", "index$": 1 } } } }, "responses": { "201": { "description": "Post created successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Post ID", "key$": "id" }, "userId": { "type": "integer", "description": "User ID who created the post", "key$": "userId" }, "title": { "type": "string", "description": "Post title", "key$": "title" }, "body": { "type": "string", "description": "Post content", "key$": "body" } }, "x-ref": "#/components/schemas/Post" } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /posts": { "protocol": "http", "operationId": "getPosts", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "description": "Post ID", "key$": "id" }, "userId": { "type": "integer", "description": "User ID who created the post", "key$": "userId" }, "title": { "type": "string", "description": "Post title", "key$": "title" }, "body": { "type": "string", "description": "Post content", "key$": "body" } }, "x-ref": "#/components/schemas/Post", "index$": 0 } } } } } }, "parameters": [{ "name": "userId", "in": "query", "description": "Filter posts by user ID", "required": false, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /users/{id}/posts": { "protocol": "http", "operationId": "getUserPosts", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "description": "Post ID", "key$": "id" }, "userId": { "type": "integer", "description": "User ID who created the post", "key$": "userId" }, "title": { "type": "string", "description": "Post title", "key$": "title" }, "body": { "type": "string", "description": "Post content", "key$": "body" } }, "x-ref": "#/components/schemas/Post", "index$": 0 } } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "User ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /posts/{id}": { "protocol": "http", "operationId": "getPostById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Post ID", "key$": "id" }, "userId": { "type": "integer", "description": "User ID who created the post", "key$": "userId" }, "title": { "type": "string", "description": "Post title", "key$": "title" }, "body": { "type": "string", "description": "Post content", "key$": "body" } }, "x-ref": "#/components/schemas/Post", "index$": 0 } } } }, "404": { "description": "Post not found" } }, "parameters": [{ "name": "id", "in": "path", "description": "Post ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "PATCH /posts/{id}": { "protocol": "http", "operationId": "patchPost", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["title", "body", "userId"], "properties": { "userId": { "type": "integer", "description": "User ID who created the post", "key$": "userId" }, "title": { "type": "string", "description": "Post title", "key$": "title" }, "body": { "type": "string", "description": "Post content", "key$": "body" } }, "x-ref": "#/components/schemas/PostInput", "index$": 1 } } } }, "responses": { "200": { "description": "Post updated successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Post ID", "key$": "id" }, "userId": { "type": "integer", "description": "User ID who created the post", "key$": "userId" }, "title": { "type": "string", "description": "Post title", "key$": "title" }, "body": { "type": "string", "description": "Post content", "key$": "body" } }, "x-ref": "#/components/schemas/Post", "index$": 0 } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Post ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "DELETE /posts/{id}": { "protocol": "http", "operationId": "deletePost", "responses": { "200": { "description": "Post deleted successfully" } }, "parameters": [{ "name": "id", "in": "path", "description": "Post ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "PUT /posts/{id}": { "protocol": "http", "operationId": "updatePost", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["title", "body", "userId"], "properties": { "userId": { "type": "integer", "description": "User ID who created the post", "key$": "userId" }, "title": { "type": "string", "description": "Post title", "key$": "title" }, "body": { "type": "string", "description": "Post content", "key$": "body" } }, "x-ref": "#/components/schemas/PostInput", "index$": 1 } } } }, "responses": { "200": { "description": "Post updated successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Post ID", "key$": "id" }, "userId": { "type": "integer", "description": "User ID who created the post", "key$": "userId" }, "title": { "type": "string", "description": "Post title", "key$": "title" }, "body": { "type": "string", "description": "Post content", "key$": "body" } }, "x-ref": "#/components/schemas/Post", "index$": 0 } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Post ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const post_ref01_ent = client.Post();
        let post_ref01_data = setup.data.new.post['post_ref01'];
        post_ref01_data['user_id'] = setup.idmap['user01'];
        post_ref01_data = (await post_ref01_ent.create(post_ref01_data)).data();
        (0, node_assert_1.default)(null != post_ref01_data.id);
        // LIST
        const post_ref01_match = {};
        post_ref01_match['user_id'] = setup.idmap['user01'];
        const post_ref01_list = (await post_ref01_ent.list(post_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(post_ref01_list, { id: post_ref01_data.id })));
        // UPDATE
        const post_ref01_data_up0 = {};
        post_ref01_data_up0.id = post_ref01_data.id;
        const post_ref01_markdef_up0 = { name: 'body', value: 'Mark01-post_ref01_' + setup.now };
        post_ref01_data_up0[post_ref01_markdef_up0.name] = post_ref01_markdef_up0.value;
        const post_ref01_resdata_up0 = (await post_ref01_ent.update(post_ref01_data_up0)).data();
        (0, node_assert_1.default)(post_ref01_resdata_up0.id === post_ref01_data_up0.id);
        (0, node_assert_1.default)(post_ref01_resdata_up0[post_ref01_markdef_up0.name] === post_ref01_markdef_up0.value);
        // LOAD
        const post_ref01_match_dt0 = {};
        post_ref01_match_dt0.id = post_ref01_data.id;
        const post_ref01_data_dt0 = (await post_ref01_ent.load(post_ref01_match_dt0)).data();
        (0, node_assert_1.default)(post_ref01_data_dt0.id === post_ref01_data.id);
        // REMOVE
        const post_ref01_match_rm0 = { id: post_ref01_data.id };
        await post_ref01_ent.remove(post_ref01_match_rm0);
        // LIST
        const post_ref01_match_rt0 = {};
        post_ref01_match_rt0['user_id'] = setup.idmap['user01'];
        const post_ref01_list_rt0 = (await post_ref01_ent.list(post_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(post_ref01_list_rt0, { id: post_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/post/PostTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.JsonplaceholderSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['post01', 'post02', 'post03', 'user01', 'user02', 'user03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'JSONPLACEHOLDER_TEST_POST_ENTID': idmap,
        'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
        'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['JSONPLACEHOLDER_TEST_POST_ENTID'];
    const live = 'TRUE' === env.JSONPLACEHOLDER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['JSONPLACEHOLDER_TEST_POST_ENTID'];
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
//# sourceMappingURL=PostEntity.test.js.map