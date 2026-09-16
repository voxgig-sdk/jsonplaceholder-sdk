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
(0, node_test_1.describe)('TodoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('JSONPLACEHOLDER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.JsonplaceholderSDK.test();
        const ent = testsdk.Todo();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'todo.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "completed", "op": { "create": { "req": true, "type": "`$BOOLEAN`" }, "patch": { "req": true, "type": "`$BOOLEAN`" }, "update": { "req": true, "type": "`$BOOLEAN`" } }, "req": false, "short": "Todo completion status", "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "name": "id", "req": false, "short": "Todo ID", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "title", "op": { "create": { "req": true, "type": "`$STRING`" }, "patch": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "Todo title", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "userId", "op": { "create": { "req": true, "type": "`$INTEGER`" }, "patch": { "req": true, "type": "`$INTEGER`" }, "update": { "req": true, "type": "`$INTEGER`" } }, "req": false, "short": "User ID who created the todo", "type": "`$INTEGER`", "index$": 3 }], "id": { "field": "id", "name": "id" }, "name": "todo", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /todos", "json": "{\"operationId\":\"createTodo\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"completed\":{\"description\":\"Todo completion status\",\"type\":\"boolean\"},\"title\":{\"description\":\"Todo title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the todo\",\"type\":\"integer\"}},\"required\":[\"userId\",\"title\",\"completed\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"completed\":{\"description\":\"Todo completion status\",\"type\":\"boolean\"},\"id\":{\"description\":\"Todo ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Todo title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the todo\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Todo created successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/todos", "segments": [{ "lit": "todos" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "user_id", "orig": "user_id", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /todos", "json": "{\"operationId\":\"getTodos\",\"parameters\":[{\"description\":\"Filter todos by user ID\",\"in\":\"query\",\"name\":\"userId\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"completed\":{\"description\":\"Todo completion status\",\"type\":\"boolean\"},\"id\":{\"description\":\"Todo ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Todo title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the todo\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/todos", "segments": [{ "lit": "todos" }], "select": { "exist": ["user_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "user_id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /users/{id}/todos", "json": "{\"operationId\":\"getUserTodos\",\"parameters\":[{\"description\":\"User ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"completed\":{\"description\":\"Todo completion status\",\"type\":\"boolean\"},\"id\":{\"description\":\"Todo ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Todo title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the todo\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/users/{id}/todos", "rename": { "param": { "id": "user_id" } }, "segments": [{ "lit": "users" }, { "var": "user_id" }, { "lit": "todos" }], "select": { "exist": ["user_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /todos/{id}", "json": "{\"operationId\":\"getTodoById\",\"parameters\":[{\"description\":\"Todo ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"completed\":{\"description\":\"Todo completion status\",\"type\":\"boolean\"},\"id\":{\"description\":\"Todo ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Todo title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the todo\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Todo not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/todos/{id}", "segments": [{ "lit": "todos" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`" }] }, "contract": { "id": "PATCH /todos/{id}", "json": "{\"operationId\":\"patchTodo\",\"parameters\":[{\"description\":\"Todo ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"completed\":{\"description\":\"Todo completion status\",\"type\":\"boolean\"},\"title\":{\"description\":\"Todo title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the todo\",\"type\":\"integer\"}},\"required\":[\"userId\",\"title\",\"completed\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"completed\":{\"description\":\"Todo completion status\",\"type\":\"boolean\"},\"id\":{\"description\":\"Todo ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Todo title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the todo\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Todo updated successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PATCH", "orig": "/todos/{id}", "segments": [{ "lit": "todos" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "DELETE /todos/{id}", "json": "{\"operationId\":\"deleteTodo\",\"parameters\":[{\"description\":\"Todo ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Todo deleted successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/todos/{id}", "segments": [{ "lit": "todos" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "PUT /todos/{id}", "json": "{\"operationId\":\"updateTodo\",\"parameters\":[{\"description\":\"Todo ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"completed\":{\"description\":\"Todo completion status\",\"type\":\"boolean\"},\"title\":{\"description\":\"Todo title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the todo\",\"type\":\"integer\"}},\"required\":[\"userId\",\"title\",\"completed\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"completed\":{\"description\":\"Todo completion status\",\"type\":\"boolean\"},\"id\":{\"description\":\"Todo ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Todo title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the todo\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Todo updated successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/todos/{id}", "segments": [{ "lit": "todos" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["user"]] }, "key$": "todo", "name__orig": "todo", "Name": "Todo", "name_": "todo", "name-": "todo", "NAME": "TODO", "index$": 4 }, { "active": true, "entity": "todo", "key$": "BasicTodoFlow", "kind": "basic", "name": "BasicTodoFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "todo_ref01" }, "match": { "user_id": "user01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": { "user_id": "user01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "todo_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "todo_ref01", "srcdatavar": "todo_ref01_data", "suffix": "_up0", "textfield": "title" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-todo_ref01" } }], "valid": [], "index$": 2 }, { "active": true, "data": {}, "input": { "ref": "todo_ref01", "srcdatavar": "todo_ref01_data", "suffix": "_dt0" }, "match": { "id": "todo01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-todo_ref01" } }], "index$": 3 }, { "active": true, "data": {}, "input": { "ref": "todo_ref01", "suffix": "_rm0" }, "match": { "id": "todo01" }, "op": "remove", "spec": [], "valid": [], "index$": 4 }, { "active": true, "data": {}, "input": { "suffix": "_rt0" }, "match": { "user_id": "user01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemNotExists", "def": { "ref": "todo_ref01" } }], "index$": 5 }] }, 'Todo');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const todo_ref01_ent = client.Todo();
        let todo_ref01_data = setup.data.new.todo['todo_ref01'];
        todo_ref01_data['user_id'] = setup.idmap['user01'];
        todo_ref01_data = (await todo_ref01_ent.create(todo_ref01_data)).data();
        (0, node_assert_1.default)(null != todo_ref01_data.id);
        // LIST
        const todo_ref01_match = {};
        todo_ref01_match['user_id'] = setup.idmap['user01'];
        const todo_ref01_list = (await todo_ref01_ent.list(todo_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(todo_ref01_list, { id: todo_ref01_data.id })));
        // UPDATE
        const todo_ref01_data_up0 = {};
        todo_ref01_data_up0.id = todo_ref01_data.id;
        const todo_ref01_markdef_up0 = { name: 'title', value: 'Mark01-todo_ref01_' + setup.now };
        todo_ref01_data_up0[todo_ref01_markdef_up0.name] = todo_ref01_markdef_up0.value;
        const todo_ref01_resdata_up0 = (await todo_ref01_ent.update(todo_ref01_data_up0)).data();
        (0, node_assert_1.default)(todo_ref01_resdata_up0.id === todo_ref01_data_up0.id);
        (0, node_assert_1.default)(todo_ref01_resdata_up0[todo_ref01_markdef_up0.name] === todo_ref01_markdef_up0.value);
        // LOAD
        const todo_ref01_match_dt0 = {};
        todo_ref01_match_dt0.id = todo_ref01_data.id;
        const todo_ref01_data_dt0 = (await todo_ref01_ent.load(todo_ref01_match_dt0)).data();
        (0, node_assert_1.default)(todo_ref01_data_dt0.id === todo_ref01_data.id);
        // REMOVE
        const todo_ref01_match_rm0 = { id: todo_ref01_data.id };
        await todo_ref01_ent.remove(todo_ref01_match_rm0);
        // LIST
        const todo_ref01_match_rt0 = {};
        todo_ref01_match_rt0['user_id'] = setup.idmap['user01'];
        const todo_ref01_list_rt0 = (await todo_ref01_ent.list(todo_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(todo_ref01_list_rt0, { id: todo_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/todo/TodoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.JsonplaceholderSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['todo01', 'todo02', 'todo03', 'user01', 'user02', 'user03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'JSONPLACEHOLDER_TEST_TODO_ENTID': idmap,
        'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
        'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['JSONPLACEHOLDER_TEST_TODO_ENTID'];
    const live = 'TRUE' === env.JSONPLACEHOLDER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['JSONPLACEHOLDER_TEST_TODO_ENTID'];
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
//# sourceMappingURL=TodoEntity.test.js.map