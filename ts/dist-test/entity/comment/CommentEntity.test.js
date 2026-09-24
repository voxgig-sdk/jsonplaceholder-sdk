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
(0, node_test_1.describe)('CommentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('JSONPLACEHOLDER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.JsonplaceholderSDK.test();
        const ent = testsdk.Comment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'comment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "body": { "a": true, "h": "Body", "n": "body", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Comment content", "t": "`$STRING`", "key$": "body", "index$": 0 }, "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Email of the commenter", "t": "`$STRING`", "key$": "email", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Comment ID", "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Comment name/title", "t": "`$STRING`", "key$": "name", "index$": 3 }, "postId": { "a": true, "h": "Post Id", "n": "postId", "op": { "create": { "req": true, "type": "`$INTEGER`" }, "patch": { "req": true, "type": "`$INTEGER`" }, "update": { "req": true, "type": "`$INTEGER`" } }, "r": false, "sh": "Post ID the comment belongs to", "t": "`$INTEGER`", "key$": "postId", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "comment", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /comments", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/comments", "q": {}, "r": {}, "s": [{ "lit": "comments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /comments", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "post_id", "or": "post_id", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/comments", "q": { "exist": ["post_id"] }, "r": {}, "s": [{ "lit": "comments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /posts/{id}/comments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "post_id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/posts/{id}/comments", "q": { "exist": ["post_id"] }, "r": { "param": { "id": "post_id" } }, "s": [{ "lit": "posts" }, { "var": "post_id" }, { "lit": "comments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /comments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/comments/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "comments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "co": { "id": "PATCH /comments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/comments/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "comments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /comments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/comments/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "comments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /comments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/comments/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "comments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.post"]] }, "key$": "comment", "name__orig": "comment", "Name": "Comment", "name_": "comment", "name-": "comment", "NAME": "COMMENT", "index$": 1 }, { "active": true, "entity": "comment", "key$": "BasicCommentFlow", "kind": "basic", "name": "BasicCommentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "comment_ref01" }, "m": { "post_id": "post01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "post_id": "post01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "comment_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "comment_ref01", "srcdatavar": "comment_ref01_data", "suffix": "_up0", "textfield": "body" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-comment_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "comment_ref01", "srcdatavar": "comment_ref01_data", "suffix": "_dt0" }, "m": { "id": "comment01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-comment_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "comment_ref01", "suffix": "_rm0" }, "m": { "id": "comment01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "post_id": "post01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "comment_ref01" } }], "index$": 5 }] }, 'Comment', { "POST /comments": { "protocol": "http", "operationId": "createComment", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["postId", "name", "email", "body"], "properties": { "postId": { "type": "integer", "description": "Post ID the comment belongs to", "key$": "postId" }, "name": { "type": "string", "description": "Comment name/title", "key$": "name" }, "email": { "type": "string", "format": "email", "description": "Email of the commenter", "key$": "email" }, "body": { "type": "string", "description": "Comment content", "key$": "body" } }, "x-ref": "#/components/schemas/CommentInput", "index$": 1 } } } }, "responses": { "201": { "description": "Comment created successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Comment ID", "key$": "id" }, "postId": { "type": "integer", "description": "Post ID the comment belongs to", "key$": "postId" }, "name": { "type": "string", "description": "Comment name/title", "key$": "name" }, "email": { "type": "string", "format": "email", "description": "Email of the commenter", "key$": "email" }, "body": { "type": "string", "description": "Comment content", "key$": "body" } }, "x-ref": "#/components/schemas/Comment" } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /comments": { "protocol": "http", "operationId": "getComments", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "description": "Comment ID", "key$": "id" }, "postId": { "type": "integer", "description": "Post ID the comment belongs to", "key$": "postId" }, "name": { "type": "string", "description": "Comment name/title", "key$": "name" }, "email": { "type": "string", "format": "email", "description": "Email of the commenter", "key$": "email" }, "body": { "type": "string", "description": "Comment content", "key$": "body" } }, "x-ref": "#/components/schemas/Comment", "index$": 0 } } } } } }, "parameters": [{ "name": "postId", "in": "query", "description": "Filter comments by post ID", "required": false, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /posts/{id}/comments": { "protocol": "http", "operationId": "getPostComments", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "description": "Comment ID", "key$": "id" }, "postId": { "type": "integer", "description": "Post ID the comment belongs to", "key$": "postId" }, "name": { "type": "string", "description": "Comment name/title", "key$": "name" }, "email": { "type": "string", "format": "email", "description": "Email of the commenter", "key$": "email" }, "body": { "type": "string", "description": "Comment content", "key$": "body" } }, "x-ref": "#/components/schemas/Comment", "index$": 0 } } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Post ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /comments/{id}": { "protocol": "http", "operationId": "getCommentById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Comment ID", "key$": "id" }, "postId": { "type": "integer", "description": "Post ID the comment belongs to", "key$": "postId" }, "name": { "type": "string", "description": "Comment name/title", "key$": "name" }, "email": { "type": "string", "format": "email", "description": "Email of the commenter", "key$": "email" }, "body": { "type": "string", "description": "Comment content", "key$": "body" } }, "x-ref": "#/components/schemas/Comment", "index$": 0 } } } }, "404": { "description": "Comment not found" } }, "parameters": [{ "name": "id", "in": "path", "description": "Comment ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "PATCH /comments/{id}": { "protocol": "http", "operationId": "patchComment", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["postId", "name", "email", "body"], "properties": { "postId": { "type": "integer", "description": "Post ID the comment belongs to", "key$": "postId" }, "name": { "type": "string", "description": "Comment name/title", "key$": "name" }, "email": { "type": "string", "format": "email", "description": "Email of the commenter", "key$": "email" }, "body": { "type": "string", "description": "Comment content", "key$": "body" } }, "x-ref": "#/components/schemas/CommentInput", "index$": 1 } } } }, "responses": { "200": { "description": "Comment updated successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Comment ID", "key$": "id" }, "postId": { "type": "integer", "description": "Post ID the comment belongs to", "key$": "postId" }, "name": { "type": "string", "description": "Comment name/title", "key$": "name" }, "email": { "type": "string", "format": "email", "description": "Email of the commenter", "key$": "email" }, "body": { "type": "string", "description": "Comment content", "key$": "body" } }, "x-ref": "#/components/schemas/Comment", "index$": 0 } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Comment ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "DELETE /comments/{id}": { "protocol": "http", "operationId": "deleteComment", "responses": { "200": { "description": "Comment deleted successfully" } }, "parameters": [{ "name": "id", "in": "path", "description": "Comment ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "PUT /comments/{id}": { "protocol": "http", "operationId": "updateComment", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["postId", "name", "email", "body"], "properties": { "postId": { "type": "integer", "description": "Post ID the comment belongs to", "key$": "postId" }, "name": { "type": "string", "description": "Comment name/title", "key$": "name" }, "email": { "type": "string", "format": "email", "description": "Email of the commenter", "key$": "email" }, "body": { "type": "string", "description": "Comment content", "key$": "body" } }, "x-ref": "#/components/schemas/CommentInput", "index$": 1 } } } }, "responses": { "200": { "description": "Comment updated successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Comment ID", "key$": "id" }, "postId": { "type": "integer", "description": "Post ID the comment belongs to", "key$": "postId" }, "name": { "type": "string", "description": "Comment name/title", "key$": "name" }, "email": { "type": "string", "format": "email", "description": "Email of the commenter", "key$": "email" }, "body": { "type": "string", "description": "Comment content", "key$": "body" } }, "x-ref": "#/components/schemas/Comment", "index$": 0 } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Comment ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const comment_ref01_ent = client.Comment();
        let comment_ref01_data = setup.data.new.comment['comment_ref01'];
        comment_ref01_data['post_id'] = setup.idmap['post01'];
        comment_ref01_data = (await comment_ref01_ent.create(comment_ref01_data)).data();
        (0, node_assert_1.default)(null != comment_ref01_data.id);
        // LIST
        const comment_ref01_match = {};
        comment_ref01_match['post_id'] = setup.idmap['post01'];
        const comment_ref01_list = (await comment_ref01_ent.list(comment_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(comment_ref01_list, { id: comment_ref01_data.id })));
        // UPDATE
        const comment_ref01_data_up0 = {};
        comment_ref01_data_up0.id = comment_ref01_data.id;
        const comment_ref01_markdef_up0 = { name: 'body', value: 'Mark01-comment_ref01_' + setup.now };
        comment_ref01_data_up0[comment_ref01_markdef_up0.name] = comment_ref01_markdef_up0.value;
        const comment_ref01_resdata_up0 = (await comment_ref01_ent.update(comment_ref01_data_up0)).data();
        (0, node_assert_1.default)(comment_ref01_resdata_up0.id === comment_ref01_data_up0.id);
        (0, node_assert_1.default)(comment_ref01_resdata_up0[comment_ref01_markdef_up0.name] === comment_ref01_markdef_up0.value);
        // LOAD
        const comment_ref01_match_dt0 = {};
        comment_ref01_match_dt0.id = comment_ref01_data.id;
        const comment_ref01_data_dt0 = (await comment_ref01_ent.load(comment_ref01_match_dt0)).data();
        (0, node_assert_1.default)(comment_ref01_data_dt0.id === comment_ref01_data.id);
        // REMOVE
        const comment_ref01_match_rm0 = { id: comment_ref01_data.id };
        await comment_ref01_ent.remove(comment_ref01_match_rm0);
        // LIST
        const comment_ref01_match_rt0 = {};
        comment_ref01_match_rt0['post_id'] = setup.idmap['post01'];
        const comment_ref01_list_rt0 = (await comment_ref01_ent.list(comment_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(comment_ref01_list_rt0, { id: comment_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/comment/CommentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.JsonplaceholderSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['comment01', 'comment02', 'comment03', 'post01', 'post02', 'post03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'JSONPLACEHOLDER_TEST_COMMENT_ENTID': idmap,
        'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
        'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['JSONPLACEHOLDER_TEST_COMMENT_ENTID'];
    const live = 'TRUE' === env.JSONPLACEHOLDER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['JSONPLACEHOLDER_TEST_COMMENT_ENTID'];
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
//# sourceMappingURL=CommentEntity.test.js.map