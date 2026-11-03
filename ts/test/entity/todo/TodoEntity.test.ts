

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { JsonplaceholderSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TodoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
  afterEach(liveDelay('JSONPLACEHOLDER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = JsonplaceholderSDK.test()
    const ent = testsdk.Todo()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('todo hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of JsonplaceholderSDK.test(offline).Todo().stream('list')) { }
    }, /offline/)

    for await (const _item of JsonplaceholderSDK.test(offline).Todo()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = JsonplaceholderSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Todo().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of JsonplaceholderSDK.test().Todo().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new JsonplaceholderSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Todo().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Todo().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = JsonplaceholderSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Todo().list({"user_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'todo.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"completed":{"a":true,"h":"Completed","n":"completed","op":{"create":{"req":true,"type":"`$BOOLEAN`"},"patch":{"req":true,"type":"`$BOOLEAN`"},"update":{"req":true,"type":"`$BOOLEAN`"}},"r":false,"sh":"Todo completion status","t":"`$BOOLEAN`","key$":"completed","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Todo ID","t":"`$INTEGER`","key$":"id","index$":1},"title":{"a":true,"h":"Title","n":"title","op":{"create":{"req":true,"type":"`$STRING`"},"patch":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Todo title","t":"`$STRING`","key$":"title","index$":2},"userId":{"a":true,"h":"User Id","n":"userId","op":{"create":{"req":true,"type":"`$INTEGER`"},"patch":{"req":true,"type":"`$INTEGER`"},"update":{"req":true,"type":"`$INTEGER`"}},"r":false,"sh":"User ID who created the todo","t":"`$INTEGER`","key$":"userId","index$":3}},"id":{"field":"id","name":"id"},"name":"todo","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["completed","title","userId"],"co":{"id":"POST /todos","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/todos","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"todos"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /users/{id}/todos","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":1,"k":"param","n":"user_id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/users/{id}/todos","q":{"exist":["user_id"]},"r":{"param":{"id":"user_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"users"},{"var":"user_id"},{"lit":"todos"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /todos","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"user_id","or":"userId","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/todos","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"todos"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /todos/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":1,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/todos/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"todos"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["completed","title","userId"],"co":{"id":"PATCH /todos/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PATCH","o":"/todos/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"todos"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /todos/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/todos/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"todos"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["completed","title","userId"],"co":{"id":"PUT /todos/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PUT","o":"/todos/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"todos"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.user"]]},"key$":"todo","name__orig":"todo","Name":"Todo","name_":"todo","name-":"todo","NAME":"TODO","index$":4}, {"active":true,"entity":"todo","key$":"BasicTodoFlow","kind":"basic","name":"BasicTodoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"todo_ref01"},"m":{"user_id":"user01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"todo_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"todo_ref01","srcdatavar":"todo_ref01_data","suffix":"_up0","textfield":"title"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-todo_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"todo_ref01","srcdatavar":"todo_ref01_data","suffix":"_dt0"},"m":{"id":"todo01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-todo_ref01"}}],"index$":3,"route":"GET /todos/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"todo_ref01","suffix":"_rm0"},"m":{"id":"todo01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"todo_ref01"}}],"index$":5}]}, 'Todo', {"POST /todos":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["userId","title","completed"],"properties":{"userId":{"type":"integer","description":"User ID who created the todo","key$":"userId"},"title":{"type":"string","description":"Todo title","key$":"title"},"completed":{"type":"boolean","description":"Todo completion status","key$":"completed"}},"x-ref":"#/components/schemas/TodoInput","index$":1}}}},"parameters":[]},"GET /users/{id}/todos":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"User ID","required":true,"schema":{"type":"integer"},"example":1,"index$":0}]},"GET /todos":{"protocol":"http","parameters":[{"name":"userId","in":"query","description":"Filter todos by user ID","required":false,"schema":{"type":"integer"},"index$":0}]},"GET /todos/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"Todo ID","required":true,"schema":{"type":"integer"},"example":1,"index$":0}]},"PATCH /todos/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["userId","title","completed"],"properties":{"userId":{"type":"integer","description":"User ID who created the todo","key$":"userId"},"title":{"type":"string","description":"Todo title","key$":"title"},"completed":{"type":"boolean","description":"Todo completion status","key$":"completed"}},"x-ref":"#/components/schemas/TodoInput","index$":1}}}},"parameters":[{"name":"id","in":"path","description":"Todo ID","required":true,"schema":{"type":"integer"},"index$":0}]},"DELETE /todos/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"Todo ID","required":true,"schema":{"type":"integer"},"index$":0}]},"PUT /todos/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["userId","title","completed"],"properties":{"userId":{"type":"integer","description":"User ID who created the todo","key$":"userId"},"title":{"type":"string","description":"Todo title","key$":"title"},"completed":{"type":"boolean","description":"Todo completion status","key$":"completed"}},"x-ref":"#/components/schemas/TodoInput","index$":1}}}},"parameters":[{"name":"id","in":"path","description":"Todo ID","required":true,"schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"todo.create.0":"GET-only live run: needs POST /todos","todo.update.2":"GET-only live run: needs PUT /todos/{id}","todo.remove.4":"GET-only live run: needs DELETE /todos/{id}","todo.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const todo_ref01_ent = client.Todo()
    let todo_ref01_data = setup.data.new.todo['todo_ref01']
    todo_ref01_data['user_id'] = setup.idmap['user01']

    todo_ref01_data = (await todo_ref01_ent.create(todo_ref01_data)).data()
    assert(null != todo_ref01_data.id)


    // LIST
    const todo_ref01_match: any = {}

    const todo_ref01_list = (await todo_ref01_ent.list(todo_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(todo_ref01_list, { id: todo_ref01_data.id })))


    // UPDATE
    const todo_ref01_data_up0: any = {}
    todo_ref01_data_up0.id = todo_ref01_data.id

    const todo_ref01_markdef_up0 = { name: 'title', value: 'Mark01-todo_ref01_' + setup.now }
    ;(todo_ref01_data_up0 as any)[todo_ref01_markdef_up0.name] = todo_ref01_markdef_up0.value

    const todo_ref01_resdata_up0 = (await todo_ref01_ent.update(todo_ref01_data_up0)).data()
    assert(todo_ref01_resdata_up0.id === todo_ref01_data_up0.id)

    assert((todo_ref01_resdata_up0 as any)[todo_ref01_markdef_up0.name] === todo_ref01_markdef_up0.value)


    // LOAD
    const todo_ref01_match_dt0: any = {}
    todo_ref01_match_dt0.id = todo_ref01_data.id
    const todo_ref01_data_dt0 = (await todo_ref01_ent.load(todo_ref01_match_dt0)).data()
    assert(todo_ref01_data_dt0.id === todo_ref01_data.id)


    // REMOVE
    const todo_ref01_match_rm0: any = { id: todo_ref01_data.id }
    await todo_ref01_ent.remove(todo_ref01_match_rm0)
  

    // LIST
    const todo_ref01_match_rt0: any = {}

    const todo_ref01_list_rt0 = (await todo_ref01_ent.list(todo_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(todo_ref01_list_rt0, { id: todo_ref01_data.id })))


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/todo/TodoTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = JsonplaceholderSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['todo01','todo02','todo03','user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'JSONPLACEHOLDER_TEST_TODO_ENTID': idmap,
    'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
    'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['JSONPLACEHOLDER_TEST_TODO_ENTID']

  const live = 'TRUE' === env.JSONPLACEHOLDER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['JSONPLACEHOLDER_TEST_TODO_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new JsonplaceholderSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
