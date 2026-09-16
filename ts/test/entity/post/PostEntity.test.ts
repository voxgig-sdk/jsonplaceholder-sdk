

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { JsonplaceholderSDK, BaseFeature, stdutil } from '../../..'

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('PostEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
  afterEach(liveDelay('JSONPLACEHOLDER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = JsonplaceholderSDK.test()
    const ent = testsdk.Post()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'post.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"body","op":{"create":{"req":true,"type":"`$STRING`"},"patch":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"req":false,"short":"Post content","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Post ID","type":"`$INTEGER`","index$":1},{"active":true,"name":"title","op":{"create":{"req":true,"type":"`$STRING`"},"patch":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"req":false,"short":"Post title","type":"`$STRING`","index$":2},{"active":true,"name":"userId","op":{"create":{"req":true,"type":"`$INTEGER`"},"patch":{"req":true,"type":"`$INTEGER`"},"update":{"req":true,"type":"`$INTEGER`"}},"req":false,"short":"User ID who created the post","type":"`$INTEGER`","index$":3}],"id":{"field":"id","name":"id"},"name":"post","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /posts","json":"{\"operationId\":\"createPost\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"description\":\"Post content\",\"type\":\"string\"},\"title\":{\"description\":\"Post title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the post\",\"type\":\"integer\"}},\"required\":[\"title\",\"body\",\"userId\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"description\":\"Post content\",\"type\":\"string\"},\"id\":{\"description\":\"Post ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Post title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the post\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Post created successfully\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/posts","segments":[{"lit":"posts"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"user_id","orig":"user_id","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /posts","json":"{\"operationId\":\"getPosts\",\"parameters\":[{\"description\":\"Filter posts by user ID\",\"in\":\"query\",\"name\":\"userId\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"body\":{\"description\":\"Post content\",\"type\":\"string\"},\"id\":{\"description\":\"Post ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Post title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the post\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/posts","segments":[{"lit":"posts"}],"select":{"exist":["user_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"user_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /users/{id}/posts","json":"{\"operationId\":\"getUserPosts\",\"parameters\":[{\"description\":\"User ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"body\":{\"description\":\"Post content\",\"type\":\"string\"},\"id\":{\"description\":\"Post ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Post title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the post\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/users/{id}/posts","rename":{"param":{"id":"user_id"}},"segments":[{"lit":"users"},{"var":"user_id"},{"lit":"posts"}],"select":{"exist":["user_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /posts/{id}","json":"{\"operationId\":\"getPostById\",\"parameters\":[{\"description\":\"Post ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"description\":\"Post content\",\"type\":\"string\"},\"id\":{\"description\":\"Post ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Post title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the post\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Post not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/posts/{id}","segments":[{"lit":"posts"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`"}]},"contract":{"id":"PATCH /posts/{id}","json":"{\"operationId\":\"patchPost\",\"parameters\":[{\"description\":\"Post ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"description\":\"Post content\",\"type\":\"string\"},\"title\":{\"description\":\"Post title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the post\",\"type\":\"integer\"}},\"required\":[\"title\",\"body\",\"userId\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"description\":\"Post content\",\"type\":\"string\"},\"id\":{\"description\":\"Post ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Post title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the post\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Post updated successfully\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/posts/{id}","segments":[{"lit":"posts"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"DELETE /posts/{id}","json":"{\"operationId\":\"deletePost\",\"parameters\":[{\"description\":\"Post ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Post deleted successfully\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/posts/{id}","segments":[{"lit":"posts"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"PUT /posts/{id}","json":"{\"operationId\":\"updatePost\",\"parameters\":[{\"description\":\"Post ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"description\":\"Post content\",\"type\":\"string\"},\"title\":{\"description\":\"Post title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the post\",\"type\":\"integer\"}},\"required\":[\"title\",\"body\",\"userId\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"description\":\"Post content\",\"type\":\"string\"},\"id\":{\"description\":\"Post ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Post title\",\"type\":\"string\"},\"userId\":{\"description\":\"User ID who created the post\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Post updated successfully\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/posts/{id}","segments":[{"lit":"posts"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["user"]]},"key$":"post","name__orig":"post","Name":"Post","name_":"post","name-":"post","NAME":"POST","index$":3}, {"active":true,"entity":"post","key$":"BasicPostFlow","kind":"basic","name":"BasicPostFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"post_ref01"},"match":{"user_id":"user01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{"user_id":"user01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"post_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"post_ref01","srcdatavar":"post_ref01_data","suffix":"_up0","textfield":"body"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-post_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"post_ref01","srcdatavar":"post_ref01_data","suffix":"_dt0"},"match":{"id":"post01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-post_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"post_ref01","suffix":"_rm0"},"match":{"id":"post01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{"user_id":"user01"},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"post_ref01"}}],"index$":5}]}, 'Post')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const post_ref01_ent = client.Post()
    let post_ref01_data = setup.data.new.post['post_ref01']
    post_ref01_data['user_id'] = setup.idmap['user01']

    post_ref01_data = (await post_ref01_ent.create(post_ref01_data)).data()
    assert(null != post_ref01_data.id)


    // LIST
    const post_ref01_match: any = {}
    post_ref01_match['user_id'] = setup.idmap['user01']

    const post_ref01_list = (await post_ref01_ent.list(post_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(post_ref01_list, { id: post_ref01_data.id })))


    // UPDATE
    const post_ref01_data_up0: any = {}
    post_ref01_data_up0.id = post_ref01_data.id

    const post_ref01_markdef_up0 = { name: 'body', value: 'Mark01-post_ref01_' + setup.now }
    ;(post_ref01_data_up0 as any)[post_ref01_markdef_up0.name] = post_ref01_markdef_up0.value

    const post_ref01_resdata_up0 = (await post_ref01_ent.update(post_ref01_data_up0)).data()
    assert(post_ref01_resdata_up0.id === post_ref01_data_up0.id)

    assert((post_ref01_resdata_up0 as any)[post_ref01_markdef_up0.name] === post_ref01_markdef_up0.value)


    // LOAD
    const post_ref01_match_dt0: any = {}
    post_ref01_match_dt0.id = post_ref01_data.id
    const post_ref01_data_dt0 = (await post_ref01_ent.load(post_ref01_match_dt0)).data()
    assert(post_ref01_data_dt0.id === post_ref01_data.id)


    // REMOVE
    const post_ref01_match_rm0: any = { id: post_ref01_data.id }
    await post_ref01_ent.remove(post_ref01_match_rm0)
  

    // LIST
    const post_ref01_match_rt0: any = {}
    post_ref01_match_rt0['user_id'] = setup.idmap['user01']

    const post_ref01_list_rt0 = (await post_ref01_ent.list(post_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(post_ref01_list_rt0, { id: post_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/post/PostTestData.json')

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
    ['post01','post02','post03','user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'JSONPLACEHOLDER_TEST_POST_ENTID': idmap,
    'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
    'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['JSONPLACEHOLDER_TEST_POST_ENTID']

  const live = 'TRUE' === env.JSONPLACEHOLDER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['JSONPLACEHOLDER_TEST_POST_ENTID']
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
  
