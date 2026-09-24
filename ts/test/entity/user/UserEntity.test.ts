

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('UserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
  afterEach(liveDelay('JSONPLACEHOLDER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = JsonplaceholderSDK.test()
    const ent = testsdk.User()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":false,"t":"`$OBJECT`","key$":"address","index$":0},"company":{"a":true,"h":"Company","n":"company","r":false,"t":"`$OBJECT`","key$":"company","index$":1},"email":{"a":true,"fo":"email","h":"Email","n":"email","op":{"create":{"req":true,"type":"`$STRING`"},"patch":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"User email","t":"`$STRING`","key$":"email","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"User ID","t":"`$INTEGER`","key$":"id","index$":3},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"},"patch":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"User full name","t":"`$STRING`","key$":"name","index$":4},"phone":{"a":true,"h":"Phone","n":"phone","r":false,"sh":"User phone number","t":"`$STRING`","key$":"phone","index$":5},"username":{"a":true,"h":"Username","n":"username","op":{"create":{"req":true,"type":"`$STRING`"},"patch":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Username","t":"`$STRING`","key$":"username","index$":6},"website":{"a":true,"h":"Website","n":"website","r":false,"sh":"User website","t":"`$STRING`","key$":"website","index$":7}},"id":{"field":"id","name":"id"},"name":"user","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /users","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/users","q":{},"r":{},"s":[{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /users","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/users","q":{},"r":{},"s":[{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/users/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"co":{"id":"PATCH /users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PATCH","o":"/users/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/users/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PUT","o":"/users/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"user","name__orig":"user","Name":"User","name_":"user","name-":"user","NAME":"USER","index$":5}, {"active":true,"entity":"user","key$":"BasicUserFlow","kind":"basic","name":"BasicUserFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"user_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"user_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"user_ref01","srcdatavar":"user_ref01_data","suffix":"_up0","textfield":"email"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-user_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"user_ref01","srcdatavar":"user_ref01_data","suffix":"_dt0"},"m":{"id":"user01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-user_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"user_ref01","suffix":"_rm0"},"m":{"id":"user01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"user_ref01"}}],"index$":5}]}, 'User', {"POST /users":{"protocol":"http","operationId":"createUser","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name","username","email"],"properties":{"name":{"type":"string","description":"User full name","key$":"name"},"username":{"type":"string","description":"Username","key$":"username"},"email":{"type":"string","format":"email","description":"User email","key$":"email"},"address":{"type":"object","properties":{"street":{"type":"string","description":"Street address"},"suite":{"type":"string","description":"Suite/apartment number"},"city":{"type":"string","description":"City"},"zipcode":{"type":"string","description":"ZIP/postal code"},"geo":{"type":"object","properties":{"lat":{"type":"string","description":"Latitude"},"lng":{"type":"string","description":"Longitude"}},"x-ref":"#/components/schemas/Geo"}},"x-ref":"#/components/schemas/Address","key$":"address"},"phone":{"type":"string","description":"User phone number","key$":"phone"},"website":{"type":"string","description":"User website","key$":"website"},"company":{"type":"object","properties":{"name":{"type":"string","description":"Company name"},"catchPhrase":{"type":"string","description":"Company catch phrase"},"bs":{"type":"string","description":"Company business"}},"x-ref":"#/components/schemas/Company","key$":"company"}},"x-ref":"#/components/schemas/UserInput","index$":1}}}},"responses":{"201":{"description":"User created successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"User ID","key$":"id"},"name":{"type":"string","description":"User full name","key$":"name"},"username":{"type":"string","description":"Username","key$":"username"},"email":{"type":"string","format":"email","description":"User email","key$":"email"},"address":{"type":"object","properties":{"street":{"type":"string","description":"Street address"},"suite":{"type":"string","description":"Suite/apartment number"},"city":{"type":"string","description":"City"},"zipcode":{"type":"string","description":"ZIP/postal code"},"geo":{"type":"object","properties":{"lat":{"type":"string","description":"Latitude"},"lng":{"type":"string","description":"Longitude"}},"x-ref":"#/components/schemas/Geo"}},"x-ref":"#/components/schemas/Address","key$":"address"},"phone":{"type":"string","description":"User phone number","key$":"phone"},"website":{"type":"string","description":"User website","key$":"website"},"company":{"type":"object","properties":{"name":{"type":"string","description":"Company name"},"catchPhrase":{"type":"string","description":"Company catch phrase"},"bs":{"type":"string","description":"Company business"}},"x-ref":"#/components/schemas/Company","key$":"company"}},"x-ref":"#/components/schemas/User"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /users":{"protocol":"http","operationId":"getUsers","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID","key$":"id"},"name":{"type":"string","description":"User full name","key$":"name"},"username":{"type":"string","description":"Username","key$":"username"},"email":{"type":"string","format":"email","description":"User email","key$":"email"},"address":{"type":"object","properties":{"street":{"type":"string","description":"Street address"},"suite":{"type":"string","description":"Suite/apartment number"},"city":{"type":"string","description":"City"},"zipcode":{"type":"string","description":"ZIP/postal code"},"geo":{"type":"object","properties":{"lat":{"type":"string","description":"Latitude"},"lng":{"type":"string","description":"Longitude"}},"x-ref":"#/components/schemas/Geo"}},"x-ref":"#/components/schemas/Address","key$":"address"},"phone":{"type":"string","description":"User phone number","key$":"phone"},"website":{"type":"string","description":"User website","key$":"website"},"company":{"type":"object","properties":{"name":{"type":"string","description":"Company name"},"catchPhrase":{"type":"string","description":"Company catch phrase"},"bs":{"type":"string","description":"Company business"}},"x-ref":"#/components/schemas/Company","key$":"company"}},"x-ref":"#/components/schemas/User","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /users/{id}":{"protocol":"http","operationId":"getUserById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"User ID","key$":"id"},"name":{"type":"string","description":"User full name","key$":"name"},"username":{"type":"string","description":"Username","key$":"username"},"email":{"type":"string","format":"email","description":"User email","key$":"email"},"address":{"type":"object","properties":{"street":{"type":"string","description":"Street address"},"suite":{"type":"string","description":"Suite/apartment number"},"city":{"type":"string","description":"City"},"zipcode":{"type":"string","description":"ZIP/postal code"},"geo":{"type":"object","properties":{"lat":{"type":"string","description":"Latitude"},"lng":{"type":"string","description":"Longitude"}},"x-ref":"#/components/schemas/Geo"}},"x-ref":"#/components/schemas/Address","key$":"address"},"phone":{"type":"string","description":"User phone number","key$":"phone"},"website":{"type":"string","description":"User website","key$":"website"},"company":{"type":"object","properties":{"name":{"type":"string","description":"Company name"},"catchPhrase":{"type":"string","description":"Company catch phrase"},"bs":{"type":"string","description":"Company business"}},"x-ref":"#/components/schemas/Company","key$":"company"}},"x-ref":"#/components/schemas/User","index$":0}}}},"404":{"description":"User not found"}},"parameters":[{"name":"id","in":"path","description":"User ID","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"},"PATCH /users/{id}":{"protocol":"http","operationId":"patchUser","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name","username","email"],"properties":{"name":{"type":"string","description":"User full name","key$":"name"},"username":{"type":"string","description":"Username","key$":"username"},"email":{"type":"string","format":"email","description":"User email","key$":"email"},"address":{"type":"object","properties":{"street":{"type":"string","description":"Street address"},"suite":{"type":"string","description":"Suite/apartment number"},"city":{"type":"string","description":"City"},"zipcode":{"type":"string","description":"ZIP/postal code"},"geo":{"type":"object","properties":{"lat":{"type":"string","description":"Latitude"},"lng":{"type":"string","description":"Longitude"}},"x-ref":"#/components/schemas/Geo"}},"x-ref":"#/components/schemas/Address","key$":"address"},"phone":{"type":"string","description":"User phone number","key$":"phone"},"website":{"type":"string","description":"User website","key$":"website"},"company":{"type":"object","properties":{"name":{"type":"string","description":"Company name"},"catchPhrase":{"type":"string","description":"Company catch phrase"},"bs":{"type":"string","description":"Company business"}},"x-ref":"#/components/schemas/Company","key$":"company"}},"x-ref":"#/components/schemas/UserInput","index$":1}}}},"responses":{"200":{"description":"User updated successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"User ID","key$":"id"},"name":{"type":"string","description":"User full name","key$":"name"},"username":{"type":"string","description":"Username","key$":"username"},"email":{"type":"string","format":"email","description":"User email","key$":"email"},"address":{"type":"object","properties":{"street":{"type":"string","description":"Street address"},"suite":{"type":"string","description":"Suite/apartment number"},"city":{"type":"string","description":"City"},"zipcode":{"type":"string","description":"ZIP/postal code"},"geo":{"type":"object","properties":{"lat":{"type":"string","description":"Latitude"},"lng":{"type":"string","description":"Longitude"}},"x-ref":"#/components/schemas/Geo"}},"x-ref":"#/components/schemas/Address","key$":"address"},"phone":{"type":"string","description":"User phone number","key$":"phone"},"website":{"type":"string","description":"User website","key$":"website"},"company":{"type":"object","properties":{"name":{"type":"string","description":"Company name"},"catchPhrase":{"type":"string","description":"Company catch phrase"},"bs":{"type":"string","description":"Company business"}},"x-ref":"#/components/schemas/Company","key$":"company"}},"x-ref":"#/components/schemas/User","index$":0}}}}},"parameters":[{"name":"id","in":"path","description":"User ID","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"},"DELETE /users/{id}":{"protocol":"http","operationId":"deleteUser","responses":{"200":{"description":"User deleted successfully"}},"parameters":[{"name":"id","in":"path","description":"User ID","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"},"PUT /users/{id}":{"protocol":"http","operationId":"updateUser","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name","username","email"],"properties":{"name":{"type":"string","description":"User full name","key$":"name"},"username":{"type":"string","description":"Username","key$":"username"},"email":{"type":"string","format":"email","description":"User email","key$":"email"},"address":{"type":"object","properties":{"street":{"type":"string","description":"Street address"},"suite":{"type":"string","description":"Suite/apartment number"},"city":{"type":"string","description":"City"},"zipcode":{"type":"string","description":"ZIP/postal code"},"geo":{"type":"object","properties":{"lat":{"type":"string","description":"Latitude"},"lng":{"type":"string","description":"Longitude"}},"x-ref":"#/components/schemas/Geo"}},"x-ref":"#/components/schemas/Address","key$":"address"},"phone":{"type":"string","description":"User phone number","key$":"phone"},"website":{"type":"string","description":"User website","key$":"website"},"company":{"type":"object","properties":{"name":{"type":"string","description":"Company name"},"catchPhrase":{"type":"string","description":"Company catch phrase"},"bs":{"type":"string","description":"Company business"}},"x-ref":"#/components/schemas/Company","key$":"company"}},"x-ref":"#/components/schemas/UserInput","index$":1}}}},"responses":{"200":{"description":"User updated successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"User ID","key$":"id"},"name":{"type":"string","description":"User full name","key$":"name"},"username":{"type":"string","description":"Username","key$":"username"},"email":{"type":"string","format":"email","description":"User email","key$":"email"},"address":{"type":"object","properties":{"street":{"type":"string","description":"Street address"},"suite":{"type":"string","description":"Suite/apartment number"},"city":{"type":"string","description":"City"},"zipcode":{"type":"string","description":"ZIP/postal code"},"geo":{"type":"object","properties":{"lat":{"type":"string","description":"Latitude"},"lng":{"type":"string","description":"Longitude"}},"x-ref":"#/components/schemas/Geo"}},"x-ref":"#/components/schemas/Address","key$":"address"},"phone":{"type":"string","description":"User phone number","key$":"phone"},"website":{"type":"string","description":"User website","key$":"website"},"company":{"type":"object","properties":{"name":{"type":"string","description":"Company name"},"catchPhrase":{"type":"string","description":"Company catch phrase"},"bs":{"type":"string","description":"Company business"}},"x-ref":"#/components/schemas/Company","key$":"company"}},"x-ref":"#/components/schemas/User","index$":0}}}}},"parameters":[{"name":"id","in":"path","description":"User ID","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const user_ref01_ent = client.User()
    let user_ref01_data = setup.data.new.user['user_ref01']

    user_ref01_data = (await user_ref01_ent.create(user_ref01_data)).data()
    assert(null != user_ref01_data.id)


    // LIST
    const user_ref01_match: any = {}

    const user_ref01_list = (await user_ref01_ent.list(user_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(user_ref01_list, { id: user_ref01_data.id })))


    // UPDATE
    const user_ref01_data_up0: any = {}
    user_ref01_data_up0.id = user_ref01_data.id

    const user_ref01_markdef_up0 = { name: 'email', value: 'Mark01-user_ref01_' + setup.now }
    ;(user_ref01_data_up0 as any)[user_ref01_markdef_up0.name] = user_ref01_markdef_up0.value

    const user_ref01_resdata_up0 = (await user_ref01_ent.update(user_ref01_data_up0)).data()
    assert(user_ref01_resdata_up0.id === user_ref01_data_up0.id)

    assert((user_ref01_resdata_up0 as any)[user_ref01_markdef_up0.name] === user_ref01_markdef_up0.value)


    // LOAD
    const user_ref01_match_dt0: any = {}
    user_ref01_match_dt0.id = user_ref01_data.id
    const user_ref01_data_dt0 = (await user_ref01_ent.load(user_ref01_match_dt0)).data()
    assert(user_ref01_data_dt0.id === user_ref01_data.id)


    // REMOVE
    const user_ref01_match_rm0: any = { id: user_ref01_data.id }
    await user_ref01_ent.remove(user_ref01_match_rm0)
  

    // LIST
    const user_ref01_match_rt0: any = {}

    const user_ref01_list_rt0 = (await user_ref01_ent.list(user_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(user_ref01_list_rt0, { id: user_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/user/UserTestData.json')

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
    ['user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'JSONPLACEHOLDER_TEST_USER_ENTID': idmap,
    'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
    'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['JSONPLACEHOLDER_TEST_USER_ENTID']

  const live = 'TRUE' === env.JSONPLACEHOLDER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['JSONPLACEHOLDER_TEST_USER_ENTID']
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
  
