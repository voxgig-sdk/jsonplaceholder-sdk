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
(0, node_test_1.describe)('UserEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('JSONPLACEHOLDER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.JsonplaceholderSDK.test();
        const ent = testsdk.User();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'user.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "address", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "company", "req": false, "type": "`$OBJECT`", "index$": 1 }, { "active": true, "format": "email", "name": "email", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "User email", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "id", "req": false, "short": "User ID", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "name", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "User full name", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "phone", "req": false, "short": "User phone number", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "username", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "Username", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "website", "req": false, "short": "User website", "type": "`$STRING`", "index$": 7 }], "id": { "field": "id", "name": "id" }, "name": "user", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /users", "json": "{\"operationId\":\"createUser\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"properties\":{\"city\":{\"description\":\"City\",\"type\":\"string\"},\"geo\":{\"properties\":{\"lat\":{\"description\":\"Latitude\",\"type\":\"string\"},\"lng\":{\"description\":\"Longitude\",\"type\":\"string\"}},\"type\":\"object\"},\"street\":{\"description\":\"Street address\",\"type\":\"string\"},\"suite\":{\"description\":\"Suite/apartment number\",\"type\":\"string\"},\"zipcode\":{\"description\":\"ZIP/postal code\",\"type\":\"string\"}},\"type\":\"object\"},\"company\":{\"properties\":{\"bs\":{\"description\":\"Company business\",\"type\":\"string\"},\"catchPhrase\":{\"description\":\"Company catch phrase\",\"type\":\"string\"},\"name\":{\"description\":\"Company name\",\"type\":\"string\"}},\"type\":\"object\"},\"email\":{\"description\":\"User email\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"User full name\",\"type\":\"string\"},\"phone\":{\"description\":\"User phone number\",\"type\":\"string\"},\"username\":{\"description\":\"Username\",\"type\":\"string\"},\"website\":{\"description\":\"User website\",\"type\":\"string\"}},\"required\":[\"name\",\"username\",\"email\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"properties\":{\"city\":{\"description\":\"City\",\"type\":\"string\"},\"geo\":{\"properties\":{\"lat\":{\"description\":\"Latitude\",\"type\":\"string\"},\"lng\":{\"description\":\"Longitude\",\"type\":\"string\"}},\"type\":\"object\"},\"street\":{\"description\":\"Street address\",\"type\":\"string\"},\"suite\":{\"description\":\"Suite/apartment number\",\"type\":\"string\"},\"zipcode\":{\"description\":\"ZIP/postal code\",\"type\":\"string\"}},\"type\":\"object\"},\"company\":{\"properties\":{\"bs\":{\"description\":\"Company business\",\"type\":\"string\"},\"catchPhrase\":{\"description\":\"Company catch phrase\",\"type\":\"string\"},\"name\":{\"description\":\"Company name\",\"type\":\"string\"}},\"type\":\"object\"},\"email\":{\"description\":\"User email\",\"format\":\"email\",\"type\":\"string\"},\"id\":{\"description\":\"User ID\",\"type\":\"integer\"},\"name\":{\"description\":\"User full name\",\"type\":\"string\"},\"phone\":{\"description\":\"User phone number\",\"type\":\"string\"},\"username\":{\"description\":\"Username\",\"type\":\"string\"},\"website\":{\"description\":\"User website\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"User created successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/users", "segments": [{ "lit": "users" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /users", "json": "{\"operationId\":\"getUsers\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"address\":{\"properties\":{\"city\":{\"description\":\"City\",\"type\":\"string\"},\"geo\":{\"properties\":{\"lat\":{\"description\":\"Latitude\",\"type\":\"string\"},\"lng\":{\"description\":\"Longitude\",\"type\":\"string\"}},\"type\":\"object\"},\"street\":{\"description\":\"Street address\",\"type\":\"string\"},\"suite\":{\"description\":\"Suite/apartment number\",\"type\":\"string\"},\"zipcode\":{\"description\":\"ZIP/postal code\",\"type\":\"string\"}},\"type\":\"object\"},\"company\":{\"properties\":{\"bs\":{\"description\":\"Company business\",\"type\":\"string\"},\"catchPhrase\":{\"description\":\"Company catch phrase\",\"type\":\"string\"},\"name\":{\"description\":\"Company name\",\"type\":\"string\"}},\"type\":\"object\"},\"email\":{\"description\":\"User email\",\"format\":\"email\",\"type\":\"string\"},\"id\":{\"description\":\"User ID\",\"type\":\"integer\"},\"name\":{\"description\":\"User full name\",\"type\":\"string\"},\"phone\":{\"description\":\"User phone number\",\"type\":\"string\"},\"username\":{\"description\":\"Username\",\"type\":\"string\"},\"website\":{\"description\":\"User website\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/users", "segments": [{ "lit": "users" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /users/{id}", "json": "{\"operationId\":\"getUserById\",\"parameters\":[{\"description\":\"User ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"properties\":{\"city\":{\"description\":\"City\",\"type\":\"string\"},\"geo\":{\"properties\":{\"lat\":{\"description\":\"Latitude\",\"type\":\"string\"},\"lng\":{\"description\":\"Longitude\",\"type\":\"string\"}},\"type\":\"object\"},\"street\":{\"description\":\"Street address\",\"type\":\"string\"},\"suite\":{\"description\":\"Suite/apartment number\",\"type\":\"string\"},\"zipcode\":{\"description\":\"ZIP/postal code\",\"type\":\"string\"}},\"type\":\"object\"},\"company\":{\"properties\":{\"bs\":{\"description\":\"Company business\",\"type\":\"string\"},\"catchPhrase\":{\"description\":\"Company catch phrase\",\"type\":\"string\"},\"name\":{\"description\":\"Company name\",\"type\":\"string\"}},\"type\":\"object\"},\"email\":{\"description\":\"User email\",\"format\":\"email\",\"type\":\"string\"},\"id\":{\"description\":\"User ID\",\"type\":\"integer\"},\"name\":{\"description\":\"User full name\",\"type\":\"string\"},\"phone\":{\"description\":\"User phone number\",\"type\":\"string\"},\"username\":{\"description\":\"Username\",\"type\":\"string\"},\"website\":{\"description\":\"User website\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"User not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/users/{id}", "segments": [{ "lit": "users" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`" }] }, "contract": { "id": "PATCH /users/{id}", "json": "{\"operationId\":\"patchUser\",\"parameters\":[{\"description\":\"User ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"properties\":{\"city\":{\"description\":\"City\",\"type\":\"string\"},\"geo\":{\"properties\":{\"lat\":{\"description\":\"Latitude\",\"type\":\"string\"},\"lng\":{\"description\":\"Longitude\",\"type\":\"string\"}},\"type\":\"object\"},\"street\":{\"description\":\"Street address\",\"type\":\"string\"},\"suite\":{\"description\":\"Suite/apartment number\",\"type\":\"string\"},\"zipcode\":{\"description\":\"ZIP/postal code\",\"type\":\"string\"}},\"type\":\"object\"},\"company\":{\"properties\":{\"bs\":{\"description\":\"Company business\",\"type\":\"string\"},\"catchPhrase\":{\"description\":\"Company catch phrase\",\"type\":\"string\"},\"name\":{\"description\":\"Company name\",\"type\":\"string\"}},\"type\":\"object\"},\"email\":{\"description\":\"User email\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"User full name\",\"type\":\"string\"},\"phone\":{\"description\":\"User phone number\",\"type\":\"string\"},\"username\":{\"description\":\"Username\",\"type\":\"string\"},\"website\":{\"description\":\"User website\",\"type\":\"string\"}},\"required\":[\"name\",\"username\",\"email\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"properties\":{\"city\":{\"description\":\"City\",\"type\":\"string\"},\"geo\":{\"properties\":{\"lat\":{\"description\":\"Latitude\",\"type\":\"string\"},\"lng\":{\"description\":\"Longitude\",\"type\":\"string\"}},\"type\":\"object\"},\"street\":{\"description\":\"Street address\",\"type\":\"string\"},\"suite\":{\"description\":\"Suite/apartment number\",\"type\":\"string\"},\"zipcode\":{\"description\":\"ZIP/postal code\",\"type\":\"string\"}},\"type\":\"object\"},\"company\":{\"properties\":{\"bs\":{\"description\":\"Company business\",\"type\":\"string\"},\"catchPhrase\":{\"description\":\"Company catch phrase\",\"type\":\"string\"},\"name\":{\"description\":\"Company name\",\"type\":\"string\"}},\"type\":\"object\"},\"email\":{\"description\":\"User email\",\"format\":\"email\",\"type\":\"string\"},\"id\":{\"description\":\"User ID\",\"type\":\"integer\"},\"name\":{\"description\":\"User full name\",\"type\":\"string\"},\"phone\":{\"description\":\"User phone number\",\"type\":\"string\"},\"username\":{\"description\":\"Username\",\"type\":\"string\"},\"website\":{\"description\":\"User website\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"User updated successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PATCH", "orig": "/users/{id}", "segments": [{ "lit": "users" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "DELETE /users/{id}", "json": "{\"operationId\":\"deleteUser\",\"parameters\":[{\"description\":\"User ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"User deleted successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/users/{id}", "segments": [{ "lit": "users" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "PUT /users/{id}", "json": "{\"operationId\":\"updateUser\",\"parameters\":[{\"description\":\"User ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"properties\":{\"city\":{\"description\":\"City\",\"type\":\"string\"},\"geo\":{\"properties\":{\"lat\":{\"description\":\"Latitude\",\"type\":\"string\"},\"lng\":{\"description\":\"Longitude\",\"type\":\"string\"}},\"type\":\"object\"},\"street\":{\"description\":\"Street address\",\"type\":\"string\"},\"suite\":{\"description\":\"Suite/apartment number\",\"type\":\"string\"},\"zipcode\":{\"description\":\"ZIP/postal code\",\"type\":\"string\"}},\"type\":\"object\"},\"company\":{\"properties\":{\"bs\":{\"description\":\"Company business\",\"type\":\"string\"},\"catchPhrase\":{\"description\":\"Company catch phrase\",\"type\":\"string\"},\"name\":{\"description\":\"Company name\",\"type\":\"string\"}},\"type\":\"object\"},\"email\":{\"description\":\"User email\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"User full name\",\"type\":\"string\"},\"phone\":{\"description\":\"User phone number\",\"type\":\"string\"},\"username\":{\"description\":\"Username\",\"type\":\"string\"},\"website\":{\"description\":\"User website\",\"type\":\"string\"}},\"required\":[\"name\",\"username\",\"email\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"properties\":{\"city\":{\"description\":\"City\",\"type\":\"string\"},\"geo\":{\"properties\":{\"lat\":{\"description\":\"Latitude\",\"type\":\"string\"},\"lng\":{\"description\":\"Longitude\",\"type\":\"string\"}},\"type\":\"object\"},\"street\":{\"description\":\"Street address\",\"type\":\"string\"},\"suite\":{\"description\":\"Suite/apartment number\",\"type\":\"string\"},\"zipcode\":{\"description\":\"ZIP/postal code\",\"type\":\"string\"}},\"type\":\"object\"},\"company\":{\"properties\":{\"bs\":{\"description\":\"Company business\",\"type\":\"string\"},\"catchPhrase\":{\"description\":\"Company catch phrase\",\"type\":\"string\"},\"name\":{\"description\":\"Company name\",\"type\":\"string\"}},\"type\":\"object\"},\"email\":{\"description\":\"User email\",\"format\":\"email\",\"type\":\"string\"},\"id\":{\"description\":\"User ID\",\"type\":\"integer\"},\"name\":{\"description\":\"User full name\",\"type\":\"string\"},\"phone\":{\"description\":\"User phone number\",\"type\":\"string\"},\"username\":{\"description\":\"Username\",\"type\":\"string\"},\"website\":{\"description\":\"User website\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"User updated successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/users/{id}", "segments": [{ "lit": "users" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "user", "name__orig": "user", "Name": "User", "name_": "user", "name-": "user", "NAME": "USER", "index$": 5 }, { "active": true, "entity": "user", "key$": "BasicUserFlow", "kind": "basic", "name": "BasicUserFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "user_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "user_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "user_ref01", "srcdatavar": "user_ref01_data", "suffix": "_up0", "textfield": "email" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-user_ref01" } }], "valid": [], "index$": 2 }, { "active": true, "data": {}, "input": { "ref": "user_ref01", "srcdatavar": "user_ref01_data", "suffix": "_dt0" }, "match": { "id": "user01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-user_ref01" } }], "index$": 3 }, { "active": true, "data": {}, "input": { "ref": "user_ref01", "suffix": "_rm0" }, "match": { "id": "user01" }, "op": "remove", "spec": [], "valid": [], "index$": 4 }, { "active": true, "data": {}, "input": { "suffix": "_rt0" }, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemNotExists", "def": { "ref": "user_ref01" } }], "index$": 5 }] }, 'User');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const user_ref01_ent = client.User();
        let user_ref01_data = setup.data.new.user['user_ref01'];
        user_ref01_data = (await user_ref01_ent.create(user_ref01_data)).data();
        (0, node_assert_1.default)(null != user_ref01_data.id);
        // LIST
        const user_ref01_match = {};
        const user_ref01_list = (await user_ref01_ent.list(user_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(user_ref01_list, { id: user_ref01_data.id })));
        // UPDATE
        const user_ref01_data_up0 = {};
        user_ref01_data_up0.id = user_ref01_data.id;
        const user_ref01_markdef_up0 = { name: 'email', value: 'Mark01-user_ref01_' + setup.now };
        user_ref01_data_up0[user_ref01_markdef_up0.name] = user_ref01_markdef_up0.value;
        const user_ref01_resdata_up0 = (await user_ref01_ent.update(user_ref01_data_up0)).data();
        (0, node_assert_1.default)(user_ref01_resdata_up0.id === user_ref01_data_up0.id);
        (0, node_assert_1.default)(user_ref01_resdata_up0[user_ref01_markdef_up0.name] === user_ref01_markdef_up0.value);
        // LOAD
        const user_ref01_match_dt0 = {};
        user_ref01_match_dt0.id = user_ref01_data.id;
        const user_ref01_data_dt0 = (await user_ref01_ent.load(user_ref01_match_dt0)).data();
        (0, node_assert_1.default)(user_ref01_data_dt0.id === user_ref01_data.id);
        // REMOVE
        const user_ref01_match_rm0 = { id: user_ref01_data.id };
        await user_ref01_ent.remove(user_ref01_match_rm0);
        // LIST
        const user_ref01_match_rt0 = {};
        const user_ref01_list_rt0 = (await user_ref01_ent.list(user_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(user_ref01_list_rt0, { id: user_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/user/UserTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.JsonplaceholderSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['user01', 'user02', 'user03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'JSONPLACEHOLDER_TEST_USER_ENTID': idmap,
        'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
        'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['JSONPLACEHOLDER_TEST_USER_ENTID'];
    const live = 'TRUE' === env.JSONPLACEHOLDER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['JSONPLACEHOLDER_TEST_USER_ENTID'];
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
//# sourceMappingURL=UserEntity.test.js.map